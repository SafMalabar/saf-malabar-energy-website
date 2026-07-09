import { MapPin, Phone, Settings, Sun, Wrench, Zap, type LucideIcon } from "lucide-react";

export const processSteps: {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
}[] = [
  {
    icon: Phone,
    title: "Consultation",
    description: "Free initial consultation to understand your energy needs and goals.",
    detail:
      "We review your electricity bills, discuss your objectives, and provide preliminary system sizing at no cost.",
  },
  {
    icon: MapPin,
    title: "Site Inspection",
    description: "On-site assessment of your property for optimal solar panel placement.",
    detail:
      "Our engineers evaluate roof structure, shading, orientation, and electrical infrastructure on location.",
  },
  {
    icon: Settings,
    title: "System Design",
    description: "Custom solar system design with detailed proposal and cost breakdown.",
    detail:
      "You receive a comprehensive proposal with generation estimates, payback analysis, and subsidy eligibility.",
  },
  {
    icon: Sun,
    title: "Installation",
    description: "Professional installation by our certified technicians.",
    detail:
      "Mounting, cabling, inverter setup, and safety compliance—all completed with minimal disruption.",
  },
  {
    icon: Zap,
    title: "Testing & Commissioning",
    description: "Thorough testing and commissioning to ensure peak performance.",
    detail:
      "We verify output, configure monitoring, and coordinate net metering approval with the utility.",
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    description: "Ongoing monitoring, maintenance, and support for your solar system.",
    detail:
      "Scheduled inspections, performance reports, and 24/7 emergency support for the life of your system.",
  },
];
