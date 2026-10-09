"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * The line value beside the hero drawing, counting up to the real figure from
 * the product: ₹12,382.40 for 34.88 sq.ft at ₹355/sq.ft.
 *
 * The count is the second half of the hero's signature moment: the drawing
 * draws itself, then the price lands. It is doing the thing the page is
 * claiming: the window prices itself as you draw it.
 */
const TARGET = 12382.4;

const inr = (n: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function PriceTicker() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? TARGET : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, TARGET, {
      duration: 1.4,
      delay: 1.5, // lands just after the dimension chains finish drawing
      ease: [0.32, 0.72, 0, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduced]);

  return (
    <span ref={ref} className="numeric tabular-nums">
      ₹{inr(value)}
    </span>
  );
}
