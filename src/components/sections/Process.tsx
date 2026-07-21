"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { processSteps, company } from "@/content";

export function Process() {
  return (
    <section id="process" className="section-padding bg-white" aria-labelledby="process-heading">
      <div className="section-container">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* Sticky intro column */}
          <motion.div
            className="lg:sticky lg:top-36 lg:self-start"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="eyebrow mb-4 text-secondary">
              <span className="h-px w-7 bg-current opacity-70" aria-hidden="true" />
              Our Process
            </span>
            <h2
              id="process-heading"
              className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-dark sm:text-4xl lg:text-[2.75rem]"
            >
              A Transparent Path from Consultation to Commissioning
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-muted sm:text-lg">
              Six clearly defined stages. No surprises, no hidden steps—just professional
              engineering from start to finish.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#contact">
                Start with Step One
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>

            <a
              href={`tel:${company.phones[0].replace(/\s/g, "")}`}
              className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-border bg-warm-white px-5 py-4 transition-colors hover:border-primary/25"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.07] text-primary">
                <PhoneCall size={17} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-muted">Prefer to talk it through?</span>
                <span className="block text-sm font-bold text-dark">{company.phones[0]}</span>
              </span>
            </a>
          </motion.div>

          {/* Steps rail */}
          <motion.ol
            className="relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div
              className="absolute bottom-8 left-[1.6875rem] top-8 w-px bg-gradient-to-b from-primary/30 via-border to-primary/30"
              aria-hidden="true"
            />

            {processSteps.map((step, index) => (
              <motion.li
                key={step.title}
                variants={fadeUp}
                className="group relative flex gap-6 pb-10 last:pb-0 sm:gap-8"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-white text-primary shadow-sm transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                  <step.icon size={23} strokeWidth={1.6} aria-hidden="true" />
                </div>

                <div className="flex-1 rounded-2xl border border-border bg-warm-white p-6 transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-primary/[0.07] sm:p-7">
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-bold text-dark">{step.title}</h3>
                    <span className="font-display text-sm font-extrabold text-primary/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mb-2.5 text-sm font-medium text-dark/75">{step.description}</p>
                  <p className="text-sm leading-relaxed text-muted">{step.detail}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
