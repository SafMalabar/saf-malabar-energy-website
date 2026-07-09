import {
  Building2,
  Factory,
  Home,
  Settings,
  Sun,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const services: {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  idealFor: string;
}[] = [
  {
    icon: Sun,
    title: "Solar Panel Installation",
    description:
      "End-to-end installation of high-efficiency photovoltaic systems with certified mounting, cabling, and grid integration.",
    benefits: [
      "Tier-1 panel specifications",
      "Structural load assessment",
      "Clean, code-compliant installation",
    ],
    idealFor: "Homeowners and property developers seeking reliable rooftop solar",
  },
  {
    icon: Settings,
    title: "Solar System Design",
    description:
      "Custom-engineered system designs based on energy consumption patterns, roof geometry, and financial objectives.",
    benefits: [
      "Energy yield simulation",
      "ROI and payback analysis",
      "Net metering documentation support",
    ],
    idealFor: "Clients who want a system sized precisely—not oversold",
  },
  {
    icon: Wrench,
    title: "Operation & Maintenance",
    description:
      "Preventive and corrective maintenance programs to maintain peak system performance and protect your investment.",
    benefits: [
      "Performance monitoring",
      "Panel cleaning schedules",
      "Rapid fault diagnosis",
    ],
    idealFor: "Existing solar owners and commercial facility managers",
  },
  {
    icon: Home,
    title: "Residential Solar",
    description:
      "Rooftop systems engineered for homes—reducing electricity bills while increasing property value.",
    benefits: [
      "Bill reduction up to 90%",
      "Subsidy guidance",
      "Aesthetic, low-profile mounting",
    ],
    idealFor: "Families in Malappuram, Kozhikode, and across Kerala",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description:
      "Scalable solar plants for offices, retail, hotels, and institutions with high daytime consumption profiles.",
    benefits: [
      "Demand charge reduction",
      "Accelerated depreciation benefits",
      "Minimal business disruption",
    ],
    idealFor: "Businesses with significant daytime energy loads",
  },
  {
    icon: Factory,
    title: "Industrial Solar",
    description:
      "High-capacity ground-mount and rooftop systems for factories, warehouses, and processing facilities.",
    benefits: [
      "MW-scale capability",
      "Heavy-duty infrastructure",
      "Dedicated project management",
    ],
    idealFor: "Manufacturing and industrial operations with 24/7 energy needs",
  },
];
