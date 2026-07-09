"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Project } from "@prisma/client";

type FormData = {
  title: string;
  category: string;
  location: string;
  capacity: string;
  completedDate: string;
  savings: string;
  story: string;
  image: string;
  published: boolean;
};

const empty: FormData = {
  title: "",
  category: "residential",
  location: "",
  capacity: "",
  completedDate: "",
  savings: "",
  story: "",
  image: "",
  published: true,
};

export function ProjectsManager({ initialItems }: { initialItems: Project[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormData>(empty);
  const [saving, setSaving] = useState(false);

  function openCreate() { setEditing(null); setForm(empty); setModal(true); }
  function openEdit(item: Project) {
    setEditing(item);
    setForm({ title: item.title, category: item.category, location: item.location, capacity: item.capacity, completedDate: item.completedDate, savings: item.savings, story: item.story, image: item.image, published: item.published });
    setModal(true);
  }

  async function save() {
    setSaving(true);
    const res = await fetch(editing ? `/api/projects/${editing.id}` : "/api/projects", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const saved = await res.json();
      setItems((prev) => editing ? prev.map((i) => i.id === saved.id ? saved : i) : [saved, ...prev]);
      setModal(false);
      router.refresh();
    }
    setSaving(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) { setItems((prev) => prev.filter((i) => i.id !== id)); router.refresh(); }
  }

  const ic = "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500">Manage featured installations on the website</p>
        </div>
        <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Title</th>
              <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 sm:table-cell">Category</th>
              <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 md:table-cell">Capacity</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{item.title}</td>
                <td className="hidden px-4 py-3 capitalize text-slate-600 sm:table-cell">{item.category}</td>
                <td className="hidden px-4 py-3 text-slate-600 md:table-cell">{item.capacity}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {item.published ? "Live" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-primary"><Pencil size={15} /></button>
                  <button type="button" onClick={() => remove(item.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6">
            <div className="mb-4 flex justify-between">
              <h2 className="font-bold">{editing ? "Edit" : "Add"} Project</h2>
              <button type="button" onClick={() => setModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={ic} />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={ic}>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
              <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={ic} />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Capacity (e.g. 5 kW)" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className={ic} />
                <input placeholder="Completed Date" value={form.completedDate} onChange={(e) => setForm({ ...form, completedDate: e.target.value })} className={ic} />
              </div>
              <input placeholder="Monthly Savings" value={form.savings} onChange={(e) => setForm({ ...form, savings: e.target.value })} className={ic} />
              <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={ic} />
              <textarea placeholder="Project story" value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} rows={4} className={`${ic} resize-none`} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Publish on website
              </label>
            </div>
            <button type="button" onClick={save} disabled={saving} className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white">
              {saving ? "Saving..." : "Save Project"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
