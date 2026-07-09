import Link from "next/link";
import { StatCard } from "@/components/admin/StatCard";
import { getDashboardStats } from "@/lib/data";

export const metadata = { title: "Dashboard | SAF Admin" };

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-amber-100 text-amber-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  QUOTED: "bg-cyan-100 text-cyan-700",
  CONVERTED: "bg-emerald-100 text-emerald-700",
  CLOSED: "bg-slate-100 text-slate-600",
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Overview of your website and enquiries</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Enquiries" value={stats.totalEnquiries} color="blue" />
        <StatCard label="New Enquiries" value={stats.newEnquiries} sub="Awaiting response" color="gold" />
        <StatCard label="Converted" value={stats.convertedEnquiries} color="green" />
        <StatCard
          label="Published Projects"
          value={stats.publishedProjects}
          sub={`${stats.totalProjects} total`}
          color="slate"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Enquiries */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentEnquiries.length === 0 ? (
              <p className="text-sm text-slate-400">No enquiries yet</p>
            ) : (
              stats.recentEnquiries.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{e.name}</p>
                    <p className="text-xs text-slate-500">{e.phone} · {e.location}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[e.status]}`}
                  >
                    {e.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Enquiries by Status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-slate-900">Enquiries by Status</h2>
          <div className="space-y-3">
            {stats.enquiriesByStatus.map((item) => (
              <div key={item.status} className="flex items-center gap-3">
                <span className="w-28 text-xs font-medium text-slate-600">{item.status}</span>
                <div className="flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{
                      width: `${stats.totalEnquiries ? (item._count.status / stats.totalEnquiries) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-bold text-slate-700">
                  {item._count.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h2 className="mb-4 font-bold text-slate-900">Recent Activity</h2>
          <div className="space-y-2">
            {stats.recentActivity.length === 0 ? (
              <p className="text-sm text-slate-400">No activity yet</p>
            ) : (
              stats.recentActivity.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-slate-50"
                >
                  <span className="text-slate-700">
                    <span className="font-medium">{log.action}</span> {log.entity}
                    {log.details && (
                      <span className="text-slate-400"> — {log.details}</span>
                    )}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(log.createdAt).toLocaleString("en-IN")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
