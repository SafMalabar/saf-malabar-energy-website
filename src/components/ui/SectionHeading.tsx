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
    <motion.div
      className={`mb-14 max-w-2xl ${alignClass}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {label && (
        <span
          className={`mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] ${
            light ? "text-gold" : "text-secondary"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-dark"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/80" : "text-dark/70"
          }`}
        >
          {description}
        </p>
      )}
      <div
        className={`mt-5 h-1 w-16 rounded-full bg-gold ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
