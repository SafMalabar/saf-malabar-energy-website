"use client";

import { motion } from "framer-motion";
import {
  BatteryCharging,
  Home,
  Leaf,
  PiggyBank,
  Timer,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { benefits } from "@/content";

const benefitIcons: Record<string, LucideIcon> = {
  "Electricity Savings": PiggyBank,
  "CO₂ Reduction": Leaf,
  "Return on Investment": TrendingUp,
  "Payback Period": Timer,
  "Property Value": Home,
  "Energy Independence": BatteryCharging,
};

export function Benefits() {
  return (
    <section id="benefits" className="section-padding bg-warm-white" aria-labelledby="benefits-heading">
      <div className="section-container">
        <SectionHeading
          label="Solar Benefits"
          title="Measurable Returns on Your Investment"
          description="Solar is not an expense—it's a long-term engineering investment with documented financial and environmental returns."
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {benefits.map((benefit) => {
            const Icon = benefitIcons[benefit.title] ?? TrendingUp;
            return (
              <motion.article
                key={benefit.title}
                variants={fadeUp}
                className="card-premium group relative flex items-center gap-6 overflow-hidden p-7"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/[0.04] transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />

                <CircularProgress
                  value={benefit.stat}
                  maxValue={benefit.maxStat ?? 100}
                  suffix={benefit.suffix}
                  prefix={benefit.prefix}
                  label={benefit.unit}
                  size={104}
                  strokeWidth={7}
                  className="shrink-0"
                />

                <div className="relative">
                  <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/[0.08] text-secondary">
                    <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-dark">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{benefit.description}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
