import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  verifyPassword,
  logActivity,
} from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api";
import { loginSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid credentials", 400);

    const admin = await prisma.admin.findUnique({
      where: { email: parsed.data.email },
    });

    if (!admin || !(await verifyPassword(parsed.data.password, admin.passwordHash))) {
      return jsonError("Invalid email or password", 401);
    }

    await createSession(admin.id, admin.email);
    await logActivity("LOGIN", "Admin", admin.id, admin.email);

    return jsonOk({
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
