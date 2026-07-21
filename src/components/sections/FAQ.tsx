"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { faqs as defaultFaqs } from "@/content";

interface FAQProps {
  items?: { question: string; answer: string }[];
}

export function FAQ({ items }: FAQProps) {
  const faqList = items ?? defaultFaqs;

  return (
    <section id="faq" className="section-padding bg-white" aria-labelledby="faq-heading">
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          label="FAQ"
          title="Common Questions, Clear Answers"
          description="Everything you need to know about going solar in Kerala—from savings and subsidies to installation timelines and warranties."
        />

        <motion.div
          className="mx-auto max-w-3xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Accordion items={faqList} />
        </motion.div>
      </div>
    </section>
  );
}
