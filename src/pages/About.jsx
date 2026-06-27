import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  );
}

const achievements = [
  "Computer Science Major, Economics Minor — McGill University",
  "Distinction, top 25% — McGill University",
  "Dean's List, top 10% — IE University Madrid",
  "Former Vice President — Girls Who Code McGill",
  "Former Researcher — Andalus Committee New York",
];

const courses = [
  "Operating Systems",
  "Applied Machine Learning (Graduate)",
  "Computer Networks (Graduate)",
  "Compiler Design (Graduate)",
  "Programming Languages & Paradigms",
  "Probability & Statistics",
  "Financial Instruments & Institutions",
];

const bio = [
  "I'm a McGill University Computer Science alum with a strong interest in AI safety, systems security, and cybersecurity policy. Originally trained in International Relations at IE University, I developed a deep interest in the societal dimensions of technology — particularly how global events intersect with cybersecurity threats.",
  "This curiosity led me to pivot and complete a BA in Computer Science with a Minor in Economics at McGill, where I explored the technical underpinnings of machine learning, networks, compiler design, and systems programming.",
  "My research has moved between technical security and policy questions: I studied ransomware activity around elections, developed a vision-based ground segmentation pipeline for autonomous indoor navigation, and contributed to multilingual speech safety work at MILA, including SpeechJBB and the MS-VoxNews dataset.",
  "Currently, I'm working with UCL S2Lab on trajectory-based uncertainty quantification for language models, combining mechanistic interpretability with residual-stream geometry to anticipate uncertainty and hallucinations before output generation. I am also joining WIIT Premium Cloud as a Machine Learning Intern focused on cloud-native infrastructure for LLM workloads.",
];

export default function About() {
  return (
    <div style={{ background: "transparent", paddingTop: "56px" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Heading */}
        <div style={{ padding: "6rem 0 5rem", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "1.5rem" }}>Profile / Background</p></Reveal>
          <Reveal delay={0.08}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 14vw, 13rem)", fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0 }}>
              About
            </h1>
          </Reveal>
        </div>

        {/* Bio + photo */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
          <div style={{ padding: "5rem 3rem 5rem 0", borderRight: "1px solid rgba(26,26,26,0.1)" }}>
            <Reveal><p className="kicker" style={{ marginBottom: "2.5rem" }}>Background</p></Reveal>
            {bio.map((para, i) => (
              <Reveal key={i} delay={0.06 + i * 0.06}>
                <p style={{ fontFamily: "'Faustina', serif", fontSize: "clamp(1rem, 1.6vw, 1.15rem)", lineHeight: 1.78, color: "#3a3530", margin: "0 0 1.75rem 0" }}>{para}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ padding: "3rem 0 5rem 3rem" }}>
            <Reveal>
              <div style={{ aspectRatio: "3/4", overflow: "hidden", marginBottom: "3rem", maxWidth: "380px" }}>
                <img src="/first.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ aspectRatio: "4/3", overflow: "hidden", maxWidth: "380px" }}>
                <img src="/second.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </Reveal>
          </div>
        </div>

        {/* At a Glance + Academic */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
          <div style={{ padding: "5rem 3rem 5rem 0", borderRight: "1px solid rgba(26,26,26,0.1)" }}>
            <Reveal><p className="kicker" style={{ marginBottom: "2.5rem" }}>At a Glance</p></Reveal>
            {achievements.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", borderTop: "1px solid rgba(26,26,26,0.08)", padding: "1.25rem 0" }}>
                  <span className="kicker" style={{ flexShrink: 0, paddingTop: "2px" }}>0{i+1}</span>
                  <p style={{ fontFamily: "'Faustina', serif", fontSize: "0.95rem", lineHeight: 1.6, color: "#3a3530", margin: 0 }}>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ padding: "5rem 0 5rem 3rem" }}>
            <Reveal><p className="kicker" style={{ marginBottom: "0.4rem" }}>Academic Excellence</p></Reveal>
            <Reveal delay={0.06}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 300, lineHeight: 1, color: "#1a1a1a", margin: "0 0 0.5rem 0" }}>3.8</p>
              <p className="kicker" style={{ marginBottom: "3rem" }}>GPA · McGill University · Distinction</p>
            </Reveal>
            <Reveal delay={0.1}><p className="kicker" style={{ marginBottom: "1.5rem" }}>Course Highlights</p></Reveal>
            {courses.map((course, i) => (
              <Reveal key={i} delay={0.1 + i * 0.04}>
                <div style={{ borderTop: "1px solid rgba(26,26,26,0.08)", padding: "0.9rem 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Faustina', serif", fontSize: "0.92rem", color: "#3a3530" }}>{course}</span>
                  <span className="kicker">0{i+1}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Languages */}
        <Reveal>
          <div style={{ padding: "5rem 0", display: "flex", flexWrap: "wrap", gap: "1rem 3rem", alignItems: "baseline" }}>
            <p className="kicker" style={{ marginRight: "1rem" }}>Languages</p>
            {["English (Native)", "Italian (Native)", "German (Native)", "Spanish (Advanced)", "French (Advanced)"].map(lang => (
              <span key={lang} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, color: "#1a1a1a" }}>{lang}</span>
            ))}
          </div>
        </Reveal>

      </div>
    </div>
  );
}
