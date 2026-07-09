import { StatCard } from "@/components/admin/StatCard";
import { getDashboardStats } from "@/lib/data";

export const metadata = { title: "Reports | SAF Admin" };

export default async function ReportsPage() {
  const stats = await getDashboardStats();

  const conversionRate =
    stats.totalEnquiries > 0
      ? Math.round((stats.convertedEnquiries / stats.totalEnquiries) * 100)
      : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-sm text-slate-500">Performance overview and enquiry insights</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Enquiries" value={stats.totalEnquiries} color="blue" />
        <StatCard label="New (Uncontacted)" value={stats.newEnquiries} color="gold" />
        <StatCard label="Contacted" value={stats.contactedEnquiries} color="slate" />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} sub={`${stats.convertedEnquiries} converted`} color="green" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-slate-900">Enquiries by Service</h2>
          {stats.enquiriesByService.length === 0 ? (
            <p className="text-sm text-slate-400">No data yet</p>
          ) : (
            <div className="space-y-3">
              {stats.enquiriesByService.map((item) => (
                <div key={item.service ?? "unknown"} className="flex items-center gap-3">
                  <span className="w-40 truncate text-xs text-slate-600">{item.service ?? "Not specified"}</span>
                  <div className="flex-1 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-primary"
                      style={{
                        width: `${stats.totalEnquiries ? (item._count.service / stats.totalEnquiries) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="w-6 text-right text-sm font-bold">{item._count.service}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-slate-900">Content Overview</h2>
          <dl className="space-y-4">
            {[
              ["Published Testimonials", stats.publishedTestimonials, stats.totalTestimonials],
              ["Published Projects", stats.publishedProjects, stats.totalProjects],
            ].map(([label, pub, total]) => (
              <div key={label as string} className="flex justify-between border-b border-slate-100 pb-3">
                <dt className="text-sm text-slate-600">{label}</dt>
                <dd className="font-bold text-slate-800">{pub as number} / {total as number}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h2 className="mb-4 font-bold text-slate-900">Enquiry Pipeline</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {stats.enquiriesByStatus.map((item) => (
              <div key={item.status} className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-2xl font-bold text-primary">{item._count.status}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
