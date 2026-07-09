import { getCurrentAdmin } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return jsonError("Unauthorized", 401);
    return jsonOk({ admin });
  } catch (error) {
    return handleApiError(error);
  }
}
