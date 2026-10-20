"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArmchairIcon, BuildingsIcon, DoorIcon, HammerIcon, LightningIcon,
  PaintRollerIcon, PlusIcon, StackIcon, StairsIcon,
} from "@phosphor-icons/react/dist/ssr";
// The `Icon` component type lives in the library entry, not the ssr barrel.
// `import type` is erased at compile time, so this pulls in no runtime code.
import type { Icon } from "@phosphor-icons/react/lib";
import { trades } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS: Record<string, Icon> = {
  Door: DoorIcon,
  Hammer: HammerIcon,
  Armchair: ArmchairIcon,
  Stairs: StairsIcon,
  Lightning: LightningIcon,
  PaintRoller: PaintRollerIcon,
  Buildings: BuildingsIcon,
  Stack: StackIcon,
  Plus: PlusIcon,
};

/**
 * The nine trades, as a picker rather than a list.
 *
 * A nine item bullet list says "we support these". Making the reader press one
 * and watch a real quotation line appear says "your work fits in here", which
 * is the actual claim. It is also the one place on this page where motion is
 * doing work instead of decorating.
 *
 * ACCESSIBILITY, and the reason this is not nine plain buttons:
 * the grid behaves as a single tab stop with roving focus, which is the
 * expected pattern for a set of mutually exclusive options. Tab enters the
 * grid once and lands on the selected trade; arrows move between the nine;
 * Home and End jump to the ends. Nine separate tab stops before the content
 * below would be a keyboard trap in all but name.
 *
 * `aria-pressed` rather than a radio group: these are toggle buttons that
 * change what is displayed beside them, not a form input that gets submitted.
 */
export function TradePicker() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const total = trades.items.length;
  const current = trades.items[active];
  const Chosen = ICONS[current.icon];

  /** Roving focus. Moving focus also selects, so arrowing through the grid
   *  previews each trade without needing a second keypress. */
  function move(to: number) {
    const next = (to + total) % total;
    setActive(next);
    refs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const keys: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowLeft: i - 1,
      ArrowDown: i + 3,
      ArrowUp: i - 3,
      Home: 0,
      End: total - 1,
    };
    const to = keys[e.key];
    if (to === undefined) return;
    e.preventDefault();
    move(to);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-6">
      <div
        role="group"
        aria-label="Trades a Kuotivo quotation can carry"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
      >
        {trades.items.map((t, i) => {
          const Glyph = ICONS[t.icon];
          const on = i === active;
          return (
            <button
              key={t.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              aria-pressed={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "group relative flex cursor-pointer flex-col items-start gap-3 rounded-[12px] border p-4 text-left",
                "transition-[border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                "focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-sunken focus-visible:outline-none",
                on
                  ? "border-ink/18 bg-surface-raised"
                  : "border-hairline bg-surface-raised/55 hover:-translate-y-px hover:border-hairline hover:bg-surface-raised",
              )}
            >
              <Glyph
                size={20}
                weight="light"
                className={cn(
                  "transition-colors duration-300",
                  on ? "text-accent" : "text-muted group-hover:text-body",
                )}
              />
              <span
                className={cn(
                  "text-[13px] leading-[1.35] font-medium transition-colors duration-300",
                  on ? "text-ink" : "text-body",
                )}
              >
                {t.label}
              </span>

              {/* The selected marker is a rule, not a fill. The accent stays a
                  mark everywhere on this site. */}
              {on ? (
                <motion.span
                  layoutId={reduce ? undefined : "trade-marker"}
                  className="absolute inset-x-4 bottom-0 h-px bg-accent"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* The line that trade produces. Fixed minimum height so swapping
          between a long name and a short one never jumps the page. */}
      <div className="relative min-h-[270px] rounded-[12px] border border-hairline bg-surface-raised p-6 sm:min-h-[248px] md:p-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.key}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2.5">
                <Chosen size={17} weight="light" className="text-accent" />
                <span className="text-[13px] font-medium text-ink">{current.label}</span>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full border px-2.5 py-1 text-[10.5px] font-medium tracking-[0.04em]",
                  current.drawn
                    ? "border-accent/25 bg-accent-wash text-accent-deep"
                    : "border-hairline text-muted",
                )}
              >
                {current.drawn ? trades.drawnNote : trades.plainNote}
              </span>
            </div>

            <p className="mt-5 text-[1.0625rem] leading-[1.35] font-semibold tracking-[-0.015em] text-ink">
              {current.line.name}
            </p>
            <p className="mt-1.5 text-[13px] leading-[1.5] text-body">{current.line.spec}</p>

            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-hairline-soft pt-4">
              <div>
                <dt className="text-[10.5px] tracking-[0.1em] text-muted uppercase">Qty</dt>
                <dd className="numeric mt-1 text-[13px] text-ink">{current.line.qty}</dd>
              </div>
              <div>
                <dt className="text-[10.5px] tracking-[0.1em] text-muted uppercase">Rate</dt>
                <dd className="numeric mt-1 text-[13px] text-ink">{current.line.rate}</dd>
              </div>
              <div className="text-right">
                <dt className="text-[10.5px] tracking-[0.1em] text-muted uppercase">Amount</dt>
                <dd className="numeric mt-1 text-[13px] font-semibold text-ink">
                  {current.line.amount}
                </dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
