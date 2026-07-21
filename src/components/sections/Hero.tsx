"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck, Sun, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { company, heroStats } from "@/content";
import { images } from "@/config/images";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white"
      aria-label="Hero"
    >
      {/* Engineering grid backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_20%,transparent_75%)]" />
        <div className="absolute -right-40 top-[-160px] h-[560px] w-[560px] rounded-full bg-primary/[0.05] blur-3xl" />
        <div className="absolute -left-40 bottom-[-120px] h-[420px] w-[420px] rounded-full bg-secondary/[0.06] blur-3xl" />
      </div>

      <div className="section-container relative grid items-center gap-14 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-24 lg:pt-48">
        {/* Left content */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05 }}
          >
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-primary/15 bg-primary/[0.04] py-1.5 pl-1.5 pr-4 text-xs font-semibold text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                <Sun size={13} aria-hidden="true" />
              </span>
              MNRE-Compliant Solar EPC · Kerala
            </div>

            <h1 className="text-balance text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-dark sm:text-5xl lg:text-6xl">
              Solar power,{" "}
              <span className="text-primary">engineered</span>
              {" "}to perform for 25 years.
            </h1>

            <p className="prose-narrow mt-6 text-base leading-[1.75] text-muted sm:text-lg">
              {company.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#contact">
                Get Free Engineering Assessment
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="#projects" variant="outline">
                View Our Projects
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} className="shrink-0 text-primary" aria-hidden="true" />
              <span>
                Serving {company.serviceAreas.slice(0, 3).join(", ")} &amp; more across Kerala
              </span>
            </div>
          </motion.div>

          {/* Hero stats row */}
          <motion.div
            className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white/70 py-5 shadow-sm backdrop-blur-sm"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
          >
            {heroStats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="px-5 text-center sm:text-left">
                <p className="text-2xl font-extrabold tracking-tight text-primary sm:text-[1.75rem]">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-muted sm:text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl shadow-primary/15">
            <div className="relative aspect-[5/6] sm:aspect-[4/4.4]">
              <Image
                src={images.hero.solar}
                alt="SAF Malabar Energy technician inspecting a rooftop solar panel installation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* In-image caption strip */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-white/85 px-5 py-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
              <div>
                <p className="text-sm font-bold text-dark">Rooftop Commissioning</p>
                <p className="text-xs text-muted">Tier-1 panels · Certified engineers</p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <Zap size={17} aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Floating credential cards */}
          <motion.div
            className="absolute -left-4 top-10 z-10 hidden lg:block"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg shadow-primary/10 animate-float">
              <ShieldCheck size={18} className="text-primary" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-dark">25-Year Warranty</p>
                <p className="text-[10px] text-muted">Tier-1 manufacturers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-4 bottom-28 z-10 hidden lg:block"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 }}
          >
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg shadow-primary/10 animate-float" style={{ animationDelay: "2s" }}>
              <BadgeCheck size={18} className="text-secondary" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-dark">500+ Installations</p>
                <p className="text-[10px] text-muted">98% satisfaction rate</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
