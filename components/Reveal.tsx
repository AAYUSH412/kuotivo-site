"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * The site's one scroll-entry animation: a short fade and rise on the drafting
 * easing curve. Only `transform` and `opacity` move, so nothing here can
 * trigger layout (tasteskill 6.A). Reduced motion renders the end state
 * outright rather than a faster animation.
 *
 * Deliberately no blur: a blur filter on a large section is a repaint per
 * frame, and at this distance it reads as a rendering glitch rather than depth.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
