"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr";
import { watch } from "@/lib/content";

/**
 * The demo video, as a facade.
 *
 * 🔴 The whole point of this component is what it does NOT do on load. A plain
 * `<iframe src="youtube.com/embed/...">` fetches roughly half a megabyte of
 * Google script on every visit, sets cookies before anyone has asked to watch
 * anything, and is the single heaviest thing that could go on this page. So
 * until the visitor presses play there is no iframe at all: just a poster and
 * a button. First paint stays a product screenshot the page already ships.
 *
 * That is also what makes the privacy page's claim survivable. `/privacy` says
 * this site sets no cookies and runs no tracking, and with the facade that
 * stays literally true for every visitor who does not press play. The page
 * states the exception in one line rather than quietly breaking the promise.
 *
 * On click: `youtube-nocookie.com` (Google's own reduced-tracking host),
 * `autoplay=1` because the click WAS the consent, `rel=0` so the end screen
 * does not advertise competitors, and `modestbranding=1`.
 *
 * The poster is a product screenshot, not YouTube's thumbnail. YouTube's
 * thumbnail is a frame of this very homepage, so it would show the hero that
 * sits a few hundred pixels above it.
 */
export function VideoEmbed() {
  const [playing, setPlaying] = useState(false);

  const src =
    `https://www.youtube-nocookie.com/embed/${watch.videoId}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <figure className="overflow-hidden rounded-[16px] border border-hairline bg-surface-raised shadow-[0_1px_2px_rgb(12_13_16/0.04),0_24px_60px_-32px_rgb(12_13_16/0.28)]">
      <div className="relative aspect-video bg-surface-sunken">
        {playing ? (
          <iframe
            src={src}
            title="Kuotivo product demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={watch.playLabel}
            className="group absolute inset-0 size-full cursor-pointer"
          >
            <Image
              src={watch.poster}
              alt={watch.posterAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 980px"
              className="object-cover object-top"
            />

            {/* A scrim only where the control sits, so the screenshot stays
                readable. A full overlay would dim the thing being advertised. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(42%_52%_at_50%_50%,rgb(12_13_16/0.34),transparent_72%)] transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-80"
            />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-3 rounded-full bg-page/95 py-2 pr-5 pl-2 shadow-[0_2px_8px_rgb(12_13_16/0.12),0_12px_32px_-12px_rgb(12_13_16/0.3)] backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03] group-active:scale-[0.99]">
                <span className="flex size-9 items-center justify-center rounded-full bg-ink text-white">
                  <PlayIcon size={15} weight="fill" className="translate-x-px" />
                </span>
                <span className="text-[14px] font-medium text-ink">Play</span>
                <span className="numeric text-[12.5px] text-muted">{watch.duration}</span>
              </span>
            </span>
          </button>
        )}

        {/* Without JavaScript the button above does nothing, so give that
            reader a real link rather than a dead poster. */}
        <noscript>
          <a
            href={`https://www.youtube.com/watch?v=${watch.videoId}`}
            className="absolute inset-x-0 bottom-0 block bg-ink/85 px-4 py-3 text-center text-[14px] font-medium text-white"
          >
            {watch.fallback}
          </a>
        </noscript>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 border-t border-hairline-soft bg-surface-sunken px-5 py-3">
        <span className="text-[12.5px] text-muted">{watch.note}</span>
        <a
          href={`https://www.youtube.com/watch?v=${watch.videoId}`}
          target="_blank"
          rel="noreferrer"
          className="text-[12.5px] text-body underline decoration-hairline underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-ink/40"
        >
          {watch.fallback}
        </a>
      </figcaption>
    </figure>
  );
}
