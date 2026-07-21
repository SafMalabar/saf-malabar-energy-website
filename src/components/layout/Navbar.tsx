"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks, sectionIds } from "@/content";
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-primary/95 shadow-lg shadow-primary/20 backdrop-blur-md"
          : "bg-primary"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-3.5 lg:px-10"
        aria-label="Main navigation"
      >
        <Logo light />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex" role="list">
          {navLinks.map((link) => {
            const id = getHrefId(link.href);
            const isActive = activeId === id;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-secondary-light"
                      : "text-white/80 hover:text-white"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden xl:block">
          <Button href="#contact" variant="secondary">
            Get Free Quote
          </Button>
        </div>

        <button
          type="button"
          className="relative z-50 rounded-xl p-2.5 text-white transition-colors hover:bg-white/10 xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-warm-white pt-[4.5rem] xl:hidden"
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
