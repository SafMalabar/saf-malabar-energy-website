"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
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
          className={i < rating ? "fill-solar text-solar" : "text-border"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials({ items }: TestimonialsProps) {
  const list = items ?? defaultTestimonials;
  const [featured, ...rest] = list;

  return (
    <section
      id="testimonials"
      className="section-padding bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="section-container">
        <SectionHeading
          label="Client Testimonials"
          title="Trusted by Homeowners and Businesses Across Kerala"
          description="Our clients measure success in reduced bills, reliable performance, and responsive support—not marketing promises."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Featured review */}
          {featured && (
            <motion.blockquote
              className="relative flex flex-col overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-xl shadow-primary/20 lg:row-span-2 lg:p-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Quote size={72} className="absolute -right-3 -top-3 text-white/[0.08]" aria-hidden="true" />
              <StarRating rating={featured.rating} />
              <p className="relative my-6 flex-1 text-lg font-medium leading-relaxed text-white/90 lg:text-xl">
                &ldquo;{featured.review}&rdquo;
              </p>
              <footer className="relative flex items-center gap-4 border-t border-white/15 pt-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {featured.initials}
                </div>
                <div>
                  <cite className="not-italic">
                    <p className="font-bold text-white">{featured.name}</p>
                  </cite>
                  <p className="text-sm text-white/60">{featured.location}</p>
                  <p className="text-sm font-medium text-secondary-light">{featured.project}</p>
                </div>
              </footer>
            </motion.blockquote>
          )}

          {/* Remaining reviews */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {rest.map((t) => (
              <motion.blockquote
                key={t.id}
                variants={fadeUp}
                className="card-premium flex flex-col p-7"
              >
                <StarRating rating={t.rating} />

                <p className="my-5 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{t.review}&rdquo;
                </p>

                <footer className="flex items-center gap-3 border-t border-border pt-5">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/[0.08] text-xs font-bold text-primary"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <cite className="not-italic">
                      <p className="text-sm font-bold text-dark">{t.name}</p>
                    </cite>
                    <p className="text-xs text-muted">
                      {t.location} · <span className="font-medium text-primary">{t.project}</span>
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
