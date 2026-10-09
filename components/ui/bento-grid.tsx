import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * MagicUI's bento grid, customised away from its default state
 * (tasteskill 9.E: shadcn/MagicUI components are allowed, never shipped stock).
 *
 * What changed and why:
 *   - The stock BentoCard requires `href` and `cta` and renders a hover
 *     "Learn more" button. Our cells are capabilities, not links, so a fake
 *     link would be a dead affordance.
 *   - The stock card hides its description until hover and slides the title.
 *     On a page whose job is to be read, hiding the content is wrong.
 *   - `auto-rows-[22rem]` is far too tall for text cells, so rows size to
 *     content with a sensible minimum.
 *   - Radii, borders and shadows follow this page's shape lock (12px cards,
 *     hairline borders, no heavy drop shadows).
 */

export function BentoGrid({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  body,
  icon,
  media,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  title: string;
  body: string;
  icon?: ReactNode;
  /** Optional visual. tasteskill 4.7 wants real visual variation in a
   *  multi-cell grid rather than every cell being white on white text. */
  media?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-[12px] border border-hairline bg-surface-raised",
        "transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-ink/18",
        className,
      )}
      {...props}
    >
      {media ? <div className="pointer-events-none absolute inset-0 -z-10">{media}</div> : null}
      <div className="flex h-full flex-col p-6">
        {icon ? <div className="mb-4 text-accent">{icon}</div> : null}
        <h3 className="text-[15px] leading-snug font-semibold tracking-[-0.01em] text-ink">{title}</h3>
        <p className="mt-2 max-w-[42ch] text-[13.5px] leading-[1.6] text-body">{body}</p>
      </div>
    </div>
  );
}
