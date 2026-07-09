import {
  Building2,
  Factory,
  Home,
  Settings,
  Sun,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Sun,
  Settings,
  Wrench,
  Home,
  Building2,
  Factory,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sun;
}
