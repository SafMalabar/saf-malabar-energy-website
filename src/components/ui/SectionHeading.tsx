"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.header
      className={`mb-14 max-w-3xl lg:mb-16 ${alignClass} ${className}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {label && (
        <span
          className={`eyebrow mb-4 ${
            light ? "text-secondary-light" : "text-secondary"
          }`}
        >
          <span className="h-px w-7 bg-current opacity-70" aria-hidden="true" />
          {label}
          {align === "center" && (
            <span className="h-px w-7 bg-current opacity-70" aria-hidden="true" />
          )}
        </span>
      )}
      <h2
        className={`text-balance text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-dark"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`prose-narrow mt-5 text-base leading-[1.75] sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/75" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </motion.header>
  );
}
