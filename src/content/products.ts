import {
  Building2,
  Droplets,
  Factory,
  Grid3x3,
  Lamp,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const products: {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}[] = [
  {
    icon: Grid3x3,
    title: "On-Grid Systems",
    description:
      "Grid-connected systems that export excess power and earn credits through net metering.",
    features: [
      "Net metering compatible",
      "No battery required",
      "Lowest cost per kW",
      "Ideal for stable grid areas",
    ],
  },
  {
    icon: Sun,
    title: "Off-Grid Systems",
    description:
      "Standalone systems with battery storage for locations without reliable grid access.",
    features: [
      "Complete energy independence",
      "Battery backup included",
      "Remote area solutions",
      "Custom load management",
    ],
  },
  {
    icon: Zap,
    title: "Hybrid Systems",
    description:
      "Best of both worlds—grid connection with battery backup for outages and peak shaving.",
    features: [
      "Grid + battery integration",
      "Power during outages",
      "Smart energy management",
      "Future-ready architecture",
    ],
  },
  {
    icon: Droplets,
    title: "Solar Water Pumps",
    description:
      "Solar-powered pumping solutions for agriculture, irrigation, and water supply.",
    features: [
      "Zero fuel costs",
      "Submersible & surface pumps",
      "Government subsidy eligible",
      "Low maintenance design",
    ],
  },
  {
    icon: Lamp,
    title: "Solar Street Lights",
    description:
      "Autonomous LED street lighting for roads, campuses, and public spaces.",
    features: [
      "Automatic dusk-to-dawn",
      "No trenching required",
      "5+ year battery life",
      "Municipal & private projects",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Plants",
    description:
      "Medium to large rooftop and ground-mount systems for commercial establishments.",
    features: [
      "10 kW – 500 kW range",
      "Accelerated depreciation",
      "Remote monitoring",
      "Turnkey EPC delivery",
    ],
  },
  {
    icon: Factory,
    title: "Industrial Plants",
    description:
      "High-capacity solar plants engineered for factories and heavy industrial loads.",
    features: [
      "500 kW – 2 MW+ capacity",
      "Heavy-duty infrastructure",
      "Dedicated project manager",
      "Performance guarantees",
    ],
  },
];
