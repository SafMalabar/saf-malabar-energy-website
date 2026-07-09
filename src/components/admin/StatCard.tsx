interface StatCardProps {
  label: string;
  value: number | string;
  sub?: string;
  color?: "green" | "blue" | "gold" | "red" | "slate";
}

const colorMap = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  blue: "bg-sky-50 text-sky-700 border-sky-100",
  gold: "bg-amber-50 text-amber-700 border-amber-100",
  red: "bg-red-50 text-red-700 border-red-100",
  slate: "bg-slate-50 text-slate-700 border-slate-100",
};

export function StatCard({ label, value, sub, color = "slate" }: StatCardProps) {
  return (
    <div className={`rounded-2xl border p-5 ${colorMap[color]}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {sub && <p className="mt-1 text-xs opacity-70">{sub}</p>}
    </div>
  );
}
