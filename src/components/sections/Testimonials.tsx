"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { testimonials as defaultTestimonials } from "@/content";

type TestimonialItem = {
  id: string;
  name: string;
  location: string;
  project: string;
  review: string;
  rating: number;
  initials: string;
};

interface TestimonialsProps {
  items?: TestimonialItem[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-secondary text-secondary" : "text-border"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials({ items }: TestimonialsProps) {
  const list = items ?? defaultTestimonials;

  return (
    <section
      id="testimonials"
      className="section-padding bg-warm-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          label="Client Testimonials"
          title="Trusted by Homeowners and Businesses Across Kerala"
          description="Our clients measure success in reduced bills, reliable performance, and responsive support—not marketing promises."
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {list.map((t) => (
            <motion.blockquote
              key={t.id}
              variants={scaleIn}
              className="card-premium flex flex-col p-7"
            >
              <StarRating rating={t.rating} />

              <p className="my-5 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{t.review}&rdquo;
              </p>

              <footer className="flex items-center gap-3 border-t border-border pt-5">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <cite className="not-italic">
                    <p className="text-sm font-bold text-dark">{t.name}</p>
                  </cite>
                  <p className="text-xs text-muted">{t.location}</p>
                  <p className="text-xs font-medium text-primary">{t.project}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
