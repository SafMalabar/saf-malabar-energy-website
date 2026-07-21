"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { getIcon } from "@/lib/icons";
import { services as defaultServices } from "@/content";

type ServiceItem = {
  iconName?: string;
  title: string;
  description: string;
  benefits: string[];
  idealFor: string;
};

interface ServicesProps {
  items?: ServiceItem[];
}

export function Services({ items }: ServicesProps) {
  const servicesList = items ?? defaultServices.map((s) => ({
    iconName: "Sun",
    title: s.title,
    description: s.description,
    benefits: s.benefits,
    idealFor: s.idealFor,
  }));

  return (
    <section id="services" className="section-padding bg-white" aria-labelledby="services-heading">
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          label="Our Services"
          title="End-to-End Solar Engineering Services"
          description="From initial energy audit to lifetime maintenance—every stage handled by our in-house engineering and installation teams."
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {servicesList.map((service) => {
            const Icon = getIcon(service.iconName ?? "Sun");
            return (
            <motion.article
              key={service.title}
              variants={scaleIn}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="card-premium group relative flex flex-col overflow-hidden p-8"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white shadow-md shadow-primary/20">
                <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
              </div>

              <h3 className="mb-3 text-lg font-bold text-dark">{service.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-muted">{service.description}</p>

              <ul className="mb-5 space-y-2" role="list">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-dark/80">
                    <Check size={15} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <p className="mt-auto border-t border-border pt-4 text-xs text-muted">
                <span className="font-semibold text-dark">Ideal for:</span> {service.idealFor}
              </p>

              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Learn More
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </motion.article>
          );
          })}
        </motion.div>
      </div>
    </section>
  );
}
