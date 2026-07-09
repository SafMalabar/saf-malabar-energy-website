"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

type Settings = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phones: string[];
  whatsapp: string;
  location: string;
  serviceAreas: string[];
  workingHoursWeekdays: string;
  workingHoursEmergency: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  founded: number;
};

export function SettingsManager({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const ic = "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none";

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage("Settings saved successfully!");
      router.refresh();
    } else {
      setMessage("Failed to save settings.");
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Company Settings</h1>
        <p className="text-sm text-slate-500">Manage contact details and company information</p>
      </div>

      {message && (
        <div className={`mb-4 rounded-xl px-4 py-3 text-sm ${message.includes("success") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-slate-800">Company Info</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="mb-1 block text-xs font-medium text-slate-500">Company Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={ic} /></div>
            <div><label className="mb-1 block text-xs font-medium text-slate-500">Tagline</label><input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={ic} /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-slate-500">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={`${ic} resize-none`} /></div>
            <div><label className="mb-1 block text-xs font-medium text-slate-500">Website URL</label><input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className={ic} /></div>
            <div><label className="mb-1 block text-xs font-medium text-slate-500">Founded Year</label><input type="number" value={form.founded} onChange={(e) => setForm({ ...form, founded: Number(e.target.value) })} className={ic} /></div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-slate-800">Contact Details</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="mb-1 block text-xs font-medium text-slate-500">Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={ic} /></div>
            <div><label className="mb-1 block text-xs font-medium text-slate-500">WhatsApp</label><input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className={ic} /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-slate-500">Phone Numbers (one per line)</label><textarea value={form.phones.join("\n")} onChange={(e) => setForm({ ...form, phones: e.target.value.split("\n").filter(Boolean) })} rows={3} className={`${ic} resize-none`} /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-slate-500">Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={ic} /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-slate-500">Service Areas (one per line)</label><textarea value={form.serviceAreas.join("\n")} onChange={(e) => setForm({ ...form, serviceAreas: e.target.value.split("\n").filter(Boolean) })} rows={3} className={`${ic} resize-none`} /></div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-slate-800">Working Hours</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="mb-1 block text-xs font-medium text-slate-500">Weekdays</label><input value={form.workingHoursWeekdays} onChange={(e) => setForm({ ...form, workingHoursWeekdays: e.target.value })} className={ic} /></div>
            <div><label className="mb-1 block text-xs font-medium text-slate-500">Emergency Support</label><input value={form.workingHoursEmergency} onChange={(e) => setForm({ ...form, workingHoursEmergency: e.target.value })} className={ic} /></div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-slate-800">Social Media</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div><label className="mb-1 block text-xs font-medium text-slate-500">Facebook</label><input value={form.socialFacebook} onChange={(e) => setForm({ ...form, socialFacebook: e.target.value })} className={ic} /></div>
            <div><label className="mb-1 block text-xs font-medium text-slate-500">Instagram</label><input value={form.socialInstagram} onChange={(e) => setForm({ ...form, socialInstagram: e.target.value })} className={ic} /></div>
            <div><label className="mb-1 block text-xs font-medium text-slate-500">LinkedIn</label><input value={form.socialLinkedin} onChange={(e) => setForm({ ...form, socialLinkedin: e.target.value })} className={ic} /></div>
          </div>
        </section>

        <button type="button" onClick={save} disabled={saving} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60">
          <Save size={16} />
          {saving ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </div>
  );
}
