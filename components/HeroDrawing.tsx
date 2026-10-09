/**
 * The shop drawing in the hero, rebuilt as inline SVG.
 *
 * It is a redraw of what the product actually generates: the same window as
 * `public/shots/draw-window.png`: a 2700 x 1200 three-bay slider with a fixed
 * mosquito mesh, its per-bay dimension chain, opening arrows, plan strip and
 * the "VIEW FROM INSIDE" annotation.
 *
 * Inline SVG rather than the screenshot for one reason: the dimension chains
 * can draw themselves in. That animation is the page's single signature
 * moment, and it happens to be literally what the product does.
 *
 * Deliberately a SERVER component. The animation is pure CSS (see
 * `.draft-line` in globals.css), so it starts painting before any JavaScript
 * has loaded: this is the first thing a visitor sees and it must not wait for
 * a bundle. `prefers-reduced-motion` renders the finished drawing instead.
 */

const INK = "var(--color-ink)";
const MIST = "var(--color-muted)";
const INDIGO = "var(--color-accent)";

/** Frame geometry, in SVG units. 380 x 170 carries the real 2700 x 1200 ratio. */
const X0 = 95;
const X1 = 475;
const Y0 = 74;
const Y1 = 244;
const BAY = (X1 - X0) / 3;

/** One pane of glass: the two diagonal strokes a drawing uses to mean "glazed". */
function Glass({ x, w, delay }: { x: number; w: number; delay: number }) {
  return (
    <g className="draft-fade" style={{ "--delay": `${delay}s` } as React.CSSProperties}>
      <line x1={x + 10} y1={Y0 + 34} x2={x + 24} y2={Y0 + 16} stroke={INDIGO} strokeWidth={1} opacity={0.5} />
      <line x1={x + 17} y1={Y0 + 36} x2={x + 31} y2={Y0 + 18} stroke={INDIGO} strokeWidth={1} opacity={0.5} />
      <rect x={x + 4} y={Y0 + 4} width={w - 8} height={Y1 - Y0 - 8} fill={INDIGO} opacity={0.045} />
    </g>
  );
}

/** The left/right pair of arrows that marks a sliding shutter. */
function SlideArrows({ cx, delay }: { cx: number; delay: number }) {
  return (
    <g className="draft-fade" style={{ "--delay": `${delay}s` } as React.CSSProperties} stroke={INDIGO} strokeWidth={1.4} fill="none">
      <path d={`M ${cx - 28} 159 H ${cx - 8} M ${cx - 14} 154 l 6 5 -6 5`} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${cx + 28} 159 H ${cx + 8} M ${cx + 14} 154 l -6 5 6 5`} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** A dimension line with end ticks and a label: the drawing's core idiom. */
function DimH({
  x1, x2, y, label, delay, small,
}: { x1: number; x2: number; y: number; label: string; delay: number; small?: boolean }) {
  const len = x2 - x1;
  return (
    <g>
      <line
        x1={x1} y1={y} x2={x2} y2={y}
        stroke={MIST} strokeWidth={0.9}
        className="draft-line"
        style={{ "--len": len, "--delay": `${delay}s` } as React.CSSProperties}
      />
      <g className="draft-fade" style={{ "--delay": `${delay + 0.45}s` } as React.CSSProperties}>
        <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} stroke={MIST} strokeWidth={0.9} />
        <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} stroke={MIST} strokeWidth={0.9} />
        <rect x={(x1 + x2) / 2 - (small ? 17 : 27)} y={y - 7} width={small ? 34 : 54} height={14} fill="var(--color-surface-raised)" />
        <text
          x={(x1 + x2) / 2} y={y + 4} textAnchor="middle"
          fontSize={small ? 9 : 10} fill={INK} fontFamily="var(--font-mono)"
        >
          {label}
        </text>
      </g>
    </g>
  );
}

export function HeroDrawing() {
  return (
    <svg
      viewBox="0 0 570 400"
      className="h-auto w-full"
      role="img"
      aria-label="A generated shop drawing of a 2700 by 1200 millimetre three-track sliding window with fixed mosquito mesh, showing overall dimensions, a per-bay dimension chain of 900 millimetres each, sliding direction arrows, a plan strip and a VIEW FROM INSIDE annotation."
    >
      {/* Overall width, above the frame. */}
      <DimH x1={X0} x2={X1} y={46} label="2700 mm" delay={0.15} />

      {/* Overall height, down the left side. */}
      <g>
        <line
          x1={64} y1={Y0} x2={64} y2={Y1}
          stroke={MIST} strokeWidth={0.9}
          className="draft-line"
          style={{ "--len": Y1 - Y0, "--delay": "0.3s" } as React.CSSProperties}
        />
        <g className="draft-fade" style={{ "--delay": "0.75s" } as React.CSSProperties}>
          <line x1={60} y1={Y0} x2={68} y2={Y0} stroke={MIST} strokeWidth={0.9} />
          <line x1={60} y1={Y1} x2={68} y2={Y1} stroke={MIST} strokeWidth={0.9} />
          <rect x={57} y={(Y0 + Y1) / 2 - 27} width={14} height={54} fill="var(--color-surface-raised)" />
          <text
            x={64} y={(Y0 + Y1) / 2} fontSize={10} fill={INK} textAnchor="middle"
            fontFamily="var(--font-mono)" transform={`rotate(-90 64 ${(Y0 + Y1) / 2})`}
          >
            1200 mm
          </text>
        </g>
      </g>

      {/* Glass fills and hatches, bay by bay. */}
      {[0, 1, 2].map((i) => (
        <Glass key={i} x={X0 + i * BAY} w={BAY} delay={0.5 + i * 0.1} />
      ))}

      {/* Outer frame, drawn as a single continuous stroke. */}
      <rect
        x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0}
        fill="none" stroke={INK} strokeWidth={2.2}
        className="draft-line"
        style={{ "--len": 2 * (X1 - X0 + Y1 - Y0), "--delay": "0s" } as React.CSSProperties}
      />

      {/* Mullions between the bays. */}
      {[1, 2].map((i) => (
        <line
          key={i}
          x1={X0 + i * BAY} y1={Y0} x2={X0 + i * BAY} y2={Y1}
          stroke={INK} strokeWidth={1.6}
          className="draft-line"
          style={{ "--len": Y1 - Y0, "--delay": `${0.35 + i * 0.08}s` } as React.CSSProperties}
        />
      ))}

      {/* Sliding direction, one pair per bay. */}
      {[0, 1, 2].map((i) => (
        <SlideArrows key={i} cx={X0 + i * BAY + BAY / 2} delay={0.95 + i * 0.08} />
      ))}

      {/* The mesh callout. In the product this is `mesh: 'FIXED'`: a separate
          frame screwed over the panels, drawn as a lattice watermark. */}
      {[0, 1, 2].map((i) => (
        <text
          key={i}
          x={X0 + i * BAY + BAY / 2} y={Y1 - 11}
          textAnchor="middle" fontSize={6.5} letterSpacing="0.1em"
          fill={MIST} fontFamily="var(--font-mono)"
          className="draft-fade"
          style={{ "--delay": `${1.2 + i * 0.06}s` } as React.CSSProperties}
        >
          FIXED MESH
        </text>
      ))}

      {/* Per-bay dimension chain. */}
      {[0, 1, 2].map((i) => (
        <DimH
          key={i} small
          x1={X0 + i * BAY} x2={X0 + (i + 1) * BAY} y={272}
          label="900" delay={1.25 + i * 0.12}
        />
      ))}

      {/* Plan strip: the horizontal section a fabricator reads the track count from. */}
      <g className="draft-fade" style={{ "--delay": "1.75s" } as React.CSSProperties}>
        <rect x={X0} y={306} width={14} height={16} fill={INK} opacity={0.14} stroke={INK} strokeWidth={0.8} />
        <rect x={X1 - 14} y={306} width={14} height={16} fill={INK} opacity={0.14} stroke={INK} strokeWidth={0.8} />
        <line x1={X0 + 14} y1={311} x2={X1 - 14} y2={311} stroke={INK} strokeWidth={1} />
        <line x1={X0 + 14} y1={317} x2={X1 - 14} y2={317} stroke={INK} strokeWidth={1} />
        {[1, 2].map((i) => (
          <rect key={i} x={X0 + i * BAY - 3} y={308} width={6} height={12} fill="var(--color-surface-raised)" stroke={INK} strokeWidth={0.8} />
        ))}
        <text x={X1 + 4} y={310} fontSize={6.5} fill={MIST} fontFamily="var(--font-mono)">IN</text>
        <text x={X1 + 4} y={322} fontSize={6.5} fill={MIST} fontFamily="var(--font-mono)">OUT</text>
      </g>

      <g className="draft-fade" style={{ "--delay": "1.95s" } as React.CSSProperties}>
        <text x={285} y={352} textAnchor="middle" fontSize={9} letterSpacing="0.22em" fill={INK} fontFamily="var(--font-mono)">
          VIEW FROM INSIDE
        </text>
        <text x={285} y={368} textAnchor="middle" fontSize={7.5} fill={MIST}>
          Arrows = sliding shutter · Fixed mosquito mesh over the marked panels
        </text>
      </g>

      <text x={X1} y={40} textAnchor="end" fontSize={6.5} letterSpacing="0.12em" fill={MIST} fontFamily="var(--font-mono)">
        NOT TO SCALE
      </text>
    </svg>
  );
}
