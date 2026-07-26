import SplitText from "./fx/SplitText";
import Reveal from "./fx/Reveal";

export const PAD = "clamp(1.25rem, 3vw, 2.5rem)";

/*
 * Every inner page opens the same way: a tiny mono kicker, then the page name
 * set as large as it will go, then a hairline. Keeps the set feeling printed.
 */
export default function PageHeader({ label, title, intro, aside, size = "clamp(3rem, 13vw, 12rem)" }) {
  return (
    <div style={{ padding: `clamp(7rem, 16vh, 11rem) ${PAD} clamp(2.5rem, 5vh, 4rem)` }}>
      <Reveal y={12}>
        <p className="mono" style={{ marginBottom: "clamp(1.5rem, 4vh, 3rem)" }}>{label}</p>
      </Reveal>

      {/* `aside` rides alongside the title, in the space the short words leave */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "clamp(1.5rem, 4vw, 4rem)" }}>
        <SplitText
          text={title}
          tag="h1"
          trigger="load"
          delay={0.1}
          stagger={0.035}
          duration={1.2}
          className="display"
          style={{
            fontSize: size, fontWeight: 700, lineHeight: 0.88,
            letterSpacing: "-0.04em", textTransform: "uppercase", margin: 0,
          }}
        />
        {aside}
      </div>

      {intro && (
        <Reveal delay={0.25}>
          <p
            className="display"
            style={{
              fontSize: "clamp(1.15rem, 2.1vw, 1.9rem)", fontWeight: 600,
              lineHeight: 1.22, letterSpacing: "-0.02em",
              margin: "clamp(2rem, 5vh, 3.5rem) 0 0", maxWidth: "34ch",
            }}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
