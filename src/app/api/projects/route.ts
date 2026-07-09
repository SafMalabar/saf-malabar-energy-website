import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin, requireAdmin, logActivity } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api";
import { projectSchema } from "@/lib/validations";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    const items = await prisma.project.findMany({
      where: admin ? undefined : { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return jsonOk(items);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid data");

    const item = await prisma.project.create({ data: parsed.data });
    await logActivity("CREATE", "Project", item.id);
    return jsonOk(item, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
