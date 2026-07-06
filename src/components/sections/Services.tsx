"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { services } from "@/content";

export function Services() {
  return (
    <section id="services" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Our Services"
          title="Comprehensive Solar Solutions"
          description="From design to installation and maintenance, we provide end-to-end solar energy services tailored to your needs."
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Top accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-gold opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20">
                <service.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-dark">{service.title}</h3>
              <p className="text-sm leading-relaxed text-dark/60">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
