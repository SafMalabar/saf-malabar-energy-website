"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { whyChooseUs } from "@/content";

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="section-padding relative overflow-hidden bg-white"
      aria-labelledby="why-us-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          label="Why Choose Us"
          title="The SAF Malabar Difference"
          description="We don't compete on price alone. We compete on engineering quality, transparency, and the long-term performance of every system we install."
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
              variants={scaleIn}
              whileHover={{ y: -6 }}
              className="card-premium group flex flex-col p-7"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                <item.icon size={24} strokeWidth={1.5} aria-hidden="true" />
              </div>

              <h3 className="mb-2 text-base font-bold text-dark">{item.title}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                {item.description}
              </p>

              <p className="rounded-lg bg-warm-white px-3 py-2 text-xs font-medium text-primary/70">
                {item.comparison}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
