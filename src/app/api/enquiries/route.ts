import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { requireAdmin, logActivity } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api";
import { enquirySchema, enquiryUpdateSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const enquiries = await prisma.enquiry.findMany({
      where: {
        ...(status && status !== "ALL" ? { status: status as never } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { phone: { contains: search } },
                { email: { contains: search } },
                { location: { contains: search } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return jsonOk(enquiries);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    let data: Record<string, string> = {};
    let billFileName: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (key === "billUpload" && value instanceof File && value.size > 0) {
          const uploadsDir = path.join(process.cwd(), "public", "uploads", "enquiries");
          await mkdir(uploadsDir, { recursive: true });
          const safeName = `${Date.now()}-${value.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
          const buffer = Buffer.from(await value.arrayBuffer());
          await writeFile(path.join(uploadsDir, safeName), buffer);
          billFileName = safeName;
        } else if (typeof value === "string") {
          data[key] = value;
        }
      }
    } else {
      data = await request.json();
    }

    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid data");
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        ...parsed.data,
        email: parsed.data.email || null,
        billFileName,
      },
    });

    return jsonOk(enquiry, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
