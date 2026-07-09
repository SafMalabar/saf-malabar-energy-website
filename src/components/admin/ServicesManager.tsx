"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Service } from "@prisma/client";

export function ServicesManager({ initialItems }: { initialItems: Service[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [idealFor, setIdealFor] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  function openCreate() { setEditing(null); setTitle(""); setDescription(""); setBenefits(""); setIdealFor(""); setPublished(true); setModal(true); }
  function openEdit(item: Service) {
    setEditing(item);
    setTitle(item.title);
    setDescription(item.description);
    setBenefits(JSON.parse(item.benefits).join("\n"));
    setIdealFor(item.idealFor);
    setPublished(item.published);
    setModal(true);
  }

  async function save() {
    setSaving(true);
    const body = { title, description, benefits: benefits.split("\n").filter(Boolean), idealFor, published };
    const res = await fetch(editing ? `/api/services/${editing.id}` : "/api/services", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const saved = await res.json();
      setItems((prev) => editing ? prev.map((i) => i.id === saved.id ? saved : i) : [...prev, saved]);
      setModal(false);
      router.refresh();
    }
    setSaving(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (res.ok) { setItems((prev) => prev.filter((i) => i.id !== id)); router.refresh(); }
  }

  const ic = "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-sm text-slate-500">Manage services shown on the website</p>
        </div>
        <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex justify-between">
              <h3 className="font-semibold text-slate-800">{item.title}</h3>
              <div className="flex gap-1">
                <button type="button" onClick={() => openEdit(item)} className="p-1 text-slate-400 hover:text-primary"><Pencil size={15} /></button>
                <button type="button" onClick={() => remove(item.id)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 size={15} /></button>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-600 line-clamp-2">{item.description}</p>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6">
            <div className="mb-4 flex justify-between"><h2 className="font-bold">{editing ? "Edit" : "Add"} Service</h2><button type="button" onClick={() => setModal(false)}><X size={20} /></button></div>
            <div className="space-y-3">
              <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className={ic} />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={`${ic} resize-none`} />
              <textarea placeholder="Benefits (one per line)" value={benefits} onChange={(e) => setBenefits(e.target.value)} rows={3} className={`${ic} resize-none`} />
              <input placeholder="Ideal for" value={idealFor} onChange={(e) => setIdealFor(e.target.value)} className={ic} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />Published</label>
            </div>
            <button type="button" onClick={save} disabled={saving} className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white">{saving ? "Saving..." : "Save"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
