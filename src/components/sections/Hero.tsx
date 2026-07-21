"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Shield, Star, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, slideRight, staggerContainer } from "@/lib/animations";
import { company, heroStats } from "@/content";
import { images } from "@/config/images";

const floatingStats = [
  { icon: Shield, label: "MNRE Compliant", position: "top-8 -left-4 lg:-left-8" },
  { icon: Star, label: "98% Satisfaction", position: "bottom-24 -right-4 lg:-right-6" },
  { icon: Sun, label: "500+ Installed", position: "bottom-8 -left-2 lg:left-4" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-warm-white"
      aria-label="Hero"
    >
      {/* Solar ray background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-accent/[0.04] blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-secondary/[0.05] blur-3xl animate-solar-ray" />
        {/* Subtle ray lines */}
        <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.03]" viewBox="0 0 400 800">
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={i * 100}
              x2="400"
              y2={i * 100 + 200}
              stroke="#0a4d2e"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 pb-20 pt-28 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-28 lg:pt-32">
        {/* Left content */}
        <div className="order-2 lg:order-1">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
              <Sun size={14} className="text-secondary" aria-hidden="true" />
              Engineering Kerala&apos;s Solar Future
            </div>

            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-dark sm:text-5xl lg:text-[3.5rem]">
              Precision Solar Systems Built for{" "}
              <span className="text-primary">25+ Years</span> of Performance
            </h1>

            <p className="prose-narrow mt-6 text-base leading-[1.75] text-muted sm:text-lg">
              {company.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#contact">
                Get Free Engineering Assessment
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="#projects" variant="outline">
                View Our Projects
              </Button>
            </div>

            {/* Service areas */}
            <div className="mt-8 flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} className="shrink-0 text-secondary" aria-hidden="true" />
              <span>
                Serving{" "}
                {company.serviceAreas.slice(0, 3).join(", ")}
                {" & more across Kerala"}
              </span>
            </div>
          </motion.div>

          {/* Hero stats row */}
          <motion.div
            className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            {heroStats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center sm:text-left">
                <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-muted sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right image with floating cards */}
        <motion.div
          className="relative order-1 lg:order-2"
          variants={slideRight}
          initial="hidden"
          animate="visible"
        >
          <div className="relative mx-auto aspect-[4/5] max-w-lg overflow-hidden rounded-3xl shadow-2xl shadow-primary/10 lg:max-w-none lg:aspect-[4/5]">
            <div className="absolute -inset-3 rounded-[2rem] border border-primary/10" aria-hidden="true" />
            <div className="absolute -inset-1 rounded-[1.75rem] border border-secondary/20" aria-hidden="true" />

            <Image
              src={images.hero.solar}
              alt="SAF Malabar Energy technician inspecting a solar panel installation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" aria-hidden="true" />
          </div>

          {/* Floating statistic cards */}
          {floatingStats.map((card, i) => (
            <motion.div
              key={card.label}
              className={`absolute ${card.position} z-10 hidden sm:block`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.15 }}
            >
              <div className="glass flex items-center gap-2.5 rounded-2xl border border-white/50 px-4 py-3 shadow-lg shadow-primary/10 animate-float" style={{ animationDelay: `${i * 2}s` }}>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                  <card.icon size={16} aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-dark">{card.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
