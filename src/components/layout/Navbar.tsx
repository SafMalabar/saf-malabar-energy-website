"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Menu, Phone, X, MapPin } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks, sectionIds, company } from "@/content";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const getHrefId = (href: string) => href.replace("#", "");

  return (
    <header className="fixed inset-x-0 top-0 z-50" role="banner">
      {/* Utility bar */}
      <div
        className={`hidden bg-primary-dark text-white transition-all duration-300 lg:block ${
          scrolled ? "h-0 overflow-hidden opacity-0" : "opacity-100"
        }`}
      >
        <div className="section-container flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${company.phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
            >
              <Phone size={12} aria-hidden="true" />
              {company.phones[0]}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
            >
              <Mail size={12} aria-hidden="true" />
              {company.email}
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <MapPin size={12} aria-hidden="true" />
            <span>Serving {company.serviceAreas.join(" · ")}</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white/95 shadow-[0_1px_0_rgba(12,92,63,0.08),0_8px_32px_-12px_rgba(12,92,63,0.12)] backdrop-blur-md"
            : "bg-white shadow-[0_1px_0_rgba(12,92,63,0.06)]"
        }`}
      >
        <nav
          className="section-container flex items-center justify-between py-3"
          aria-label="Main navigation"
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 xl:flex" role="list">
            {navLinks.map((link) => {
              const id = getHrefId(link.href);
              const isActive = activeId === id;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative rounded-lg px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-dark/65 hover:text-primary"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-[13px] h-[2.5px] rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden xl:block">
            <Button href="#contact" variant="primary">
              Get Free Quote
            </Button>
          </div>

          <button
            type="button"
            className="relative z-50 rounded-xl p-2.5 text-primary transition-colors hover:bg-primary/5 xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white pt-[4.5rem] xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1 px-5 py-4" role="list">
              {navLinks.map((link, i) => {
                const id = getHrefId(link.href);
                const isActive = activeId === id;

                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className={`block rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-primary/5 text-primary"
                          : "text-dark hover:bg-primary/5 hover:text-primary"
                      }`}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4 px-4"
              >
                <Button href="#contact" className="w-full" onClick={() => setMobileOpen(false)}>
                  Get Free Quote
                </Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
