import {
  BadgeCheck,
  Clock,
  DollarSign,
  Headphones,
  Shield,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const whyChooseUs: {
  icon: LucideIcon;
  title: string;
  description: string;
  comparison: string;
}[] = [
  {
    icon: Sparkles,
    title: "Quality Equipment",
    description:
      "We specify tier-1 panels and certified inverters with documented performance warranties—not unbranded components.",
    comparison: "vs. generic installers using lowest-cost hardware",
  },
  {
    icon: Zap,
    title: "Engineering Excellence",
    description:
      "Every system is designed with energy simulation, structural assessment, and shading analysis before a single panel is mounted.",
    comparison: "vs. one-size-fits-all catalogue systems",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Direct access to our technical team—not a call centre. Most issues resolved within 48 hours.",
    comparison: "vs. installers who disappear after commissioning",
  },
  {
    icon: Shield,
    title: "Comprehensive Warranty",
    description:
      "25-year panel warranties, 5–10 year inverter coverage, and workmanship guarantees on every installation.",
    comparison: "vs. limited or unclear warranty terms",
  },
  {
    icon: Wrench,
    title: "Proactive Maintenance",
    description:
      "Scheduled inspections, performance monitoring, and preventive care to protect your long-term returns.",
    comparison: "vs. reactive-only service models",
  },
  {
    icon: Clock,
    title: "Rapid Response",
    description:
      "24/7 emergency support with on-site technicians across Malappuram and Kozhikode districts.",
    comparison: "vs. week-long wait times from distant providers",
  },
  {
    icon: BadgeCheck,
    title: "Full Transparency",
    description:
      "Detailed proposals with itemised costs, expected generation, payback timelines, and subsidy guidance—no hidden charges.",
    comparison: "vs. vague quotes and surprise add-ons",
  },
  {
    icon: DollarSign,
    title: "Long-Term Savings",
    description:
      "Systems engineered for 25+ year performance, maximising ROI and protecting against rising electricity tariffs.",
    comparison: "vs. short-term savings with poor system design",
  },
];
