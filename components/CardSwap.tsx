"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";

/**
 * A depth stack of cards that cycles front to back.
 *
 * MOTIVATION (tasteskill 5, motion must be motivated). There are thirteen real
 * product screenshots and room on the page for about four. A stack shows eight
 * in the footprint of one, and the cycling does the storytelling: the page
 * claims "this is a whole product, not one screen" and the stack is the
 * evidence. Without it the section is a run of image-and-text rows, which
 * tasteskill 4.7 caps at two in a row anyway.
 *
 * Follows the React Bits CardSwap prop API (cardDistance, verticalDistance,
 * delay, pauseOnHover, skewAmount) rather than vendoring its source, so the
 * styling is ours.
 *
 * ## Why this is written as one derived position, not a mutating queue
 *
 * The first version kept an `order` array and mutated it inside a GSAP
 * timeline callback, with no `gsap.context()`. Two things went wrong:
 *
 *   1. The timeline was untracked, so cleanup could not kill it. React's dev
 *      double-mount then left two effect closures, each holding its own
 *      `order` array, animating the same DOM nodes. They fought until the
 *      stack wedged on whichever card was in front.
 *   2. Recovery was impossible, because the only record of which card sat in
 *      which slot lived in that mutable array.
 *
 * Both are fixed by the same change: a single integer `pos`, from which every
 * card's slot is derived as `(i - pos + total) % total`. Any tick can be
 * recomputed from scratch, so a dropped or duplicated tick cannot corrupt the
 * layout. All GSAP work runs inside `gsap.context()` and is reverted on
 * cleanup, which is what the skill's canonical scroll skeletons do.
 */
export interface CardSwapProps {
  children: ReactNode[];
  /** Horizontal offset between stacked cards, in px. */
  cardDistance?: number;
  /** Vertical offset between stacked cards, in px. */
  verticalDistance?: number;
  /** Milliseconds a card stays in front. */
  delay?: number;
  pauseOnHover?: boolean;
  skewAmount?: number;
  /** Slots drawn behind the front card. Deeper cards are parked invisible. */
  visibleDepth?: number;
  className?: string;
}

export function CardSwap({
  children,
  cardDistance = 40,
  verticalDistance = 34,
  delay = 3200,
  pauseOnHover = true,
  skewAmount = 4,
  visibleDepth = 3,
  className = "",
}: CardSwapProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const total = children.length;

  useEffect(() => {
    const el = root.current;
    if (!el || total < 2) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    // Declared out here so the React cleanup below can detach them.
    // `gsap.context().add()` runs its argument immediately and does NOT
    // register a teardown, so listener removal cannot live inside the context.
    let onEnter: (() => void) | null = null;
    let onLeave: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".swap-card");
      if (cards.length < 2) return;

      /** Resting transform for a card sitting in `slot`, 0 being the front. */
      const vars = (slot: number) => ({
        xPercent: 0,
        x: slot * cardDistance,
        y: -slot * verticalDistance,
        scale: 1 - slot * 0.04,
        skewY: slot === 0 ? 0 : skewAmount,
        opacity: slot > visibleDepth ? 0 : 1,
        // zIndex is set, never tweened: a tweened z-index spends the whole
        // transition on fractional values and the stacking order flickers.
        zIndex: total - slot,
      });

      /** Lay every card out for the given rotation. */
      const render = (pos: number, animate: boolean) => {
        cards.forEach((card, i) => {
          const slot = (i - pos + total) % total;
          const v = vars(slot);
          gsap.set(card, { zIndex: v.zIndex });
          if (animate) {
            gsap.to(card, { ...v, duration: 0.7, ease: "power3.inOut", overwrite: "auto" });
          } else {
            gsap.set(card, v);
          }
        });
      };

      let pos = 0;
      render(pos, false);

      if (reduce) return;

      const advance = () => {
        const leaving = cards[pos % total];
        pos = (pos + 1) % total;
        // The front card drops away first, then everything settles forward.
        gsap.to(leaving, {
          y: "+=90",
          opacity: 0,
          duration: 0.34,
          ease: "power2.in",
          overwrite: "auto",
          onComplete: () => render(pos, true),
        });
      };

      timer = setInterval(advance, delay);

      if (pauseOnHover) {
        onEnter = () => {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
        };
        onLeave = () => {
          if (!timer) timer = setInterval(advance, delay);
        };
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      }
    }, root);

    return () => {
      if (timer) clearInterval(timer);
      if (onEnter) el.removeEventListener("mouseenter", onEnter);
      if (onLeave) el.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, visibleDepth, reduce, total]);

  return (
    <div
      ref={root}
      className={`relative ${className}`}
      style={{ perspective: "1600px" }}
      // The cards repeat what the list beside them already says, so a screen
      // reader gets the content once rather than twice.
      aria-hidden="true"
    >
      {children.map((child, i) => (
        <div
          key={i}
          className="swap-card absolute inset-0 origin-bottom-left will-change-transform"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
