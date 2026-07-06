"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { slideLeft, slideRight, viewportOnce } from "@/lib/animations";
import { whyChooseUs } from "@/content";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Why Choose Us"
          title="Your Trusted Solar Partner"
          description="We combine expertise, quality, and dedication to deliver the best solar experience for every customer."
        />

        <div className="space-y-6">
          {whyChooseUs.map((item, index) => {
            const isEven = index % 2 === 0;
            const Variant = isEven ? slideLeft : slideRight;

            return (
              <motion.div
                key={item.title}
                variants={Variant}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className={`flex flex-col items-center gap-6 rounded-2xl border border-primary/5 bg-cream/50 p-6 sm:flex-row sm:p-8 ${
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <div className={isEven ? "sm:text-left" : "sm:text-right"}>
                  <h3 className="mb-2 text-xl font-bold text-dark">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-dark/60 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
