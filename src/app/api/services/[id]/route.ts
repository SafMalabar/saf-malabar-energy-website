import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, logActivity } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api";
import { serviceSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = serviceSchema.partial().safeParse(body);
    if (!parsed.success) return jsonError("Invalid data");

    const updateData: Record<string, unknown> = { ...parsed.data };
    if (parsed.data.benefits) {
      updateData.benefits = JSON.stringify(parsed.data.benefits);
    }

    const item = await prisma.service.update({ where: { id }, data: updateData });
    await logActivity("UPDATE", "Service", id);
    return jsonOk(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    await logActivity("DELETE", "Service", id);
    return jsonOk({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
