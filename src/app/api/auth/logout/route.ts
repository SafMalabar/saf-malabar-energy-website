import { destroySession, logActivity, getCurrentAdmin } from "@/lib/auth";
import { jsonOk, handleApiError } from "@/lib/api";

export async function POST() {
  try {
    const admin = await getCurrentAdmin();
    if (admin) {
      await logActivity("LOGOUT", "Admin", admin.id);
    }
    await destroySession();
    return jsonOk({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
