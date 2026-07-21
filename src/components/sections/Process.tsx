"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { processSteps } from "@/content";

export function Process() {
  return (
    <section id="process" className="section-padding bg-white" aria-labelledby="process-heading">
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          label="Our Process"
          title="A Transparent Path from Consultation to Commissioning"
          description="Six clearly defined stages. No surprises, no hidden steps—just professional engineering from start to finish."
        />

        <motion.div
          className="relative mx-auto max-w-4xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Animated progress line */}
          <div className="absolute left-7 top-0 hidden h-full w-0.5 md:left-1/2 md:block md:-translate-x-px" aria-hidden="true">
            <div className="h-full w-full bg-border" />
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-primary via-secondary to-accent"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {processSteps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={step.title}
                variants={scaleIn}
                className={`relative mb-10 flex items-start gap-6 md:mb-14 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon node */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25 ring-4 ring-white md:absolute md:left-1/2 md:-translate-x-1/2">
                  <step.icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </div>

                {/* Content card */}
                <article
                  className={`flex-1 rounded-2xl border border-border bg-warm-white p-6 shadow-sm md:w-[calc(50%-3.5rem)] ${
                    isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-dark">{step.title}</h3>
                  <p className="mb-3 text-sm font-medium text-dark/80">{step.description}</p>
                  <p className="text-sm leading-relaxed text-muted">{step.detail}</p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
