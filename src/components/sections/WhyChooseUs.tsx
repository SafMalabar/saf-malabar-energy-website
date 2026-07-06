"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { whyChooseUs } from "@/content";

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-gradient-to-b from-white to-green-50/40 py-20 lg:py-24"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Why Choose SAF Malabar Energy"
          title="Your Trusted Partner for Reliable Solar Solutions"
          description="We deliver high-quality solar energy systems with expert installation, premium components, and dependable after-sales support—helping homes and businesses save money while embracing clean energy."
        />

        <motion.ul
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {whyChooseUs.map((item) => (
            <motion.li
              key={item.title}
              variants={scaleIn}
              whileHover={{
                y: -8,
                transition: { duration: 0.25 },
              }}
              className="group rounded-2xl border border-primary/10 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white transition-transform duration-300 group-hover:scale-110">
                <item.icon size={26} strokeWidth={1.7} />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-dark">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-dark/70">
                {item.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}