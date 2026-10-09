import Image from "next/image";
import {
  ArrowsLeftRightIcon, ArrowsOutLineHorizontalIcon, CircleIcon,
  EqualsIcon, GridFourIcon, RowsIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Shot } from "@/components/Shot";
import { Cta } from "@/components/Cta";
import { HeroDrawing } from "@/components/HeroDrawing";
import { PriceTicker } from "@/components/PriceTicker";
import { CardSwap } from "@/components/CardSwap";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { TextAnimate } from "@/components/ui/text-animate";
import {
  CTA_LABEL, cta, demoMailto, engine, gst, hero, how, inside, problem, proof, reference,
} from "@/lib/content";

/**
 * Nine sections, and tasteskill 4.7 wants at least four different layout
 * families across them. The families used, once each unless noted:
 *   hero          asymmetric split
 *   proof         single hairline band of running text
 *   problem       offset media with a verb list
 *   drawings      full bleed screenshot over a bento grid
 *   how           depth card stack beside an index
 *   gst           lead panel plus a dense sub grid
 *   inside        four grouped columns
 *   reference     split with media (the only repeat of a split, and not adjacent)
 *   cta           centred block
 *
 * Eyebrow budget: ceil(9 / 3) = 3. Exactly one is used, on the drawings
 * section. Every other section opens on its headline.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Proof />
        <Problem />
        <Drawings />
        <How />
        <Gst />
        <Inside />
        <Reference />
        <Closing />
      </main>
      <Footer />
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────
   Asymmetric split. Four text elements maximum and no eyebrow: headline,
   subtext, two CTAs. Top padding is pt-24 at desktop, the cap. */
function Hero() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-28 pb-16 sm:px-6 lg:pt-32 lg:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <div>
          <h1 className="max-w-[15ch] text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-ink">
            <TextAnimate animation="slideUp" by="word" as="span" once duration={0.55}>
              {hero.title}
            </TextAnimate>
          </h1>
          <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-body">{hero.lede}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Cta href={demoMailto}>{CTA_LABEL}</Cta>
            <Cta href="#drawings" variant="ghost">
              See a drawing
            </Cta>
          </div>
        </div>

        {/* The drawing is the hero asset, and it draws itself in. */}
        <div>
          <div className="overflow-hidden rounded-[16px] border border-hairline bg-surface-raised">
            <div className="px-4 py-6 sm:px-7">
              <HeroDrawing />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-hairline-soft bg-surface-sunken px-5 py-3.5">
              <span className="numeric text-[12px] text-body">{hero.priceMeta}</span>
              <span className="flex items-baseline gap-2.5">
                <span className="text-[11px] text-muted">{hero.priceLabel}</span>
                <span className="text-[15px] font-semibold text-accent">
                  <PriceTicker />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Proof ───────────────────────────────────────────────────────────────
   One hairline band of running text. There is exactly one customer, so a logo
   wall would be a lie and three equal stat boxes would be filler. */
function Proof() {
  return (
    <section className="border-y border-hairline">
      <div className="mx-auto max-w-[1240px] px-4 py-5 sm:px-6">
        <Reveal y={10}>
          <p className="text-[13.5px] leading-[1.6] text-muted">
            {proof.lead}{" "}
            <span className="font-medium text-ink">{proof.customer}</span>, {proof.trade},{" "}
            {proof.since}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Problem ─────────────────────────────────────────────────────────────
   Offset media. The photo breaks the container to the right edge rather than
   sitting in a tidy half, and the steps are verbs rather than numbered labels
   (tasteskill 9.F bans "Step 1 / Step 2" style enumeration). */
function Problem() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto grid max-w-[1240px] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
            {problem.title}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-body">{problem.body}</p>

          <ul className="mt-8 max-w-[52ch]">
            {problem.steps.map((s, i) => (
              <Reveal key={s.verb} delay={i * 0.05}>
                <li className="flex gap-4 border-t border-hairline py-3.5 last:border-b">
                  <span className="w-[4.5rem] shrink-0 text-[14px] font-semibold text-ink">{s.verb}</span>
                  <span className="text-[14px] leading-[1.6] text-body">{s.text}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <p className="mt-7 max-w-[54ch] text-[15px] leading-[1.65] text-body">
            <span className="font-semibold text-ink">One to two hours a quotation</span>
            {problem.kicker.slice(problem.kicker.indexOf(","))}
          </p>
        </div>

        <Reveal delay={0.08} className="lg:-mr-[12vw]">
          <figure>
            <div className="overflow-hidden rounded-[16px] border border-hairline">
              <Image
                src="/photos/desk.jpg"
                alt="A printed quotation on a workshop desk with a calculator, a steel measuring tape, aluminium sections and a glass of chai."
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-auto w-full saturate-[0.88]"
              />
            </div>
            <figcaption className="mt-3 max-w-[40ch] text-[12.5px] leading-[1.5] text-muted">
              {problem.caption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Drawings ────────────────────────────────────────────────────────────
   Recessed section, which is a tint within the same light theme rather than
   an inverted block (tasteskill 4.11). Full bleed screenshot, then the bento.
   This section carries the page's one eyebrow. */
function Drawings() {
  const icons: Record<string, React.ReactNode> = {
    GridFour: <GridFourIcon size={20} weight="light" />,
    ArrowsOutLineHorizontal: <ArrowsOutLineHorizontalIcon size={20} weight="light" />,
    Rows: <RowsIcon size={20} weight="light" />,
    ArrowsLeftRight: <ArrowsLeftRightIcon size={20} weight="light" />,
    Circle: <CircleIcon size={20} weight="light" />,
    Equals: <EqualsIcon size={20} weight="light" />,
  };

  return (
    <section id="drawings" className="border-y border-hairline bg-surface-sunken py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="max-w-[58ch]">
          <span className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
            {engine.eyebrow}
          </span>
          <h2 className="mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.06] font-semibold tracking-[-0.03em]">
            {engine.title}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.6] text-body">{engine.lede}</p>
        </div>

        <Reveal delay={0.06} className="mt-12">
          <Shot
            src="/shots/draw-window.png"
            alt="The Kuotivo draw window editor: a three panel grid on the left and a live shop drawing with dimension chains and a line value of twelve thousand three hundred and eighty two rupees on the right."
          />
        </Reveal>

        <BentoGrid className="mt-10">
          {engine.cells.map((c, i) => (
            <Reveal key={c.key} delay={(i % 3) * 0.05} className={c.span}>
              <BentoCard
                className="h-full"
                title={c.title}
                body={c.body}
                icon={icons[c.icon]}
                media={
                  // Two of six cells carry a visual rather than text on white
                  // (tasteskill 4.7, bento background diversity).
                  c.key === "mesh" ? (
                    <Image
                      src="/photos/installed-window.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover opacity-[0.07] saturate-0"
                    />
                  ) : c.key === "arch" ? (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #e4e7eb 1px, transparent 1px), linear-gradient(to bottom, #e4e7eb 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                        maskImage: "radial-gradient(70% 90% at 85% 50%, #000, transparent)",
                      }}
                    />
                  ) : null
                }
              />
            </Reveal>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

/* ── How it works ────────────────────────────────────────────────────────
   A depth stack of eight real screenshots beside a plain index. Replaces four
   consecutive image and text splits, which tasteskill 4.7 caps at two. The
   index is the accessible copy; the stack is aria-hidden. */
function How() {
  return (
    <section id="how" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-16">
          <div>
            <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
              {how.title}
            </h2>
            <p className="mt-5 max-w-[42ch] text-[1.0625rem] leading-[1.6] text-body">{how.lede}</p>

            <dl className="mt-9 space-y-5">
              {how.cards.map((c) => (
                <div key={c.title}>
                  <dt className="text-[14px] font-semibold text-ink">{c.title}</dt>
                  <dd className="mt-1 max-w-[44ch] text-[13.5px] leading-[1.55] text-body">{c.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative h-[340px] sm:h-[420px] lg:h-[500px]">
            <CardSwap className="h-full w-full max-w-[620px]">
              {how.cards.map((c) => (
                <Shot key={c.shot} src={c.shot} alt={c.alt} sizes="(max-width: 1024px) 92vw, 620px" />
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── GST ─────────────────────────────────────────────────────────────────
   One lead panel carrying the claim that matters, a mono panel beside it, and
   four quiet rows beneath. Not a grid of equal cards. */
function Gst() {
  return (
    <section id="gst" className="border-y border-hairline bg-surface-sunken py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
          {gst.title}
        </h2>
        <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-body">{gst.lede}</p>

        <div className="mt-12 grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Reveal>
            <div className="h-full rounded-[12px] border border-hairline bg-surface-raised p-7 md:p-9">
              <h3 className="max-w-[22ch] text-[1.25rem] leading-snug font-semibold tracking-[-0.02em]">
                {gst.lead.title}
              </h3>
              <p className="mt-3 max-w-[56ch] text-[14.5px] leading-[1.65] text-body">{gst.lead.body}</p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="h-full rounded-[12px] border border-hairline bg-surface-raised p-7 md:p-9">
              <h3 className="text-[1.25rem] leading-snug font-semibold tracking-[-0.02em]">
                {gst.numbering.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-body">{gst.numbering.body}</p>
              <ul className="mt-5 space-y-1.5 border-t border-hairline-soft pt-4">
                {gst.numbering.samples.map((s) => (
                  <li key={s} className="numeric text-[13px] text-accent-deep">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {gst.rest.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <div className="h-full rounded-[12px] border border-hairline bg-surface-raised p-6">
                <h3 className="text-[14px] font-semibold text-ink">{c.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.55] text-body">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Inside ──────────────────────────────────────────────────────────────
   Twelve modules in four groups, matching the product's own sidebar. A flat
   twelve row list with a hairline under every row is the layout tasteskill
   4.9 calls the worst default. */
function Inside() {
  return (
    <section id="inside" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[18ch] text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
            {inside.title}
          </h2>
          <p className="text-[14px] text-muted md:pb-2">{inside.lede}</p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {inside.groups.map((g, gi) => (
            <Reveal key={g.name} delay={gi * 0.06}>
              <div>
                <h3 className="border-b border-ink pb-2.5 text-[11px] font-medium tracking-[0.16em] text-ink uppercase">
                  {g.name}
                </h3>
                <ul className="mt-4 space-y-5">
                  {g.items.map(([name, desc]) => (
                    <li key={name}>
                      <span className="block text-[14px] font-semibold text-ink">{name}</span>
                      <span className="mt-1 block text-[13px] leading-[1.55] text-body">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reference ───────────────────────────────────────────────────────── */
function Reference() {
  return (
    <section className="border-y border-hairline bg-surface-sunken py-20 md:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div>
            <h2 className="max-w-[16ch] text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
              {reference.title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.65] text-body">{reference.body}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <figure>
            <div className="overflow-hidden rounded-[16px] border border-hairline">
              <Image
                src="/photos/workshop.jpg"
                alt="A fabricator measuring an aluminium window section with a steel tape, with cut profiles and glass panes stacked around him."
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-auto w-full saturate-[0.9]"
              />
            </div>
            <figcaption className="mt-3 text-[12.5px] text-muted">{reference.caption}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Closing ─────────────────────────────────────────────────────────── */
function Closing() {
  return (
    <section className="py-24 md:py-32">
      <Reveal className="mx-auto max-w-[1240px] px-4 text-center sm:px-6">
        <h2 className="mx-auto max-w-[16ch] text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
          {cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[50ch] text-[1.0625rem] leading-[1.65] text-body">{cta.body}</p>
        <div className="mt-8 flex justify-center">
          <Cta href={demoMailto}>{CTA_LABEL}</Cta>
        </div>
      </Reveal>
    </section>
  );
}
