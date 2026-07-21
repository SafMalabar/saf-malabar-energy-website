"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
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
      <div className="section-container">
        <div className="mb-14 grid items-end gap-6 lg:mb-16 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            label="Our Services"
            title="End-to-End Solar Engineering Services"
            description="From initial energy audit to lifetime maintenance—every stage handled by our in-house engineering and installation teams."
            align="left"
            className="mb-0 lg:mb-0"
          />
          <motion.a
            href="#contact"
            className="hidden items-center gap-2 self-end whitespace-nowrap rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white lg:inline-flex"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            Discuss Your Project
            <ArrowUpRight size={16} aria-hidden="true" />
          </motion.a>
        </div>

        <motion.div
          className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {servicesList.map((service, index) => {
            const Icon = getIcon(service.iconName ?? "Sun");
            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                className="group relative flex flex-col bg-white p-8 transition-colors duration-300 hover:bg-warm-white lg:p-9"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl bg-primary/[0.06] text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                    <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <span className="font-display text-sm font-bold text-dark/15 transition-colors group-hover:text-primary/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold text-dark">{service.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted">{service.description}</p>

                <ul className="mb-6 space-y-2.5" role="list">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-dark/75">
                      <span className="mt-0.5 flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-primary/[0.08]">
                        <Check size={11} className="text-primary" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
                  <p className="pr-3 text-xs leading-snug text-muted">
                    <span className="font-semibold text-dark">Ideal for:</span> {service.idealFor}
                  </p>
                  <a
                    href="#contact"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                    aria-label={`Enquire about ${service.title}`}
                  >
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
