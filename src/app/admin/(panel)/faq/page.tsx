import { prisma } from "@/lib/prisma";
import { FaqManager } from "@/components/admin/FaqManager";

export const metadata = { title: "FAQ | SAF Admin" };

export default async function FaqPage() {
  const items = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
  return <FaqManager initialItems={items} />;
}
