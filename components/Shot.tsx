import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A product screenshot in a minimal browser frame. The frame is not
 * decoration: it tells the reader this is the real software, which is the
 * whole job of these images.
 *
 * It also crops. The source captures are 2000x1250 and carry two browser
 * extension bubbles along the bottom edge. The owner accepted them rather than
 * re-shoot (2026-10-09), so the frame's aspect ratio removes the bottom 8%.
 * No product UI is lost; that strip is empty page in every capture.
 */
export function Shot({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1240px) 92vw, 1120px",
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[16px] border border-hairline bg-surface-raised",
        "shadow-[0_1px_2px_rgb(12_13_16/0.04),0_18px_44px_-24px_rgb(12_13_16/0.22)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-hairline-soft bg-surface-sunken px-3.5 py-2.5">
        <span className="size-[7px] rounded-full bg-hairline" />
        <span className="size-[7px] rounded-full bg-hairline" />
        <span className="size-[7px] rounded-full bg-hairline" />
        <span className="numeric ml-2 truncate text-[10px] text-muted">app.kuotivo.in</span>
      </div>
      <div className="relative aspect-[2000/1150] overflow-hidden">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}
