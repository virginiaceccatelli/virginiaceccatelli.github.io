import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  { num: "02", area: "Interpretability & Program Analysis", sub: "Trajectory-based uncertainty probes, tracing data flow and security taint in code models, activation patching" },
  { num: "03", area: "Cybersecurity Policy", sub: "U.S.–Africa partnerships, Digital Silk Road dynamics, global north-south collaboration" },
];

const destinations = [
  { label: "About", path: "/about", sub: "Background & profile" },
  { label: "Experience", path: "/experience", sub: "Work & education" },
  { label: "Projects", path: "/projects", sub: "Selected work" },
  { label: "Writing", path: "/writing", sub: "Papers & articles" },
];

export default function Home() {
  return (
    <div style={{ background: "transparent" }}>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 2rem 4.5rem", maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(5.5rem, 17vw, 20rem)", fontWeight: 300, lineHeight: 0.86, letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0 }}>
            Virginia<br />Ceccatelli
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "1.5rem 3rem", alignItems: "center" }}
        >
          <span className="kicker">AI Safety · AI Security · Cybersecurity Policy</span>
          <span className="kicker" style={{ color: "rgba(124,112,104,0.5)" }}>McGill CS · UCL S2Lab · MILA</span>
        </motion.div>

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

      <div style={{ height: "1px", background: "rgba(26,26,26,0.1)", maxWidth: "1440px", margin: "0 auto" }} />

      {/* INTRO */}
      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "7rem 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
        <Reveal>
          <p className="kicker" style={{ marginBottom: "1.5rem" }}>Profile</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", fontWeight: 300, lineHeight: 1.28, color: "#1a1a1a", margin: "0 0 2rem 0", maxWidth: "520px" }}>
            McGill Computer Science alum working at the intersection of AI safety, AI security, and cybersecurity policy.
          </p>
          <Link to="/about" className="kicker link-underline" style={{ color: "#1a1a1a", textDecoration: "none" }}>
            Full profile →
          </Link>
        </Reveal>

        <Reveal delay={0.12}>
          <div style={{ aspectRatio: "3/4", overflow: "hidden", maxWidth: "360px" }}>
            <img src="/foto.png" alt="Virginia Ceccatelli" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { label: "Currently at", value: "UCL S2Lab · WIIT Premium Cloud" },
              { label: "Based in", value: "London, UK" },
              { label: "Education", value: "McGill University — CS + Economics, 3.8 GPA" },
              { label: "Prev. research", value: "MILA Québec AI Institute" },
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

      {/* FOCUS AREAS */}
      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "7rem 2rem 0" }}>
        <Reveal><p className="kicker" style={{ marginBottom: "3rem" }}>Areas of Focus</p></Reveal>
        {focusAreas.map((area, i) => <FocusRow key={area.num} area={area} delay={i * 0.1} />)}
        <div style={{ height: "1px", background: "rgba(26,26,26,0.1)" }} />
      </section>

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
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, margin: 0, lineHeight: 1 }}>Get in touch.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <a href={`mailto:${EMAIL}`} className="kicker link-underline" style={{ color: "#1a1a1a", textDecoration: "none" }}>{EMAIL}</a>
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

function FocusRow({ area, delay }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "2rem", alignItems: "start", borderTop: "1px solid rgba(26,26,26,0.1)", padding: "2.75rem 0", cursor: "default" }}
    >
      <span className="kicker" style={{ paddingTop: "0.5rem" }}>{area.num}</span>
      <div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 300, lineHeight: 1, margin: "0 0 0.75rem 0", color: "#1a1a1a", transition: "opacity 0.3s", opacity: hovered ? 0.5 : 1 }}>
          {area.area}
        </h3>
        <p style={{ fontFamily: "'Faustina', serif", fontSize: "0.92rem", lineHeight: 1.65, color: "#7c7068", margin: 0, maxWidth: "520px" }}>
          {area.sub}
        </p>
      </div>
    </motion.div>
  );
}
