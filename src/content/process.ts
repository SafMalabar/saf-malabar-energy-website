import { MapPin, Phone, Settings, Sun, Wrench, Zap, type LucideIcon } from "lucide-react";

export const processSteps: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Phone,
    title: "Consultation",
    description: "Free initial consultation to understand your energy needs and goals.",
  },
  {
    icon: MapPin,
    title: "Site Inspection",
    description: "On-site assessment of your property for optimal solar panel placement.",
  },
  {
    icon: Settings,
    title: "System Design",
    description: "Custom solar system design with detailed proposal and cost breakdown.",
  },
  {
    icon: Sun,
    title: "Installation",
    description: "Professional installation by our certified technicians.",
  },
  {
    icon: Zap,
    title: "Testing",
    description: "Thorough testing and commissioning to ensure peak performance.",
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    description: "Ongoing monitoring, maintenance, and support for your solar system.",
  },
];
