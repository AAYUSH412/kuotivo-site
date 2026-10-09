import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { Footer } from "@/components/Footer";

/**
 * The shell both legal pages share. Deliberately quiet: no animation, no
 * accent, one column of prose. A terms page that performs is a terms page
 * nobody trusts.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <main className="mx-auto max-w-[1240px] px-4 pt-16 pb-24 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeftIcon size={14} />
          Kuotivo
        </Link>

        <h1 className="mt-10 text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight font-semibold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="numeric mt-3 text-[12.5px] text-muted">Last updated {updated}</p>

        <div className="mt-12 max-w-[68ch] space-y-7 text-[1.0625rem] leading-[1.7] text-body [&_a]:text-accent [&_a:hover]:text-accent-deep [&_h2]:pt-5 [&_h2]:text-[1.2rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:mt-2 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
