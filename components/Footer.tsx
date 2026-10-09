import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/brand/logo-mark.png" alt="" width={22} height={22} className="size-[22px]" />
              <span className="text-[15px] font-semibold tracking-[-0.02em]">{site.name}</span>
            </div>
            <p className="mt-3 max-w-[36ch] text-[13.5px] leading-[1.6] text-body">{site.tagline}.</p>
            <a
              href={`mailto:${site.email}`}
              className="numeric mt-4 inline-block text-[13px] text-accent transition-colors hover:text-accent-deep"
            >
              {site.email}
            </a>
          </div>

          <nav className="flex flex-col gap-2.5 text-[13.5px] md:items-end">
            <a href={site.app} className="text-body transition-colors hover:text-ink">
              Sign in
            </a>
            <Link href="/privacy" className="text-body transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="text-body transition-colors hover:text-ink">
              Terms
            </Link>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline-soft pt-6 text-[12.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Built and run by{" "}
            <a
              href={site.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body underline decoration-hairline underline-offset-2 transition-colors hover:text-ink"
            >
              {site.author.name}
            </a>
            .
          </p>
          <p>In production since {site.liveSince}.</p>
        </div>
      </div>
    </footer>
  );
}
