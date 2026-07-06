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
}[] = [
  {
    icon: Sun,
    title: "Solar Panel Installation",
    description:
      "Professional installation of high-efficiency solar panels for maximum energy output and long-term reliability.",
  },
  {
    icon: Settings,
    title: "Solar System Design",
    description:
      "Custom-engineered solar systems tailored to your energy needs, roof structure, and budget requirements.",
  },
  {
    icon: Wrench,
    title: "Operation & Maintenance",
    description:
      "Comprehensive O&M services to keep your solar system running at peak performance year-round.",
  },
  {
    icon: Home,
    title: "Residential Solar",
    description:
      "Affordable rooftop solar solutions that slash electricity bills and increase your home's value.",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description:
      "Scalable solar installations for offices, retail spaces, and commercial buildings across Kerala.",
  },
  {
    icon: Factory,
    title: "Industrial Solar",
    description:
      "Large-scale solar power systems designed for factories and industrial facilities with high energy demands.",
  },
];
