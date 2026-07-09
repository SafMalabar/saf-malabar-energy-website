"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, MapPin, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { projects as defaultProjects, projectCategories, type ProjectCategory } from "@/content";

type ProjectItem = {
  id: string;
  title: string;
  category: ProjectCategory | string;
  location: string;
  capacity: string;
  completedDate: string;
  savings: string;
  story: string;
  image: string;
};

function ProjectCard({ project }: { project: ProjectItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      variants={scaleIn}
      layout
      className="card-premium group overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm capitalize">
            {project.category}
          </span>
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted">
            <MapPin size={14} className="shrink-0 text-secondary" aria-hidden="true" />
            {project.location}
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Zap size={14} className="shrink-0 text-secondary" aria-hidden="true" />
            {project.capacity}
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Calendar size={14} className="shrink-0 text-secondary" aria-hidden="true" />
            {project.completedDate}
          </div>
          <div className="font-semibold text-primary">{project.savings}</div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between rounded-xl bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          aria-expanded={expanded}
        >
          Project Story
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown size={18} aria-hidden="true" />
          </motion.span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden text-sm leading-relaxed text-muted"
            >
              <span className="block pt-4">{project.story}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function Projects({ items }: { items?: ProjectItem[] }) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
  const projectList = items ?? defaultProjects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    location: p.location,
    capacity: p.capacity,
    completedDate: p.completedDate,
    savings: p.savings,
    story: p.story,
    image: p.image,
  }));

  const filtered =
    activeCategory === "all"
      ? projectList
      : projectList.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-warm-white" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Featured Installations"
          title="Proven Results Across Kerala"
          description="Real projects, real savings. Explore our residential, commercial, and industrial installations across the Malabar region."
        />

        {/* Category filter */}
        <motion.div
          className="mb-10 flex flex-wrap justify-center gap-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          role="tablist"
          aria-label="Project categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-white text-muted hover:text-primary"
            }`}
          >
            All Projects
          </button>
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white text-muted hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          key={activeCategory}
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
