import { Link } from "react-router-dom";
import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../components/fx/SplitText";
import Magnet from "../components/fx/Magnet";
import Doodle from "../components/fx/Doodle";
import Reveal from "../components/fx/Reveal";
import useMedia from "../hooks/useMedia";

gsap.registerPlugin(ScrollTrigger);

const GITHUB = "https://github.com/virginiaceccatelli";
const LINKEDIN = "https://www.linkedin.com/in/virginia-ceccatelli/";
const SCHOLAR = "https://scholar.google.com/citations?user=kk8BWhAAAAAJ&hl=en";
const EMAIL = "virginia.ceccatelli@mail.mcgill.ca";

const PAD = "clamp(1.25rem, 3vw, 2.5rem)";

const contacts = [
  { label: "GitHub", href: GITHUB },
  { label: "Scholar", href: SCHOLAR },
  { label: "LinkedIn", href: LINKEDIN },
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
          width={wide ? "35vw" : "90vw"}
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
          {/*  <Link to="/about" className="u-link" style={{ fontSize: "0.7rem" }}>About Me</Link> 
            <Link to="/projects" className="u-link" style={{ fontSize: "0.7rem" }}>Works</Link>
            <Link to="/writing" className="u-link" style={{ fontSize: "0.7rem" }}>Writing</Link>*/}
          </motion.div>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mono"
          style={{ position: "absolute", bottom: "3rem", right: PAD, writingMode: "vertical-lr", fontSize: "0.6rem", zIndex: 1 }}
        >
          Scroll
        </motion.span>
      </section>

      {/* ───────────────────────── PROFILE ───────────────────────── */}
      <section style={{ padding: `clamp(5rem, 11vh, 9rem) ${PAD}` }}>
        <div>
          <div>
            <Reveal delay={0.12}>
              <p className="body-text" style={{ color: "var(--muted)", margin: "0 0 2.5rem 0" }}>
                I'm a recent computer science graduate working at the intersection of AI safety, AI security, and cybersecurity policy.
                I want to evaluate the risks of AI systems and help design safer, more robust and more responsible AI technologies. 
                A lot of my more recent work focuses on leveraging interpretability tools to improve the transparency of AI systems and to understand their security implications better.
                I believe that a clearer view on the causes of model behaviours could help establish more effective safeguards, training processes or other interventions to prevent unintended consequences.
                Understanding the security implications of AI systems is crucial to ensure that they are not misused or exploited in ways that could cause harm.
              </p>
              <Link to="/about" className="u-link" style={{ fontSize: "0.68rem" }}>Full profile →</Link>
            </Reveal>
          </div>
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