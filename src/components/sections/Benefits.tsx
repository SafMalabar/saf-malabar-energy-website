"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { benefits } from "@/content";

export function Benefits() {
  return (
    <section id="benefits" className="relative overflow-hidden bg-cream py-24 lg:py-32">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Solar Benefits"
          title="Why Go Solar?"
          description="Discover the powerful advantages of switching to solar energy for your home or business."
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={scaleIn}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-white bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="mb-4 block text-3xl">{benefit.icon}</span>
              <p className="mb-1 text-3xl font-bold text-primary">
                <AnimatedCounter
                  value={benefit.stat}
                  suffix={benefit.suffix}
                  prefix={benefit.prefix}
                />
              </p>
              <h3 className="mb-2 text-base font-bold text-dark">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-dark/60">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
