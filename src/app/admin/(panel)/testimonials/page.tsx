import { prisma } from "@/lib/prisma";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";

export const metadata = { title: "Testimonials | SAF Admin" };

export default async function TestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return <TestimonialsManager initialItems={items} />;
}
