"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Target } from "lucide-react";
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { aboutFeatures, aboutIntro, aboutStory, company } from "@/content";
import { images } from "@/config/images";

export function About() {
  return (
    <section id="about" className="section-padding bg-warm-white" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left column: sticky imagery */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative lg:sticky lg:top-32"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-xl shadow-primary/10">
              <Image
                src={images.about.team}
                alt="SAF Malabar Energy solar installation team at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* Founded badge */}
            <div className="absolute -right-3 -top-5 rounded-2xl border border-border bg-white px-5 py-4 shadow-lg shadow-primary/10 sm:-right-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Founded</p>
              <p className="text-2xl font-extrabold text-primary">{company.founded}</p>
            </div>

            {/* Experience card */}
            <div className="absolute -bottom-6 left-5 right-5 rounded-2xl bg-primary px-6 py-5 text-white shadow-xl shadow-primary/25 sm:left-8 sm:right-auto">
              <p className="text-3xl font-extrabold">5+ Years</p>
              <p className="mt-0.5 text-sm text-white/75">
                Engineering solar across the Malabar region
              </p>
            </div>
          </motion.div>

          {/* Right column: narrative */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="eyebrow mb-4 text-secondary">
              <span className="h-px w-7 bg-current opacity-70" aria-hidden="true" />
              About Us
            </span>
            <h2
              id="about-heading"
              className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Engineering Excellence, Rooted in Kerala
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-muted sm:text-lg">{aboutIntro}</p>

            {/* Mission & vision */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.07] text-primary">
                  <Target size={19} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-bold text-dark">Our Mission</h3>
                <p className="text-sm leading-relaxed text-muted">{aboutStory.mission}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/[0.08] text-secondary">
                  <Compass size={19} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-bold text-dark">Our Vision</h3>
                <p className="text-sm leading-relaxed text-muted">{aboutStory.vision}</p>
              </div>
            </div>

            {/* Why us + engineering approach */}
            <div className="mt-5 rounded-2xl bg-primary-dark p-7 text-white">
              <h3 className="mb-2 font-bold">Why SAF Malabar Energy</h3>
              <p className="text-sm leading-relaxed text-white/75">{aboutStory.whyUs}</p>
              <div className="mt-5 border-t border-white/10 pt-5">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary-light">
                  Engineering Approach
                </h4>
                <p className="text-sm leading-relaxed text-white/75">{aboutStory.engineering}</p>
              </div>
            </div>

            {/* Feature list */}
            <motion.ul
              className="mt-10 space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              role="list"
            >
              {aboutFeatures.map((feature, index) => (
                <motion.li key={feature.title} variants={fadeUp} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
                      <feature.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    {index < aboutFeatures.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-border" aria-hidden="true" />
                    )}
                  </div>
                  <div className="pb-1">
                    <h3 className="mb-1 font-bold text-dark">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Commitment row */}
        <motion.div
          className="mt-20 grid gap-5 sm:grid-cols-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="rounded-2xl border border-primary/10 bg-primary/[0.04] p-7">
            <h3 className="mb-2 font-bold text-primary">Commitment to Kerala</h3>
            <p className="text-sm leading-relaxed text-muted">{aboutStory.keralaCommitment}</p>
          </div>
          <div className="rounded-2xl border border-secondary/15 bg-secondary/[0.05] p-7">
            <h3 className="mb-2 font-bold text-secondary">Commitment to Sustainability</h3>
            <p className="text-sm leading-relaxed text-muted">{aboutStory.sustainability}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
