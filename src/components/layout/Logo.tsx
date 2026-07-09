import Link from "next/link";
import { Sun } from "lucide-react";
import { company } from "@/content";

interface LogoProps {
  variant?: "full" | "compact";
  light?: boolean;
  className?: string;
}

export function Logo({ variant = "compact", light = false, className = "" }: LogoProps) {
  const titleColor = light ? "text-white" : "text-primary";
  const subtitleColor = light ? "text-secondary-light" : "text-secondary";
  const iconBg = light ? "bg-white/15" : "bg-primary";

  return (
    <Link
      href="#home"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label={`${company.name} — Home`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-105 sm:h-11 sm:w-11 ${iconBg} ${light ? "" : "shadow-primary/20"}`}
      >
        <Sun size={variant === "full" ? 24 : 20} aria-hidden="true" />
      </div>
      <div className={variant === "compact" ? "hidden sm:block" : ""}>
        <span className={`block text-sm font-bold leading-tight sm:text-base ${titleColor}`}>
          SAF Malabar
        </span>
        <span className={`block text-[10px] font-semibold uppercase tracking-widest sm:text-xs ${subtitleColor}`}>
          Energy
        </span>
      </div>
    </Link>
  );
}
