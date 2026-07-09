"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CircularProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  suffix?: string;
  prefix?: string;
  label?: string;
  className?: string;
}

export function CircularProgress({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  suffix = "",
  prefix = "",
  label,
  className = "",
}: CircularProgressProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [animatedValue, setAnimatedValue] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillPercent = Math.min((value / maxValue) * 100, 100);
  const strokeDashoffset = circumference - (animatedValue / fillPercent) * fillPercent / 100 * circumference;

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(eased * fillPercent);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, fillPercent]);

  const displayNum = Math.round((animatedValue / fillPercent) * value) || 0;

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg
        ref={ref}
        width={size}
        height={size}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-primary/10"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-primary"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
        <span className="text-center text-lg font-bold leading-tight text-primary sm:text-xl">
          {prefix}
          {displayNum}
          {suffix}
        </span>
        {label && (
          <span className="mt-0.5 text-center text-[9px] font-medium uppercase tracking-wider text-muted">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
