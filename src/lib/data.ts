import { prisma } from "@/lib/prisma";
import { company, testimonials as staticTestimonials, projects as staticProjects, faqs as staticFaqs, services as staticServices } from "@/content";

const serviceIconMap: Record<string, string> = {
  "Solar Panel Installation": "Sun",
  "Solar System Design": "Settings",
  "Operation & Maintenance": "Wrench",
  "Residential Solar": "Home",
  "Commercial Solar": "Building2",
  "Industrial Solar": "Factory",
};

/**
 * Runs a DB query but falls back to null when the database is unreachable
 * or its tables don't exist (e.g. during build on a fresh deployment).
 * The callers then serve the static content from `@/content`.
 */
async function safeQuery<T>(query: () => Promise<T>): Promise<T | null> {
  try {
    return await query();
  } catch (error) {
    console.warn("Database unavailable, using static content fallback:", error);
    return null;
  }
}

export async function getPublishedTestimonials() {
  const items = await safeQuery(() =>
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    })
  );
  if (!items || items.length === 0) return staticTestimonials;
  return items.map((t) => ({
    id: t.id,
    name: t.name,
    location: t.location,
    project: t.project,
    review: t.review,
    rating: t.rating,
    initials: t.initials,
  }));
}

export async function getPublishedProjects() {
  const items = await safeQuery(() =>
    prisma.project.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    })
  );
  if (!items || items.length === 0) {
    return staticProjects.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      location: p.location,
      capacity: p.capacity,
      completedDate: p.completedDate,
      savings: p.savings,
      story: p.story,
      image: p.image,
    }));
  }
  return items;
}

export async function getPublishedFaqs() {
  const items = await safeQuery(() =>
    prisma.faq.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    })
  );
  if (!items || items.length === 0) return staticFaqs;
  return items.map((f) => ({ question: f.question, answer: f.answer }));
}

export async function getPublishedServices() {
  const items = await safeQuery(() =>
    prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    })
  );
  if (!items || items.length === 0) {
    return staticServices.map((s) => ({
      iconName: serviceIconMap[s.title] ?? "Sun",
      title: s.title,
      description: s.description,
      benefits: s.benefits,
      idealFor: s.idealFor,
    }));
  }
  return items.map((s) => ({
    iconName: s.icon,
    title: s.title,
    description: s.description,
    benefits: JSON.parse(s.benefits) as string[],
    idealFor: s.idealFor,
  }));
}

export async function getCompanySettings() {
  const settings = await safeQuery(() =>
    prisma.companySettings.findUnique({
      where: { id: "default" },
    })
  );
  if (!settings) return company;

  return {
    name: settings.name,
    tagline: settings.tagline,
    description: settings.description,
    url: settings.url,
    email: settings.email,
    phones: JSON.parse(settings.phones) as string[],
    whatsapp: settings.whatsapp,
    location: settings.location,
    serviceAreas: JSON.parse(settings.serviceAreas) as string[],
    workingHours: {
      weekdays: settings.workingHoursWeekdays,
      emergency: settings.workingHoursEmergency,
    },
    social: {
      facebook: settings.socialFacebook ?? company.social.facebook,
      instagram: settings.socialInstagram ?? company.social.instagram,
      linkedin: settings.socialLinkedin ?? company.social.linkedin,
    },
    founded: settings.founded,
  };
}

export async function getDashboardStats() {
  const [
    totalEnquiries,
    newEnquiries,
    contactedEnquiries,
    convertedEnquiries,
    totalTestimonials,
    publishedTestimonials,
    totalProjects,
    publishedProjects,
    recentEnquiries,
    enquiriesByService,
    enquiriesByStatus,
    recentActivity,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.count({ where: { status: "CONTACTED" } }),
    prisma.enquiry.count({ where: { status: "CONVERTED" } }),
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { published: true } }),
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.enquiry.groupBy({
      by: ["service"],
      _count: { service: true },
      where: { service: { not: null } },
    }),
    prisma.enquiry.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  return {
    totalEnquiries,
    newEnquiries,
    contactedEnquiries,
    convertedEnquiries,
    totalTestimonials,
    publishedTestimonials,
    totalProjects,
    publishedProjects,
    recentEnquiries,
    enquiriesByService,
    enquiriesByStatus,
    recentActivity,
  };
}
