"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Cta } from "@/components/Cta";
import { CTA_LABEL, demoMailto, nav, site } from "@/lib/content";

/**
 * A plain sticky bar, not a floating pill.
 *
 * The previous version was a detached pill with a shadow, which read as a
 * stuck artifact once it overlapped mid-page content rather than as a
 * deliberate floating nav. A full-width bar that gains a hairline and a
 * backdrop on scroll is quieter and never looks broken over content.
 *
 * Height is 64px, inside the 80px cap (tasteskill 4.7). `useScroll` rather
 * than a scroll listener (tasteskill 5.D bans the listener outright).
 * `backdrop-blur` appears here and nowhere else: cheap on a fixed element,
 * expensive on anything that scrolls.
 */
export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setStuck(v > 16));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          stuck ? "border-b border-hairline bg-page/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-8 px-4 sm:px-6">
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <Image src="/brand/logo-mark.png" alt="" width={24} height={24} className="size-6" priority />
            <span className="text-[15px] font-semibold tracking-[-0.02em]">{site.name}</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13.5px] text-body transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden md:block">
            <Cta href={demoMailto}>{CTA_LABEL}</Cta>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="ml-auto flex size-9 items-center justify-center rounded-full text-ink md:hidden"
          >
            {open ? <XIcon size={20} /> : <ListIcon size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-page md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-1 px-6 pt-8">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-hairline-soft py-4 text-2xl font-semibold tracking-[-0.02em]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <Cta href={demoMailto}>{CTA_LABEL}</Cta>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
