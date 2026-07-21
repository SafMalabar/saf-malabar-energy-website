"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { whyChooseUs } from "@/content";

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="section-padding relative overflow-hidden bg-primary-dark"
      aria-labelledby="why-us-heading"
    >
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />

      <div className="section-container relative">
        <SectionHeading
          label="Why Choose Us"
          title="The SAF Malabar Difference"
          description="We don't compete on price alone. We compete on engineering quality, transparency, and the long-term performance of every system we install."
          light
        />

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {whyChooseUs.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 transition-colors duration-300 hover:border-white/[0.16] hover:bg-white/[0.07]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.08] text-secondary-light transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                <item.icon size={22} strokeWidth={1.6} aria-hidden="true" />
              </div>

              <h3 className="mb-2 text-base font-bold text-white">{item.title}</h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-white/60">
                {item.description}
              </p>

              <p className="flex items-start gap-2 border-t border-white/[0.08] pt-4 text-xs leading-relaxed text-white/40">
                <X size={13} className="mt-0.5 shrink-0 text-white/30" aria-hidden="true" />
                {item.comparison}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
