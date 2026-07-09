"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Faq } from "@prisma/client";

export function FaqManager({ initialItems }: { initialItems: Faq[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  function openCreate() { setEditing(null); setQuestion(""); setAnswer(""); setPublished(true); setModal(true); }
  function openEdit(item: Faq) { setEditing(item); setQuestion(item.question); setAnswer(item.answer); setPublished(item.published); setModal(true); }

  async function save() {
    setSaving(true);
    const body = { question, answer, published };
    const res = await fetch(editing ? `/api/faq/${editing.id}` : "/api/faq", {
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
    if (!confirm("Delete this FAQ?")) return;
    const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
    if (res.ok) { setItems((prev) => prev.filter((i) => i.id !== id)); router.refresh(); }
  }

  const ic = "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">FAQ</h1>
          <p className="text-sm text-slate-500">Manage frequently asked questions</p>
        </div>
        <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{item.question}</p>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{item.answer}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button type="button" onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-primary"><Pencil size={15} /></button>
                <button type="button" onClick={() => remove(item.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6">
            <div className="mb-4 flex justify-between"><h2 className="font-bold">{editing ? "Edit" : "Add"} FAQ</h2><button type="button" onClick={() => setModal(false)}><X size={20} /></button></div>
            <div className="space-y-3">
              <input placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} className={ic} />
              <textarea placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} rows={5} className={`${ic} resize-none`} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />Published</label>
            </div>
            <button type="button" onClick={save} disabled={saving} className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white">{saving ? "Saving..." : "Save"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
