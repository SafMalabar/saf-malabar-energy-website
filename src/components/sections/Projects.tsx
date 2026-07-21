"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, MapPin, TrendingDown, Zap } from "lucide-react";
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
      className="group overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/75 via-primary-dark/10 to-transparent" />

        {/* Capacity chip */}
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-primary backdrop-blur-sm">
          <Zap size={12} aria-hidden="true" />
          {project.capacity}
        </span>

        <div className="absolute bottom-4 left-5 right-5">
          <span className="mb-2 inline-block rounded-md bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {project.category}
          </span>
          <h3 className="text-lg font-bold leading-snug text-white">{project.title}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-primary" aria-hidden="true" />
            {project.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary" aria-hidden="true" />
            {project.completedDate}
          </span>
        </div>

        <div className="mb-5 flex items-center gap-2.5 rounded-xl bg-primary/[0.05] px-4 py-3">
          <TrendingDown size={16} className="shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm font-bold text-primary">{project.savings}</p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between text-sm font-semibold text-dark transition-colors hover:text-primary"
          aria-expanded={expanded}
        >
          Read Project Story
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/[0.07] text-primary"
          >
            <ChevronDown size={15} aria-hidden="true" />
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

  const filterButtons: { id: ProjectCategory | "all"; label: string }[] = [
    { id: "all", label: "All Projects" },
    ...projectCategories.map((cat) => ({ id: cat.id, label: cat.label })),
  ];

  return (
    <section id="projects" className="section-padding bg-warm-white" aria-labelledby="projects-heading">
      <div className="section-container">
        <SectionHeading
          label="Featured Installations"
          title="Proven Results Across Kerala"
          description="Real projects, real savings. Explore our residential, commercial, and industrial installations across the Malabar region."
        />

        {/* Category filter */}
        <motion.div
          className="mb-12 flex justify-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div
            className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-white p-1.5 shadow-sm"
            role="tablist"
            aria-label="Project categories"
          >
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === btn.id}
                onClick={() => setActiveCategory(btn.id)}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === btn.id
                    ? "text-white"
                    : "text-muted hover:text-primary"
                }`}
              >
                {activeCategory === btn.id && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{btn.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
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
