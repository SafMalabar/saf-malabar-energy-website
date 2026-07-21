"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, ShieldCheck, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { company } from "@/content";

export function CTA() {
  return (
    <section className="section-padding bg-white" aria-label="Call to action">
      <div className="section-container">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] bg-primary-dark px-8 py-16 sm:px-14 lg:px-20 lg:py-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-light/25 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" aria-hidden="true" />
          <div
            className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 text-white/[0.05] lg:block animate-spin-slow"
            aria-hidden="true"
          >
            <Sun size={280} strokeWidth={0.75} />
          </div>

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow mb-4 text-secondary-light">
                <span className="h-px w-7 bg-current opacity-70" aria-hidden="true" />
                Start Your Solar Journey
              </p>
              <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Ready for a Free Engineering Assessment?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Join 500+ satisfied customers across Kerala. Get a detailed system
                proposal with savings projections—no obligation, no pressure.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="#contact" variant="white">
                  Request Free Consultation
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button
                  href={`tel:${company.phones[0].replace(/\s/g, "")}`}
                  variant="outline"
                  className="!border-white/40 !text-white hover:!border-white hover:!bg-white/10"
                >
                  <PhoneCall size={15} aria-hidden="true" />
                  Call Now
                </Button>
              </div>
            </div>

            {/* Assurance panel */}
            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm lg:block">
              <ul className="space-y-5" role="list">
                {[
                  "Free site inspection & detailed proposal",
                  "Savings projection with payback timeline",
                  "Subsidy & net metering guidance included",
                  "Response within 24 hours, guaranteed",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3.5 text-sm text-white/85">
                    <ShieldCheck size={18} className="mt-0.5 shrink-0 text-secondary-light" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
