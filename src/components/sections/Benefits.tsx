"use client";

import { motion } from "framer-motion";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { benefits } from "@/content";

export function Benefits() {
  return (
    <section id="benefits" className="section-padding bg-warm-white" aria-labelledby="benefits-heading">
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
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
          {benefits.map((benefit) => (
            <motion.article
              key={benefit.title}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="card-premium flex flex-col items-center p-8 text-center"
            >
              <span className="mb-4 text-3xl" role="img" aria-label={benefit.title}>
                {benefit.icon}
              </span>

              <CircularProgress
                value={benefit.stat}
                maxValue={benefit.maxStat ?? 100}
                suffix={benefit.suffix}
                prefix={benefit.prefix}
                label={benefit.unit}
                size={110}
              />

              <h3 className="mt-5 text-base font-bold text-dark">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
