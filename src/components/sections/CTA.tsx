"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function CTA() {
  return (
    <section className="section-padding bg-white" aria-label="Call to action">
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-light px-8 py-16 text-center sm:px-16 lg:py-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-secondary/10" aria-hidden="true" />
          <motion.div
            className="pointer-events-none absolute right-12 top-12 text-white/[0.07]"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            <Sun size={140} />
          </motion.div>

          <div className="relative z-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-secondary-light">
              Start Your Solar Journey
            </p>
            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready for a Free Engineering Assessment?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Join 500+ satisfied customers across Kerala. Get a detailed system
              proposal with savings projections—no obligation, no pressure.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="#contact" variant="white">
                Request Free Consultation
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button
                href="tel:+919605662784"
                variant="outline"
                className="!border-white/40 !text-white hover:!border-white hover:!bg-white/10"
              >
                Call Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
