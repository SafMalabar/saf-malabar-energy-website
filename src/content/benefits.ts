/** Solar benefits with circular progress metrics */
export const benefits: {
  icon: string;
  title: string;
  description: string;
  stat: number;
  maxStat?: number;
  suffix: string;
  prefix?: string;
  unit?: string;
}[] = [
  {
    icon: "⚡",
    title: "Electricity Savings",
    description:
      "Reduce monthly electricity costs by up to 90% with a properly sized on-grid system.",
    stat: 90,
    suffix: "%",
    prefix: "Up to ",
  },
  {
    icon: "🌱",
    title: "CO₂ Reduction",
    description:
      "Each residential system offsets 3–5 tonnes of CO₂ annually over its 25-year lifespan.",
    stat: 4,
    maxStat: 5,
    suffix: " tons/yr",
    prefix: "Up to ",
  },
  {
    icon: "📈",
    title: "Return on Investment",
    description:
      "Well-designed systems typically achieve full payback within 4–6 years at current tariff rates.",
    stat: 85,
    suffix: "%",
    prefix: "",
    unit: "ROI",
  },
  {
    icon: "⏱️",
    title: "Payback Period",
    description:
      "Most residential installations recover their investment in under 5 years with net metering.",
    stat: 5,
    maxStat: 6,
    suffix: " years",
    prefix: "Under ",
  },
  {
    icon: "🏡",
    title: "Property Value",
    description:
      "Solar-equipped properties command higher resale values and attract energy-conscious buyers.",
    stat: 15,
    suffix: "%",
    prefix: "Up to ",
  },
  {
    icon: "🔋",
    title: "Energy Independence",
    description:
      "Generate your own power and reduce dependence on grid tariffs and unpredictable rate hikes.",
    stat: 70,
    suffix: "%",
    prefix: "Up to ",
    unit: "Self-sufficiency",
  },
];
