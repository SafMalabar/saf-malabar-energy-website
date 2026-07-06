/** Solar benefits with animated statistics */
export const benefits: {
  icon: string;
  title: string;
  description: string;
  stat: number;
  suffix: string;
  prefix?: string;
}[] = [
  {
    icon: "⚡",
    title: "Reduce Electricity Bills",
    description: "Save up to 90% on your monthly electricity costs with solar power.",
    stat: 90,
    suffix: "%",
  },
  {
    icon: "🌱",
    title: "Reduce Carbon Footprint",
    description: "Eliminate tons of CO₂ emissions over the lifetime of your system.",
    stat: 4,
    suffix: " tons",
    prefix: "Up to ",
  },
  {
    icon: "☀️",
    title: "Renewable Energy",
    description: "Tap into Kerala's abundant sunshine for clean, unlimited power.",
    stat: 25,
    suffix: "+ years",
    prefix: "",
  },
  {
    icon: "🏡",
    title: "Increase Property Value",
    description: "Solar installations boost property resale value significantly.",
    stat: 15,
    suffix: "%",
    prefix: "Up to ",
  },
];
