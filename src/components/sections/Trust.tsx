"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { trustMetrics } from "@/content";

export function Trust() {
  const headline = trustMetrics.slice(0, 4);
  const credentials = trustMetrics.slice(4);

  return (
    <section
      className="relative overflow-hidden bg-primary-dark py-16 text-white lg:py-20"
      aria-label="Trust metrics"
    >
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />

      <div className="section-container relative">
        <motion.div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {headline.map((metric) => (
            <motion.div key={metric.label} variants={fadeUp} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-secondary-light">
                <metric.icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-white">{metric.value}</p>
                <p className="mt-1 text-sm font-semibold text-white/90">{metric.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Credential badges */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
            Certified &amp; Backed By
          </p>
          {credentials.map((metric) => (
            <div key={metric.label} className="flex items-center gap-2.5">
              <metric.icon size={16} className="text-secondary-light" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-sm font-semibold text-white/85">
                {metric.value} <span className="font-normal text-white/55">{metric.label}</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
