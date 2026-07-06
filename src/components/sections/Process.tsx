"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { processSteps } from "@/content";

export function Process() {
  return (
    <section id="process" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Our Process"
          title="How We Work"
          description="A simple, transparent process from consultation to ongoing support."
        />

        <motion.div
          className="relative mx-auto max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Vertical line */}
          <div className="absolute left-7 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-secondary to-gold md:left-1/2 md:block md:-translate-x-px" />

          {processSteps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={step.title}
                variants={scaleIn}
                className={`relative mb-8 flex items-start gap-6 md:mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon node */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <step.icon size={24} strokeWidth={1.5} />
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 rounded-2xl border border-primary/5 bg-cream p-6 shadow-sm md:w-[calc(50%-3rem)] ${
                    isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-gold">
                    Step {index + 1}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-dark">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-dark/60">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
