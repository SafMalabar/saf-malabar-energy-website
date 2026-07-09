import { requireAdmin } from "@/lib/auth";
import { jsonOk, handleApiError } from "@/lib/api";
import { getDashboardStats } from "@/lib/data";

export async function GET() {
  try {
    await requireAdmin();
    const stats = await getDashboardStats();
    return jsonOk(stats);
  } catch (error) {
    return handleApiError(error);
  }
}
