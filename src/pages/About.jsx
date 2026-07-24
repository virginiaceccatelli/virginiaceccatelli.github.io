import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "../components/fx/SplitText";

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
  "Former Researcher at Mila - Quebec AI Institute",
  "Currently AI Security Researcher at UCL S2Lab",
  "Currently AI Security Intern at WIIT — The Premium Cloud",
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
  "I am a computer scientist working on the safety and security of machine learning systems, and on the policy questions that surround them. My research interests lie in understanding modern language models' failures under adversarial pressure as well as native safety issues, and how those failures can be measured and governed.",
  "I came to computer science from international relations. I began a degree in IR at IE University, where I grew interested in the societal dimensions of technology and, in particular, in how geopolitical events intersect with cybersecurity. That interest led me to transfer to McGill University and complete a BA in Computer Science with a minor in Economics; studying machine learning, computer networks, compiler design, and systems programming, ultimately graduating with Distinction.",
  "My work moves between the technical and the political. On the technical side, I led SpeechJBB, the first audio code-switching jailbreak benchmark for evaluating the safety of large audio language models, and built the dataset underpinning VoxSumm, a multilingual corpus for spoken-news summarization and translation. On the policy side, I have written on U.S.–Africa cybersecurity partnerships under China's Digital Silk Road and on the geopolitics of the Iranian–Russian military drone trade.",
  "I am currently an AI Security Researcher at UCL's Systems Security Lab (S2Lab), where I am leading a program-analysis framework that traces binding, data flow, control dependence, and security taint through code models to understand how semantic information is represented internally. It probes whether code property graph information is represented in model latent space, how these representations degrade under obfuscations and long context and whether they are causally used; verified with causal interventions such as activation patching. Alongside this, I am an AI Security intern at WIIT, building an agentic purple-teaming loop that continuously red-teams AI agents and autonomously hardens them.",
];

const positions = [
  { role: "AI Security Researcher", org: "UCL S2Lab" },
  { role: "AI Security Intern", org: "WIIT — The Premium Cloud" },
  { role: "Prev. AI Safety Researcher", org: "Mila — Québec AI Institute" },
];

const interests = [
  "Safety of multilingual & multimodal LLMs",
  "Interpretability of code models",
  "LLM uncertainty estimation",
  "Agentic red-teaming",
  "Cybersecurity policy & geopolitics",
];

export default function About() {
  return (
    <div style={{ background: "transparent", paddingTop: "56px" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Heading */}
        <div style={{ padding: "6rem 0 5rem", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "1.5rem" }}>Profile / Background</p></Reveal>
          <SplitText
            text="About"
            tag="h1"
            trigger="load"
            delay={0.1}
            stagger={0.05}
            duration={1.3}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 14vw, 13rem)", fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0 }}
          />
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
          <div style={{ padding: "5rem 0 5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Reveal>
              <p className="kicker" style={{ marginBottom: "1.5rem" }}>Current</p>
              {positions.map((p, i) => (
                <div key={p.role} style={{ borderTop: "1px solid rgba(26,26,26,0.1)", padding: "1.25rem 0" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)", fontWeight: 300, color: "#1a1a1a", margin: "0 0 0.15rem 0", lineHeight: 1.15 }}>{p.role}</p>
                  <p className="kicker" style={{ color: "#7c7068" }}>{p.org}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.12}>
              <p className="kicker" style={{ margin: "3rem 0 1.5rem" }}>Research Interests</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {interests.map(t => (
                  <span key={t} style={{ fontFamily: "'Faustina', serif", fontSize: "0.8rem", border: "1px solid rgba(26,26,26,0.18)", padding: "0.4rem 0.8rem", color: "#3a3530" }}>{t}</span>
                ))}
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
