import { prisma } from "@/lib/prisma";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

export const metadata = { title: "Projects | SAF Admin" };

export default async function ProjectsPage() {
  const items = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return <ProjectsManager initialItems={items} />;
}
