import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, logActivity } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api";
import { settingsSchema } from "@/lib/validations";

export async function GET() {
  try {
    const settings = await prisma.companySettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) return jsonError("Settings not found", 404);

    return jsonOk({
      ...settings,
      phones: JSON.parse(settings.phones),
      serviceAreas: JSON.parse(settings.serviceAreas),
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid data");

    const settings = await prisma.companySettings.upsert({
      where: { id: "default" },
      update: {
        ...parsed.data,
        phones: JSON.stringify(parsed.data.phones),
        serviceAreas: JSON.stringify(parsed.data.serviceAreas),
      },
      create: {
        id: "default",
        ...parsed.data,
        phones: JSON.stringify(parsed.data.phones),
        serviceAreas: JSON.stringify(parsed.data.serviceAreas),
      },
    });

    await logActivity("UPDATE", "CompanySettings", "default");
    return jsonOk(settings);
  } catch (error) {
    return handleApiError(error);
  }
}
