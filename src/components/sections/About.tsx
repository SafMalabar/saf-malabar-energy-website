"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  fadeUp,
  scaleIn,
  slideLeft,
  slideRight,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { aboutFeatures, aboutIntro, aboutStory } from "@/content";
import { images } from "@/config/images";

const storyBlocks = [
  { title: "Our Mission", content: aboutStory.mission },
  { title: "Our Vision", content: aboutStory.vision },
  { title: "Why SAF Malabar Energy", content: aboutStory.whyUs },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-warm-white" aria-labelledby="about-heading">
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          label="About Us"
          title="Engineering Excellence Rooted in Kerala"
          description={aboutIntro}
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image with layered design */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl shadow-primary/10">
              <Image
                src={images.about.team}
                alt="SAF Malabar Energy solar installation team at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-primary/10"
              aria-hidden="true"
            />
            <div
              className="absolute -left-4 top-8 rounded-2xl bg-white px-5 py-4 shadow-lg shadow-primary/10"
            >
              <p className="text-3xl font-bold text-primary">5+</p>
              <p className="text-xs font-medium text-muted">Years Engineering Solar in Kerala</p>
            </div>
          </motion.div>

          {/* Story content */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-8"
          >
            {storyBlocks.map((block) => (
              <div key={block.title}>
                <h3 className="mb-2 text-lg font-bold text-dark">{block.title}</h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">{block.content}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-border bg-white p-6">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-secondary">
                Engineering Approach
              </h3>
              <p className="text-sm leading-relaxed text-muted">{aboutStory.engineering}</p>
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          className="mt-20 grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {aboutFeatures.map((feature) => (
            <motion.article
              key={feature.title}
              variants={scaleIn}
              className="card-premium group p-8"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <feature.icon size={26} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
            </motion.article>
          ))}
        </motion.div>

        {/* Commitment row */}
        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="rounded-2xl bg-primary/5 p-6">
            <h3 className="mb-2 font-bold text-primary">Commitment to Kerala</h3>
            <p className="text-sm leading-relaxed text-muted">{aboutStory.keralaCommitment}</p>
          </div>
          <div className="rounded-2xl bg-accent/5 p-6">
            <h3 className="mb-2 font-bold text-accent">Commitment to Sustainability</h3>
            <p className="text-sm leading-relaxed text-muted">{aboutStory.sustainability}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
