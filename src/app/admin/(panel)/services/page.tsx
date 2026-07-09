import { prisma } from "@/lib/prisma";
import { ServicesManager } from "@/components/admin/ServicesManager";

export const metadata = { title: "Services | SAF Admin" };

export default async function ServicesPage() {
  const items = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return <ServicesManager initialItems={items} />;
}
