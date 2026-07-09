import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin, requireAdmin, logActivity } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api";
import { serviceSchema } from "@/lib/validations";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    const items = await prisma.service.findMany({
      where: admin ? undefined : { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return jsonOk(
      items.map((s) => ({
        ...s,
        benefits: JSON.parse(s.benefits) as string[],
      }))
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid data");

    const item = await prisma.service.create({
      data: {
        ...parsed.data,
        benefits: JSON.stringify(parsed.data.benefits),
      },
    });
    await logActivity("CREATE", "Service", item.id);
    return jsonOk(item, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
