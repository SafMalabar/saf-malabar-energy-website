"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { products } from "@/content";

/* First three system types get large feature cards; the rest form a compact row. */
export function Products() {
  const featured = products.slice(0, 3);
  const compact = products.slice(3);

  return (
    <section id="products" className="section-padding bg-warm-white" aria-labelledby="products-heading">
      <div className="section-container">
        <SectionHeading
          label="Products & Solutions"
          title="Solar Systems for Every Application"
          description="From residential rooftops to multi-megawatt industrial plants—we engineer the right system for your specific energy profile."
        />

        {/* Featured system types */}
        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {featured.map((product, index) => {
            const isPrimary = index === 0;
            return (
              <motion.article
                key={product.title}
                variants={fadeUp}
                className={`group relative flex flex-col overflow-hidden rounded-3xl p-8 transition-shadow duration-300 lg:p-9 ${
                  isPrimary
                    ? "bg-primary text-white shadow-xl shadow-primary/20"
                    : "border border-border bg-white shadow-sm hover:shadow-lg hover:shadow-primary/[0.08]"
                }`}
              >
                {isPrimary && (
                  <>
                    <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
                    <span className="absolute right-6 top-6 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  </>
                )}

                <div
                  className={`relative mb-6 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl ${
                    isPrimary
                      ? "bg-white/15 text-white"
                      : "bg-primary/[0.06] text-primary"
                  }`}
                >
                  <product.icon size={24} strokeWidth={1.6} aria-hidden="true" />
                </div>

                <h3 className={`relative mb-2.5 text-xl font-bold ${isPrimary ? "text-white" : "text-dark"}`}>
                  {product.title}
                </h3>
                <p className={`relative mb-6 text-sm leading-relaxed ${isPrimary ? "text-white/75" : "text-muted"}`}>
                  {product.description}
                </p>

                <ul className="relative mt-auto space-y-2.5" role="list">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2.5 text-sm ${isPrimary ? "text-white/85" : "text-dark/75"}`}
                    >
                      <Check
                        size={15}
                        strokeWidth={2.5}
                        className={`mt-0.5 shrink-0 ${isPrimary ? "text-secondary-light" : "text-primary"}`}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Compact specialised solutions */}
        <motion.div
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {compact.map((product) => (
            <motion.article
              key={product.title}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/[0.08]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/[0.08] text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <product.icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3 className="text-[0.95rem] font-bold leading-snug text-dark">{product.title}</h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted">{product.description}</p>
              <ul className="space-y-1.5 border-t border-border pt-4" role="list">
                {product.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-dark/70">
                    <Check size={12} strokeWidth={2.5} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
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
