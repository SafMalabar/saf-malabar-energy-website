import { prisma } from "@/lib/prisma";
import { EnquiriesManager } from "@/components/admin/EnquiriesManager";

export const metadata = { title: "Enquiries | SAF Admin" };

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <EnquiriesManager initialEnquiries={enquiries} />;
}
