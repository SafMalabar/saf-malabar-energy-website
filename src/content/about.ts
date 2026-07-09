import { Leaf, Shield, Wrench, type LucideIcon } from "lucide-react";

export const aboutFeatures: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Wrench,
    title: "Engineering-First Approach",
    description:
      "Every system is designed from load analysis and site conditions—not selected from a generic catalogue.",
  },
  {
    icon: Shield,
    title: "Built for Kerala's Climate",
    description:
      "Corrosion-resistant mounting, monsoon-rated cabling, and shading analysis for Malabar region conditions.",
  },
  {
    icon: Leaf,
    title: "Long-Term Partnership",
    description:
      "Installation is the beginning. We provide monitoring, maintenance, and support for the life of your system.",
  },
];
