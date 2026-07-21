"use client";

import { motion } from "framer-motion";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { faqs as defaultFaqs, company } from "@/content";

interface FAQProps {
  items?: { question: string; answer: string }[];
}

export function FAQ({ items }: FAQProps) {
  const faqList = items ?? defaultFaqs;

  return (
    <section id="faq" className="section-padding bg-warm-white" aria-labelledby="faq-heading">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Sticky intro + help card */}
          <motion.div
            className="lg:sticky lg:top-36 lg:self-start"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="eyebrow mb-4 text-secondary">
              <span className="h-px w-7 bg-current opacity-70" aria-hidden="true" />
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Common Questions, Clear Answers
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-muted sm:text-lg">
              Everything you need to know about going solar in Kerala—from savings and
              subsidies to installation timelines and warranties.
            </p>

            <div className="mt-9 rounded-2xl border border-border bg-white p-7">
              <h3 className="font-bold text-dark">Still have questions?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Our engineering team is happy to walk you through anything—no sales
                pressure, just straight answers.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={`tel:${company.phones[0].replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <PhoneCall size={15} aria-hidden="true" />
                  </span>
                  {company.phones[0]}
                </a>
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <MessageCircle size={15} aria-hidden="true" />
                  </span>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Accordion */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Accordion items={faqList} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
