import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const enquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  location: z.string().min(2),
  propertyType: z.string().optional(),
  billRange: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
});

export const enquiryUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "IN_PROGRESS", "QUOTED", "CONVERTED", "CLOSED"]).optional(),
  notes: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  location: z.string().min(2),
  project: z.string().min(2),
  review: z.string().min(10),
  rating: z.number().min(1).max(5).default(5),
  initials: z.string().min(1).max(3),
  published: z.boolean().default(false),
  sortOrder: z.number().default(0),
});

export const projectSchema = z.object({
  title: z.string().min(2),
  category: z.enum(["residential", "commercial", "industrial"]),
  location: z.string().min(2),
  capacity: z.string().min(1),
  completedDate: z.string().min(1),
  savings: z.string().min(1),
  story: z.string().min(10),
  image: z.string().url(),
  published: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const faqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(10),
  published: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  benefits: z.array(z.string()),
  idealFor: z.string().min(5),
  icon: z.string().default("Sun"),
  published: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const settingsSchema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(2),
  description: z.string().min(10),
  url: z.string().url(),
  email: z.string().email(),
  phones: z.array(z.string()),
  whatsapp: z.string(),
  location: z.string(),
  serviceAreas: z.array(z.string()),
  workingHoursWeekdays: z.string(),
  workingHoursEmergency: z.string(),
  socialFacebook: z.string().optional(),
  socialInstagram: z.string().optional(),
  socialLinkedin: z.string().optional(),
  founded: z.number(),
});
