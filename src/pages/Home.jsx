import { Link } from "react-router-dom";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../components/fx/SplitText";
import Magnet from "../components/fx/Magnet";
import HorizontalScroll from "../components/fx/HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

const GITHUB = "https://github.com/virginiaceccatelli";
const EMAIL = "virginia.ceccatelli@mail.mcgill.ca";

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function ExploreTile({ dest, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <Link
        to={dest.path}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "2.5rem 2rem", minHeight: "220px",
          textDecoration: "none",
          background: hovered ? "#1a1a1a" : "transparent",
          transition: "background 0.45s cubic-bezier(0.16,1,0.3,1)",
          borderRight: "1px solid rgba(26,26,26,0.1)", cursor: "pointer",
        }}
      >
        <p style={{ fontFamily: "'Faustina', serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: hovered ? "rgba(244,241,234,0.55)" : "#7c7068", margin: 0, transition: "color 0.45s" }}>
          {dest.sub}
        </p>
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 300, lineHeight: 1, color: hovered ? "#f4f1ea" : "#1a1a1a", margin: "0 0 1.25rem 0", transition: "color 0.45s" }}>
            {dest.label}
          </h3>
          <span style={{ fontFamily: "'Faustina', serif", fontSize: "0.9rem", color: hovered ? "rgba(244,241,234,0.6)" : "#7c7068", transition: "color 0.45s" }}>→</span>
        </div>
      </Link>
    </Reveal>
  );
}

const focusAreas = [
  { num: "01", area: "AI Safety & Security", sub: "Multilingual speech-safety evaluation, jailbreak benchmarks, agentic red-teaming and hardening" },
  { num: "02", area: "Interpretability", sub: "Trajectory-based uncertainty probes, tracing data flow and security taint in code models, activation patching" },
  { num: "03", area: "Cybersecurity Policy", sub: "U.S.–Africa partnerships, Digital Silk Road dynamics, global north-south collaboration" },
];

const destinations = [
  { label: "About", path: "/about", sub: "Background & profile" },
  { label: "Experience", path: "/experience", sub: "Work & education" },
  { label: "Projects", path: "/projects", sub: "Selected work" },
  { label: "Writing", path: "/writing", sub: "Papers & articles" },
];

export default function Home() {
  const heroRef = useRef(null);
  const heroInnerRef = useRef(null);

  // Hero drifts up and fades as it scrolls away — scrubbed by Lenis via ScrollTrigger
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(heroInnerRef.current, {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom bottom",
          end: "bottom 25%",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "transparent" }}>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 2rem 3rem", maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
        <div ref={heroInnerRef}>
          <SplitText
            text={"Virginia Ceccatelli"}
            tag="h1"
            trigger="load"
            delay={0.15}
            stagger={0.04}
            duration={1.3}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.015em", color: "#1a1a1a", margin: 0 }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "1.5rem 3rem", alignItems: "center" }}
          >
            <span className="kicker">AI Safety · AI Security · Cybersecurity Policy</span>
            <span className="kicker" style={{ color: "rgba(124,112,104,0.5)" }}>McGill CS · UCL S2Lab · Mila</span>
          </motion.div>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="kicker"
          style={{ position: "absolute", bottom: "3rem", right: "2rem", writingMode: "vertical-lr", color: "rgba(26,26,26,0.28)" }}
        >
          scroll
        </motion.span>
      </section>

      <div style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }} />

      {/* INTRO */}
      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "7rem 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
        <Reveal>
          <p className="kicker" style={{ marginBottom: "1.5rem" }}>Profile</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 300, lineHeight: 1.3, color: "#1a1a1a", margin: "0 0 2rem 0", maxWidth: "560px" }}>
            Computer scientist working at the intersection of AI safety, AI security, and cybersecurity policy — with a focus on the safety of multilingual and multimodal language models, interpretability of code models, and the governance of emerging cyber threats.
          </p>
          <Link to="/about" className="kicker link-underline" style={{ color: "#1a1a1a", textDecoration: "none" }}>
            Full profile →
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { label: "Currently at", value: "UCL S2Lab · WIIT Premium Cloud" },
              { label: "Based in", value: "London, UK" },
              { label: "Education", value: "McGill University — CS + Economics, 3.8 GPA" },
              { label: "Prev. research", value: "Mila Québec AI Institute" },
              { label: "Contact", value: EMAIL, href: `mailto:${EMAIL}` },
            ].map(item => (
              <div key={item.label} style={{ borderTop: "1px solid rgba(26,26,26,0.1)", padding: "1.5rem 0" }}>
                <p className="kicker" style={{ margin: "0 0 0.4rem 0" }}>{item.label}</p>
                {item.href
                  ? <a href={item.href} style={{ fontFamily: "'Faustina', serif", fontSize: "0.95rem", color: "#1a1a1a", textDecoration: "none" }} className="link-underline">{item.value}</a>
                  : <p style={{ fontFamily: "'Faustina', serif", fontSize: "0.95rem", color: "#1a1a1a", margin: 0 }}>{item.value}</p>
                }
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div style={{ height: "1px", background: "rgba(26,26,26,0.1)", maxWidth: "1440px", margin: "0 auto" }} />

      {/* FOCUS AREAS — horizontal pinned journey */}
      <HorizontalScroll style={{ borderTop: "1px solid rgba(26,26,26,0.1)", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
        <IntroPanel />
        {focusAreas.map((area, i) => (
          <FocusPanel key={area.num} area={area} index={i} total={focusAreas.length} />
        ))}
      </HorizontalScroll>

      {/* EXPLORE TILES */}
      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "7rem 2rem" }}>
        <Reveal><p className="kicker" style={{ marginBottom: "3rem" }}>Explore</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", border: "1px solid rgba(26,26,26,0.1)" }}>
          {destinations.map((dest, i) => <ExploreTile key={dest.path} dest={dest} delay={i * 0.06} />)}
        </div>
      </section>

      {/* CONNECT */}
      <section style={{ borderTop: "1px solid rgba(26,26,26,0.1)", maxWidth: "1440px", margin: "0 auto", padding: "5rem 2rem", display: "flex", flexWrap: "wrap", gap: "2rem 4rem", alignItems: "center", justifyContent: "space-between" }}>
        <Reveal>
          <SplitText
            text="Get in touch."
            tag="p"
            trigger="scroll"
            stagger={0.03}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, margin: 0, lineHeight: 1 }}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Magnet>
            <a href={`mailto:${EMAIL}`} className="kicker link-underline" style={{ color: "#1a1a1a", textDecoration: "none" }}>{EMAIL}</a>
          </Magnet>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[
              { label: "GitHub", href: GITHUB },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/virginia-ceccatelli/" },
              { label: "Scholar", href: "https://scholar.google.com/citations?user=kk8BWhAAAAAJ&hl=en" },
            ].map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
                className="kicker link-underline"
                style={{ color: "#7c7068", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#7c7068")}
              >{l.label}</a>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}

const PANEL_STYLE = {
  flexShrink: 0,
  width: "100vw",
  minHeight: "78vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "clamp(3rem, 8vh, 7rem) clamp(1.5rem, 8vw, 9rem)",
  borderRight: "1px solid rgba(26,26,26,0.1)",
  boxSizing: "border-box",
};

const PANEL_INNER = { width: "100%", maxWidth: "1100px", margin: "0 auto" };

function IntroPanel() {
  return (
    <div style={{ ...PANEL_STYLE, justifyContent: "center" }}>
      <div style={PANEL_INNER}>
        <p className="kicker" style={{ marginBottom: "2rem" }}>Areas of Focus</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1.1, color: "#1a1a1a", margin: "0 0 2.5rem 0", maxWidth: "20ch" }}>
          Three research directions.
        </p>
        <p className="kicker" style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(26,26,26,0.4)" }}>
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
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={PANEL_STYLE}
    >
      <div style={{ ...PANEL_INNER, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(4rem, 12vw, 11rem)",
            fontWeight: 300, lineHeight: 0.8,
            color: hovered ? "rgba(26,26,26,0.28)" : "rgba(26,26,26,0.13)",
            transition: "color 0.6s ease",
          }}
        >
          {area.num}
        </span>
        <span className="kicker" style={{ paddingTop: "0.75rem" }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div style={PANEL_INNER}>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
            fontWeight: 300, lineHeight: 1.02,
            margin: "0 0 1.5rem 0", color: "#1a1a1a",
            maxWidth: "18ch",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "translateX(0.75rem)" : "none",
          }}
        >
          {area.area}
        </h3>
        <p style={{ fontFamily: "'Faustina', serif", fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)", lineHeight: 1.7, color: "#7c7068", margin: 0, maxWidth: "48ch" }}>
          {area.sub}
        </p>
      </div>
    </div>
  );
}
