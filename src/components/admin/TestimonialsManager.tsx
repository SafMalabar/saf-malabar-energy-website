"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import type { Testimonial } from "@prisma/client";

type FormData = {
  name: string;
  location: string;
  project: string;
  review: string;
  rating: number;
  initials: string;
  published: boolean;
};

const empty: FormData = {
  name: "",
  location: "",
  project: "",
  review: "",
  rating: 5,
  initials: "",
  published: false,
};

export function TestimonialsManager({ initialItems }: { initialItems: Testimonial[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormData>(empty);
  const [saving, setSaving] = useState(false);

  function openCreate() {
    setEditing(null);
    setForm(empty);
    setModal(true);
  }

  function openEdit(item: Testimonial) {
    setEditing(item);
    setForm({
      name: item.name,
      location: item.location,
      project: item.project,
      review: item.review,
      rating: item.rating,
      initials: item.initials,
      published: item.published,
    });
    setModal(true);
  }

  async function save() {
    setSaving(true);
    const url = editing ? `/api/testimonials/${editing.id}` : "/api/testimonials";
    const method = editing ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const saved = await res.json();
      setItems((prev) =>
        editing ? prev.map((i) => (i.id === saved.id ? saved : i)) : [saved, ...prev]
      );
      setModal(false);
      router.refresh();
    }
    setSaving(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    }
  }

  async function togglePublish(item: Testimonial) {
    const res = await fetch(`/api/testimonials/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !item.published }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    }
  }

  const inputClass = "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-sm text-slate-500">Manage customer feedback shown on the website</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {item.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < item.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                ))}
              </div>
            </div>
            <p className="mb-3 line-clamp-3 text-sm text-slate-600">&ldquo;{item.review}&rdquo;</p>
            <p className="mb-4 text-xs font-medium text-primary">{item.project}</p>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => togglePublish(item)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {item.published ? "Published" : "Draft"}
              </button>
              <div className="flex gap-1">
                <button type="button" onClick={() => openEdit(item)} className="rounded-lg p-2 text-slate-400 hover:text-primary">
                  <Pencil size={15} />
                </button>
                <button type="button" onClick={() => remove(item.id)} className="rounded-lg p-2 text-slate-400 hover:text-red-500">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">{editing ? "Edit" : "Add"} Testimonial</h2>
              <button type="button" onClick={() => setModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-3">
              {(["name", "location", "project", "initials"] as const).map((field) => (
                <div key={field}>
                  <label className="mb-1 block text-xs font-medium capitalize text-slate-600">{field}</label>
                  <input
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Review</label>
                <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} rows={4} className={`${inputClass} resize-none`} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium text-slate-600">Rating</label>
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className={inputClass}>
                    {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-2 pt-5 text-sm">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                  Publish on website
                </label>
              </div>
            </div>
            <button type="button" onClick={save} disabled={saving} className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
