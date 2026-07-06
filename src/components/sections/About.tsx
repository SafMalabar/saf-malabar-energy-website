"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { aboutFeatures, aboutIntro } from "@/content";

export function About() {
  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="About Us"
          title="Leading Solar Energy Provider in Kerala"
          description={aboutIntro}
        />

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {aboutFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              className="group rounded-2xl border border-primary/5 bg-cream p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <feature.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-dark/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
