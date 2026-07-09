import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminSidebar, AdminMobileNav } from "@/components/admin/AdminSidebar";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden lg:block">
        <AdminSidebar adminName={admin.name} />
      </div>
      <div className="flex flex-1 flex-col">
        <AdminMobileNav />
        <main className="flex-1 overflow-auto p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
