"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.header
      className={`mb-16 max-w-3xl ${alignClass}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {label && (
        <span
          className={`mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] ${
            light ? "text-secondary-light" : "text-secondary"
          }`}
        >
          <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
          {label}
          {align === "center" && (
            <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
          )}
        </span>
      )}
      <h2
        className={`text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-dark"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`prose-narrow mt-5 text-base leading-[1.75] sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/80" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </motion.header>
  );
}
