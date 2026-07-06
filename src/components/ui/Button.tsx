"use client";

import { motion } from "framer-motion";
import { type MouseEvent, useState } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "white";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/40",
  secondary:
    "bg-secondary text-white shadow-lg shadow-secondary/25 hover:bg-secondary/90",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
  white:
    "bg-white text-primary shadow-lg hover:bg-cream hover:shadow-xl",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  onClick,
}: ButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick?.();
  };

  const classes = `relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleRipple}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/30 animate-ripple"
          style={{ left: ripple.x, top: ripple.y, width: 10, height: 10 }}
        />
      ))}
      {children}
    </motion.button>
  );
}
