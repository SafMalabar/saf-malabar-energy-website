"use client";

import { motion } from "framer-motion";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { trustMetrics } from "@/content";

export function Trust() {
  return (
    <section
      className="relative border-y border-border bg-white py-12 lg:py-16"
      aria-label="Trust metrics"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 lg:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {trustMetrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={scaleIn}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <metric.icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <p className="text-lg font-bold text-primary lg:text-xl">{metric.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-dark sm:text-xs">
                {metric.label}
              </p>
              <p className="mt-1 hidden text-[10px] leading-snug text-muted lg:block">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
