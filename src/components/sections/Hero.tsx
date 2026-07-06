"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, slideRight } from "@/lib/animations";
import { company, heroStats } from "@/content";
import { images } from "@/config/images";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-cream pt-2"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        {/* Left content */}
        <div className="order-2 lg:order-1">
          

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/60 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm">
              <Leaf size={14} />
              Power Your Home, Lower Your Bills
            </div>

            <h1 className="text-4xl font-bold leading-[1.15] text-dark sm:text-5xl lg:text-[3.5rem]">
               Clean  {" "}
              <span className="text-primary">Energy,</span>{" "}
              <span className="text-secondary">Lower</span> Bills,
              <span className="text-secondary">Brighter</span> Future

            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-dark/70 sm:text-lg">
              Providing reliable solar energy solutions for homes, businesses,
              and industries across Kerala.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#contact">
                Get Quote
                <ArrowRight size={16} />
              </Button>
              <Button href="#contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-12 flex flex-wrap gap-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          className="relative order-1 lg:order-2"
          variants={slideRight}
          initial="hidden"
          animate="visible"
        >
          <div className="relative mx-auto aspect-[4/3] max-w-xl overflow-hidden rounded-3xl shadow-2xl shadow-primary/10 lg:max-w-none">
            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-[2rem] border-2 border-gold/30" />
            <div className="absolute -inset-1 rounded-[1.75rem] border border-primary/20" />

            <Image
              src={images.hero.solar}
              alt="Solar technician inspecting solar panels at sunset"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />

            {/* Glass badge */}
           
          </div>
        </motion.div>
      </div>
    </section>
  );
}
