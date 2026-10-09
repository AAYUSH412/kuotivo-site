import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * The primary action. One label for one intent across the whole page
 * (tasteskill 4.5), so this component owns the look and `content.CTA_LABEL`
 * owns the words.
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
