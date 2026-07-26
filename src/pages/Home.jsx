import { Link } from "react-router-dom";
import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../components/fx/SplitText";
import Magnet from "../components/fx/Magnet";
import Marquee from "../components/fx/Marquee";
import HorizontalScroll from "../components/fx/HorizontalScroll";
import Doodle from "../components/fx/Doodle";
import Reveal from "../components/fx/Reveal";
import useMedia from "../hooks/useMedia";
import { COLORS } from "../theme";

gsap.registerPlugin(ScrollTrigger);

const GITHUB = "https://github.com/virginiaceccatelli";
const LINKEDIN = "https://www.linkedin.com/in/virginia-ceccatelli/";
const SCHOLAR = "https://scholar.google.com/citations?user=kk8BWhAAAAAJ&hl=en";
const EMAIL = "virginia.ceccatelli@mail.mcgill.ca";

const PAD = "clamp(1.25rem, 3vw, 2.5rem)";

const focusAreas = [
  { num: "01", area: "AI Safety & Security", sub: "Multilingual speech-safety evaluation, jailbreak benchmarks, agentic red-teaming and hardening" },
  { num: "02", area: "Interpretability & Alignment", sub: "Trajectory-based uncertainty probes, tracing data flow and security taint in code models, activation patching" },
  { num: "03", area: "Cybersecurity Policy", sub: "U.S.–Africa partnerships, Digital Silk Road dynamics, global north-south collaboration" },
];

const destinations = [
  { label: "About Me",   path: "/about",      sub: "Background & profile" },
  { label: "Experience", path: "/experience", sub: "Work & education" },
  { label: "Works",      path: "/projects",   sub: "Selected projects" },
  { label: "Writing",    path: "/writing",    sub: "Papers & articles" },
];

const facts = [
  { label: "Currently at", value: "UCL S2Lab · WIIT Premium Cloud" },
  { label: "Based in", value: "London, UK" },
  { label: "Education", value: "McGill University: CS + Economics, 3.8 GPA" },
  { label: "Prev. research", value: "Mila — Québec AI Institute" },
];

const contacts = [
  { label: "LinkedIn", href: LINKEDIN },
  { label: "GitHub", href: GITHUB },
  { label: "Scholar", href: SCHOLAR },
  { label: "Email", href: `mailto:${EMAIL}` },
];

export default function Home() {
  const heroRef = useRef(null);
  const heroInnerRef = useRef(null);
  const wide = useMedia("(min-width: 860px)");

  // Hero drifts up and fades as it scrolls away — scrubbed by Lenis via ScrollTrigger
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(heroInnerRef.current, {
        yPercent: -12,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "bottom bottom", end: "bottom 25%", scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh", position: "relative", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: `9rem ${PAD} clamp(3rem, 6vh, 5rem)`,
        }}
      >
        {/* Her own drawing, huge, bleeding off the right edge */}
        <Doodle
          art="stars"
          width={wide ? "48vw" : "108vw"}
          opacity={wide ? 1 : 0.16}
          parallax={6}
          reveal={false}
          style={{
            position: "absolute",
            top: wide ? "4vh" : "6vh",
            right: wide ? "-5vw" : "-28vw",
            zIndex: 0,
          }}
        />        

        <div ref={heroInnerRef} style={{ position: "relative", zIndex: 1, maxWidth: "min(1500px, 100%)" }}>
          <SplitText
            text={wide ? "VIRGINIA\nCECCATELLI" : "VIRGINIA\nCECCATELLI"}
            tag="h1"
            trigger="load"
            delay={0.15}
            stagger={0.018}
            duration={1.25}
            className="display"
            style={{
              fontSize: wide ? "clamp(3rem, 7.2vw, 8.5rem)" : "clamp(2.4rem, 13vw, 4rem)",
              fontWeight: 700, lineHeight: 0.92, textTransform: "uppercase",
              letterSpacing: "-0.035em", margin: 0, maxWidth: "18ch",
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.05 }}
            style={{ marginTop: "clamp(2rem, 5vh, 3.5rem)", display: "flex", flexWrap: "wrap", gap: "1.25rem 2.5rem", alignItems: "center" }}
          >
            <Link to="/about" className="u-link" style={{ fontSize: "0.7rem" }}>About Me</Link>
            <Link to="/projects" className="u-link" style={{ fontSize: "0.7rem" }}>Works</Link>
            <Link to="/writing" className="u-link" style={{ fontSize: "0.7rem" }}>Writing</Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            className="mono"
            style={{ margin: "2.5rem 0 0", maxWidth: "50ch", lineHeight: 2, fontSize: "0.62rem" }}
          >
            AI Safety · AI Security · Cybersecurity Policy<br />
            McGill CS · UCL S2Lab · Mila
          </motion.p>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mono"
          style={{ position: "absolute", bottom: "3rem", right: PAD, writingMode: "vertical-lr", fontSize: "0.6rem", zIndex: 1 }}
        >
          Scroll ↓
        </motion.span>
      </section>

      {/* ─────────────────── MAROON MARQUEE BAND ─────────────────── */}
      <div className="theme-maroon" style={{ background: "var(--paper)", padding: "clamp(1.25rem, 2.5vw, 2rem) 0", overflow: "hidden" }}>
        <Marquee
          text="Safety & Security · Alignment · Governance · Cybersecurity Policy"
          baseSpeed={0.7}
          style={{
            fontFamily: "'Archivo', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.6rem, 4vw, 3.4rem)", letterSpacing: "-0.02em",
            textTransform: "uppercase", color: "var(--ink)",
          }}
        />
      </div>

      {/* ───────────────────────── PROFILE ───────────────────────── */}
      <section style={{ padding: `clamp(5rem, 11vh, 9rem) ${PAD}` }}>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "1.35fr 1fr" : "1fr", gap: wide ? "clamp(3rem, 6vw, 7rem)" : "3.5rem", alignItems: "start" }}>
          <div>
            <Reveal>
              <p className="mono" style={{ marginBottom: "2rem" }}>01 — Profile</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p
                className="display"
                style={{
                  fontSize: "clamp(1.35rem, 2.55vw, 2.35rem)", fontWeight: 600,
                  lineHeight: 1.16, letterSpacing: "-0.022em", margin: "0 0 2.5rem 0",
                  maxWidth: "30ch",
                }}
              >
                Computer scientist working at the intersection of AI safety, AI security, and cybersecurity policy research.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="body-text" style={{ maxWidth: "56ch", color: "var(--muted)", margin: "0 0 2.5rem 0" }}>
                With a focus on the safety of language models, interpretability of code models, and the governance of
                emerging cyber threats.
              </p>
              <Link to="/about" className="u-link" style={{ fontSize: "0.68rem" }}>Full profile →</Link>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div>
              {facts.map(item => (
                <div key={item.label} style={{ borderTop: "1px solid var(--rule)", padding: "1.25rem 0", display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem" }}>
                  <p className="mono" style={{ margin: 0, fontSize: "0.6rem" }}>{item.label}</p>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.45, margin: 0, color: "var(--ink)" }}>{item.value}</p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--rule)", padding: "1.25rem 0" }}>
                <p className="mono" style={{ margin: "0 0 0.5rem", fontSize: "0.6rem" }}>Contact</p>
                <a href={`mailto:${EMAIL}`} className="u-link" style={{ fontSize: "0.62rem", wordBreak: "break-word" }}>{EMAIL}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── AREAS OF FOCUS — pinned horizontal, on red paper ───────── */}
      <HorizontalScroll className="theme-maroon" style={{ background: "var(--paper)" }}>
        <IntroPanel />
        {focusAreas.map((area, i) => (
          <FocusPanel key={area.num} area={area} index={i} total={focusAreas.length} />
        ))}
      </HorizontalScroll>

      {/* ───────────────────────── INDEX ───────────────────────── */}
      <section style={{ padding: `clamp(5rem, 10vh, 8rem) 0 clamp(3rem, 6vh, 5rem)` }}>
        <Reveal>
          <p className="mono" style={{ padding: `0 ${PAD}`, marginBottom: "3rem" }}>02 — Index</p>
        </Reveal>
        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {destinations.map((dest, i) => (
            <IndexRow key={dest.path} dest={dest} index={i} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* 
          Drawings sit in their own grid columns rather than being absolutely
          positioned, so neither one can ever be cropped by the page edge. */}
      <section style={{ position: "relative", padding: `clamp(3rem, 7vh, 5.5rem) ${PAD} clamp(4rem, 8vh, 6rem)` }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: wide ? "minmax(0,1fr) minmax(auto, 620px) minmax(0,1fr)" : "1fr",
            alignItems: "center",
            gap: wide ? "clamp(1rem, 3vw, 3rem)" : "3rem",
            maxWidth: "1500px", margin: "0 auto",
          }}
        >
          {wide && (
            <Doodle
              art="flowers"
              width="min(30vw, 400px)"
              flip
              parallax={7}
              style={{ justifySelf: "center" }}
            />
          )}

          <div style={{ textAlign: "center" }}>
            <Reveal>
              <p className="mono" style={{ marginBottom: "2rem" }}>03 — Contacts</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p
                className="display"
                style={{
                  fontSize: "clamp(2.2rem, 6.5vw, 4.6rem)", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "-0.035em",
                  margin: "0 0 2.5rem 0", lineHeight: 1,
                }}
              >
                Get in touch.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2.5rem", justifyContent: "center" }}>
                {contacts.map(c => (
                  <Magnet key={c.label} strength={0.25}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="u-link"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {c.label}
                    </a>
                  </Magnet>
                ))}
              </div>
            </Reveal>
          </div>

          <Doodle
            art="bouquet"
            width={wide ? "min(19vw, 250px)" : "min(52vw, 240px)"}
            rotate={wide ? 6 : 0}
            parallax={11}
            style={{ justifySelf: "center" }}
          />
        </div>
      </section>
    </div>
  );
}

/* ── Index rows: the whole row floods with red on hover ── */
const EASE = "cubic-bezier(0.16,1,0.3,1)";

function IndexRow({ dest, index, delay }) {
  const [hovered, setHovered] = useState(false);
  const wide = useMedia("(min-width: 860px)");

  // Explicit colours rather than a theme swap: background and type have to
  // cross-fade together, so both ends of the fade must stay resolvable.
  const fg = hovered ? COLORS.cream : COLORS.ink;
  const dim = hovered ? "rgba(244,239,230,0.66)" : "rgba(25,21,18,0.56)";
  const swap = `color 0.5s ${EASE}`;

  return (
    <Reveal delay={delay} y={16}>
      <Link
        to={dest.path}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1.5rem", textDecoration: "none",
          padding: `clamp(1.5rem, 3.5vh, 2.6rem) ${PAD}`,
          borderBottom: "1px solid var(--rule)",
          background: hovered ? COLORS.maroon : "transparent",
          transition: `background-color 0.5s ${EASE}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: wide ? "clamp(1.5rem, 4vw, 4rem)" : "1rem", minWidth: 0 }}>
          <span className="mono" style={{ flexShrink: 0, fontSize: "0.62rem", paddingTop: "0.5rem", color: dim, transition: swap }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="display"
            style={{
              fontSize: "clamp(1.9rem, 5.5vw, 4.2rem)", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0,
              color: fg,
              transform: hovered ? "translateX(0.6rem)" : "none",
              transition: `transform 0.5s ${EASE}, ${swap}`,
            }}
          >
            {dest.label}
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 3rem)", flexShrink: 0 }}>
          {wide && <span className="mono" style={{ fontSize: "0.62rem", color: dim, transition: swap }}>{dest.sub}</span>}
          <span
            className="display"
            style={{
              fontSize: "1.4rem", color: fg,
              transform: hovered ? "translateX(0.5rem)" : "none",
              transition: `transform 0.5s ${EASE}, ${swap}`,
            }}
          >
            →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ── Panels for the pinned horizontal run ── */
const PANEL_STYLE = {
  flexShrink: 0,
  // 100% of the flex container (the viewport-wide section) rather than 100vw,
  // so a visible scrollbar can't push the panels into horizontal overflow
  width: "100%",
  minWidth: "100%",
  minHeight: "78vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "clamp(3rem, 8vh, 7rem) clamp(1.5rem, 7vw, 8rem)",
  borderRight: "1px solid var(--rule)",
  boxSizing: "border-box",
};

const PANEL_INNER = { width: "100%", maxWidth: "1100px", margin: "0 auto" };

function IntroPanel() {
  return (
    <div style={{ ...PANEL_STYLE, justifyContent: "center" }}>
      <div style={PANEL_INNER}>
        <p className="mono" style={{ marginBottom: "2rem" }}>Areas of Focus</p>
        <p
          className="display"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 5rem)", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "-0.035em",
            lineHeight: 0.95, margin: "0 0 2.5rem 0", maxWidth: "16ch",
          }}
        >
          Three research directions.
        </p>
        <p className="mono" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ display: "inline-block", width: "42px", height: "1px", background: "currentColor" }} />
          Scroll to move across
        </p>
      </div>
    </div>
  );
}

function FocusPanel({ area, index, total }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={PANEL_STYLE}>
      <div style={{ ...PANEL_INNER, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span
          className="display"
          style={{
            fontSize: "clamp(4rem, 13vw, 12rem)", fontWeight: 800, lineHeight: 0.78,
            letterSpacing: "-0.05em",
            color: "var(--ink)",
            opacity: hovered ? 0.38 : 0.18,
            transition: "opacity 0.6s ease",
          }}
        >
          {area.num}
        </span>
        <span className="mono" style={{ paddingTop: "0.75rem" }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div style={PANEL_INNER}>
        <h3
          className="display"
          style={{
            fontSize: "clamp(2.1rem, 6vw, 5.2rem)", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "-0.035em",
            lineHeight: 0.98, margin: "0 0 1.75rem 0", maxWidth: "17ch",
            transform: hovered ? "translateX(0.75rem)" : "none",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {area.area}
        </h3>
        <p className="body-text" style={{ color: "var(--muted)", margin: 0, maxWidth: "48ch" }}>
          {area.sub}
        </p>
      </div>
    </div>
  );
}
