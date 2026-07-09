import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, logActivity } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api";
import { testimonialSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = testimonialSchema.partial().safeParse(body);
    if (!parsed.success) return jsonError("Invalid data");

    const item = await prisma.testimonial.update({
      where: { id },
      data: parsed.data,
    });
    await logActivity("UPDATE", "Testimonial", id);
    return jsonOk(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    await logActivity("DELETE", "Testimonial", id);
    return jsonOk({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
