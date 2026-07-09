import {
  Award,
  BadgeCheck,
  Clock,
  Headphones,
  Shield,
  Sun,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const trustMetrics: {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
}[] = [
  {
    icon: Sun,
    value: "5+",
    label: "Years of Experience",
    description: "Proven track record across Kerala since 2019",
  },
  {
    icon: Zap,
    value: "500+",
    label: "Projects Completed",
    description: "Residential, commercial, and industrial installations",
  },
  {
    icon: Award,
    value: "2.5+",
    label: "MW Installed",
    description: "Cumulative clean energy capacity deployed",
  },
  {
    icon: Users,
    value: "98%",
    label: "Customer Satisfaction",
    description: "Measured across post-installation surveys",
  },
  {
    icon: BadgeCheck,
    value: "MNRE",
    label: "Government Standards",
    description: "Compliant with national solar guidelines",
  },
  {
    icon: Shield,
    value: "Certified",
    label: "Engineers & Technicians",
    description: "Trained, certified installation teams",
  },
  {
    icon: Clock,
    value: "25 Yr",
    label: "Panel Warranty",
    description: "Tier-1 manufacturer warranties included",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Support Availability",
    description: "Emergency response when you need it most",
  },
];
