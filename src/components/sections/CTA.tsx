"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary px-8 py-16 text-center sm:px-16 lg:py-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gold/10" />
          <motion.div
            className="pointer-events-none absolute right-12 top-12 text-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <Sun size={120} />
          </motion.div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Switch to Solar?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
              Join hundreds of satisfied customers across Kerala who have made
              the switch to clean, affordable solar energy.
            </p>
            <div className="mt-8">
              <Button href="#contact" variant="white">
                Request Free Consultation
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
