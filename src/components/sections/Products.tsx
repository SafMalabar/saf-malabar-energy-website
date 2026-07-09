"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { products } from "@/content";

export function Products() {
  return (
    <section id="products" className="section-padding bg-warm-white" aria-labelledby="products-heading">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Products & Solutions"
          title="Solar Systems for Every Application"
          description="From residential rooftops to multi-megawatt industrial plants—we engineer the right system for your specific energy profile."
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {products.map((product) => (
            <motion.article
              key={product.title}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="card-premium flex flex-col p-7"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <product.icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </div>

              <h3 className="mb-2 text-base font-bold text-dark">{product.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">{product.description}</p>

              <ul className="mt-auto space-y-2" role="list">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-dark/80">
                    <Check size={13} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
