import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * An action. This component owns the look; `lib/content.ts` owns the words and
 * the destination, paired together in `primaryCta` and `demoCta` so a label can
 * never drift from where it points.
 *
 * One primary per view (tasteskill 4.5). Since signup shipped there are two
 * actions on the page, so the demo is always `variant="ghost"` where it appears
 * beside "Get started" and the solid treatment stays reserved for the one
 * action a reader is meant to take.
 *
 * The arrow sits in its own circular well flush with the right padding and
 * shifts diagonally on hover, so the control has internal tension instead of
 * just swapping a background colour. Icons come from Phosphor; nothing on this
 * page hand-rolls an SVG icon path (tasteskill 3.C).
 */
export function Cta({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const solid = variant === "solid";
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full text-[14.5px] font-medium",
        "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-px active:scale-[0.98]",
        solid
          ? "bg-ink py-1.5 pr-1.5 pl-5 text-white"
          : "border border-hairline px-5 py-3 text-ink hover:border-ink/25",
        className,
      )}
    >
      <span className="whitespace-nowrap">{children}</span>
      {solid ? (
        <span className="flex size-8 items-center justify-center rounded-full bg-white/14 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
          <ArrowUpRightIcon size={14} weight="bold" />
        </span>
      ) : null}
    </Link>
  );
}
