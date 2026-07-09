import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { company, services, faqs, testimonials, projects } from "../src/content";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@safmalabarenergy.com";
  const password = process.env.ADMIN_PASSWORD ?? "Admin@123";
  const name = process.env.ADMIN_NAME ?? "SAF Admin";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name },
  });

  await prisma.companySettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: company.name,
      tagline: company.tagline,
      description: company.description,
      url: company.url,
      email: company.email,
      phones: JSON.stringify(company.phones),
      whatsapp: company.whatsapp,
      location: company.location,
      serviceAreas: JSON.stringify(company.serviceAreas),
      workingHoursWeekdays: company.workingHours.weekdays,
      workingHoursEmergency: company.workingHours.emergency,
      socialFacebook: company.social.facebook,
      socialInstagram: company.social.instagram,
      socialLinkedin: company.social.linkedin,
      founded: company.founded,
    },
  });

  const existingServices = await prisma.service.count();
  if (existingServices === 0) {
    const iconMap: Record<string, string> = {
      "Solar Panel Installation": "Sun",
      "Solar System Design": "Settings",
      "Operation & Maintenance": "Wrench",
      "Residential Solar": "Home",
      "Commercial Solar": "Building2",
      "Industrial Solar": "Factory",
    };

    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      await prisma.service.create({
        data: {
          title: s.title,
          description: s.description,
          benefits: JSON.stringify(s.benefits),
          idealFor: s.idealFor,
          icon: iconMap[s.title] ?? "Sun",
          sortOrder: i,
          published: true,
        },
      });
    }
  }

  const existingFaqs = await prisma.faq.count();
  if (existingFaqs === 0) {
    for (let i = 0; i < faqs.length; i++) {
      await prisma.faq.create({
        data: {
          question: faqs[i].question,
          answer: faqs[i].answer,
          sortOrder: i,
          published: true,
        },
      });
    }
  }

  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    for (let i = 0; i < testimonials.length; i++) {
      const t = testimonials[i];
      await prisma.testimonial.create({
        data: {
          name: t.name,
          location: t.location,
          project: t.project,
          review: t.review,
          rating: t.rating,
          initials: t.initials,
          published: true,
          sortOrder: i,
        },
      });
    }
  }

  const existingProjects = await prisma.project.count();
  if (existingProjects === 0) {
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      await prisma.project.create({
        data: {
          title: p.title,
          category: p.category,
          location: p.location,
          capacity: p.capacity,
          completedDate: p.completedDate,
          savings: p.savings,
          story: p.story,
          image: p.image,
          published: true,
          sortOrder: i,
        },
      });
    }
  }

  console.log("✅ Database seeded successfully");
  console.log(`   Admin login: ${email}`);
  console.log(`   Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
