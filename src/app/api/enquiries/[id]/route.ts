import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, logActivity } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api";
import { enquiryUpdateSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const enquiry = await prisma.enquiry.findUnique({ where: { id } });
    if (!enquiry) return jsonError("Not found", 404);
    return jsonOk(enquiry);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = enquiryUpdateSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid data");

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: parsed.data,
    });

    await logActivity("UPDATE", "Enquiry", id, `Status: ${parsed.data.status}`);
    return jsonOk(enquiry);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    await prisma.enquiry.delete({ where: { id } });
    await logActivity("DELETE", "Enquiry", id, `By ${admin.email}`);
    return jsonOk({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
