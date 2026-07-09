"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Trash2, Eye, X } from "lucide-react";
import type { Enquiry, EnquiryStatus } from "@prisma/client";

const STATUSES: EnquiryStatus[] = [
  "NEW",
  "CONTACTED",
  "IN_PROGRESS",
  "QUOTED",
  "CONVERTED",
  "CLOSED",
];

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-amber-100 text-amber-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  QUOTED: "bg-cyan-100 text-cyan-700",
  CONVERTED: "bg-emerald-100 text-emerald-700",
  CLOSED: "bg-slate-100 text-slate-600",
};

export function EnquiriesManager({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<EnquiryStatus>("NEW");
  const [saving, setSaving] = useState(false);

  const filtered = enquiries.filter((e) => {
    const matchStatus = filter === "ALL" || e.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      (e.email?.toLowerCase().includes(q) ?? false) ||
      e.location.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  function openDetail(e: Enquiry) {
    setSelected(e);
    setNotes(e.notes ?? "");
    setStatus(e.status);
  }

  async function updateEnquiry() {
    if (!selected) return;
    setSaving(true);
    const res = await fetch(`/api/enquiries/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    if (res.ok) {
      const updated = await res.json();
      setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      setSelected(updated);
      router.refresh();
    }
    setSaving(false);
  }

  async function deleteEnquiry(id: string) {
    if (!confirm("Delete this enquiry permanently?")) return;
    const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    if (res.ok) {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      setSelected(null);
      router.refresh();
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="text-sm text-slate-500">{enquiries.length} total submissions</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-slate-200 py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option value="ALL">All Status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
              <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 sm:table-cell">Phone</th>
              <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 md:table-cell">Service</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
              <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 lg:table-cell">Date</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No enquiries found
                </td>
              </tr>
            ) : (
              filtered.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{e.name}</p>
                    <p className="text-xs text-slate-400 sm:hidden">{e.phone}</p>
                  </td>
                  <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">{e.phone}</td>
                  <td className="hidden px-4 py-3 text-slate-600 md:table-cell">{e.service ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[e.status]}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-slate-500 lg:table-cell">
                    {new Date(e.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => openDetail(e)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary"
                      aria-label={`View ${e.name}`}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{selected.name}</h2>
              <button type="button" onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <dl className="mb-4 space-y-2 text-sm">
              {[
                ["Phone", selected.phone],
                ["Email", selected.email ?? "—"],
                ["Location", selected.location],
                ["Property", selected.propertyType ?? "—"],
                ["Bill Range", selected.billRange ?? "—"],
                ["Service", selected.service ?? "—"],
                ["Submitted", new Date(selected.createdAt).toLocaleString("en-IN")],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="w-28 shrink-0 font-medium text-slate-500">{label}</dt>
                  <dd className="text-slate-800">{value}</dd>
                </div>
              ))}
              {selected.message && (
                <div>
                  <dt className="mb-1 font-medium text-slate-500">Message</dt>
                  <dd className="rounded-lg bg-slate-50 p-3 text-slate-700">{selected.message}</dd>
                </div>
              )}
              {selected.billFileName && (
                <div>
                  <dt className="mb-1 font-medium text-slate-500">Bill Upload</dt>
                  <dd>
                    <a
                      href={`/uploads/enquiries/${selected.billFileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {selected.billFileName}
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-slate-700">Internal Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm resize-none"
                placeholder="Add notes about follow-up..."
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={updateEnquiry}
                disabled={saving}
                className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => deleteEnquiry(selected.id)}
                className="rounded-xl border border-red-200 px-4 py-2.5 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
