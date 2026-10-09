import { ImageResponse } from "next/og";

/**
 * The social preview card, composed in code rather than generated as an
 * image. Image models render text badly and this card is mostly text.
 *
 * It draws the same window the hero draws, in the same ink, so a link shared
 * on WhatsApp carries the product's actual subject rather than a logo on a
 * gradient.
 *
 * Satori (next/og) renders a subset of SVG and does NOT support `<text>`, so
 * every label here is a positioned HTML box. Lines and rectangles are fine.
 */
export const alt = "Kuotivo. Quote a window in minutes, not an evening.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0c0d10";
const MUTED = "#8a9099";
const ACCENT = "#3b49e8";

/** Window geometry, in card pixels. */
const X0 = 690;
const X1 = 1120;
const Y0 = 250;
const Y1 = 436;
const BAY = (X1 - X0) / 3;

/** A dimension label sitting on its own rule, background knocked out. */
function Dim({ left, top, width, text }: { left: number; top: number; width: number; text: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          background: "#ffffff",
          padding: "0 10px",
          fontSize: 18,
          color: INK,
          fontFamily: "monospace",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "60px 64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", width: 26, height: 26, borderRadius: 7, background: ACCENT }} />
          <div style={{ fontSize: 25, fontWeight: 600, color: INK, letterSpacing: "-0.02em" }}>Kuotivo</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 600,
              color: INK,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
            }}
          >
            Quote a window in minutes, not an evening.
          </div>
          <div style={{ marginTop: 24, fontSize: 24, color: "#52585f", lineHeight: 1.45 }}>
            Quoting and GST invoicing for Indian window fabricators.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 20, color: MUTED }}>kuotivo.in</div>

        {/* Rules, frame and arrows. No text: Satori cannot render SVG text. */}
        <svg width={1200} height={630} style={{ position: "absolute", top: 0, left: 0 }}>
          <line x1={X0} y1={200} x2={X1} y2={200} stroke={MUTED} strokeWidth={1.5} />
          <line x1={X0} y1={193} x2={X0} y2={207} stroke={MUTED} strokeWidth={1.5} />
          <line x1={X1} y1={193} x2={X1} y2={207} stroke={MUTED} strokeWidth={1.5} />

          <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="#eef0fe" stroke={INK} strokeWidth={3} />
          <line x1={X0 + BAY} y1={Y0} x2={X0 + BAY} y2={Y1} stroke={INK} strokeWidth={2} />
          <line x1={X0 + 2 * BAY} y1={Y0} x2={X0 + 2 * BAY} y2={Y1} stroke={INK} strokeWidth={2} />

          {[0, 1, 2].map((i) => {
            const cx = X0 + i * BAY + BAY / 2;
            const cy = (Y0 + Y1) / 2;
            return (
              <g key={i} stroke={ACCENT} strokeWidth={2.5} strokeLinecap="round" fill="none">
                <path d={`M ${cx - 30} ${cy} H ${cx - 9} M ${cx - 16} ${cy - 6} l 7 6 -7 6`} />
                <path d={`M ${cx + 30} ${cy} H ${cx + 9} M ${cx + 16} ${cy - 6} l -7 6 7 6`} />
              </g>
            );
          })}

          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={X0 + i * BAY} y1={466} x2={X0 + i * BAY} y2={480}
              stroke={MUTED} strokeWidth={1.5}
            />
          ))}
          <line x1={X0} y1={473} x2={X1} y2={473} stroke={MUTED} strokeWidth={1.5} />
        </svg>

        <Dim left={X0} top={189} width={X1 - X0} text="2700" />
        {[0, 1, 2].map((i) => (
          <Dim key={i} left={X0 + i * BAY} top={462} width={BAY} text="900" />
        ))}
      </div>
    ),
    size,
  );
}
