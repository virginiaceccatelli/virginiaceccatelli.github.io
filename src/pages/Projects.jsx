import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const GITHUB = "https://github.com/virginiaceccatelli";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  );
}

const projects = [
  { num: "01", title: "SpeechJBB: Code-Switched Speech Safety Evaluation", blurb: "First audio-based code-switching jailbreak benchmark for multilingual speech-safety evaluation, exposing weaknesses in SOTA large audio language model safety alignment.", tags: ["AI Safety", "LALMs", "Speech", "Code-Switching"], repo: null, link: "https://arxiv.org/abs/2606.06037", linkLabel: "View paper", status: "EMNLP 2026" },
  { num: "02", title: "VoxSumm Dataset", blurb: "Multilingual corpus for joint summarization and translation of long-form spoken news in low-resource languages, developed in collaboration with Google DeepMind.", tags: ["Dataset", "Speech", "Summarization", "Translation"], repo: null, link: "https://huggingface.co/datasets/McGill-NLP/speech-translation-and-summarization", linkLabel: "View dataset", status: "Submitted — EACL 2027" },
  { num: "03", title: "LLM Uncertainty Signals & Code-Model Semantics", blurb: "Taxonomy of internal LLM uncertainty signals with trajectory-based probes across four model families, plus a framework tracing binding, data flow, control dependence, and security taint flow in code models over ~2,000 Python programs.", tags: ["Interpretability", "Uncertainty", "Program Analysis", "LLMs"], repo: null, link: null, linkLabel: null, status: "Ongoing — UCL S2Lab" },
  { num: "04", title: "Agentic Purple-Teaming Loop", blurb: "Automated red-teaming and hardening loop for AI agents", tags: ["AI Security", "Red-Teaming", "Agents"], repo: null, link: null, linkLabel: null, status: "Ongoing — WIIT" },
  { num: "05", title: "RL Data Preprocessing Automation", blurb: "Reinforcement-learning-driven data quality pipeline: outlier detection, imputation, and financial validity rules to reduce manual preprocessing.", tags: ["Reinforcement Learning", "Pandas", "Sklearn", "Finance"], repo: null, link: null, linkLabel: null, status: "Wavestone · 2024" },
  { num: "06", title: "Robotic Ground Segmentation & Motion Decision", blurb: "Real-time RGB-only ground segmentation using U-Net + MobileNetV2 backbone and CNN-based directional decision for autonomous indoor robot navigation, reaching 0.91 validation IoU.", tags: ["PyTorch", "TorchScript", "OpenCV", "Robotics"], repo: "https://github.com/virginiaceccatelli/vision_control", link: null, linkLabel: "View code", status: "McGill Prometheus Lab · 2025" },
  { num: "07", title: "Cisco SOHO Network Simulation", blurb: "Small Office / Home Office network design and configuration on Cisco Packet Tracer, covering subnetting, VLANs, and routing protocols.", tags: ["Cisco", "Subnetting", "Routing", "Networking"], repo: "https://github.com/virginiaceccatelli/Cisco-Packet-Tracer-Projects", link: null, linkLabel: "View code", status: "2024" },
];

export default function Projects() {
  return (
    <div style={{ background: "transparent", paddingTop: "56px" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem" }}>

        <div style={{ padding: "6rem 0 5rem", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "1.5rem" }}>Selected Work</p></Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}>
            <Reveal delay={0.08}>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 13vw, 12rem)", fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0 }}>Projects</h1>
            </Reveal>
            <Reveal delay={0.15}>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="kicker link-underline" style={{ color: "#7c7068", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")} onMouseLeave={e => (e.currentTarget.style.color = "#7c7068")}>
                See more on GitHub →
              </a>
            </Reveal>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", borderLeft: "1px solid rgba(26,26,26,0.1)", borderTop: "1px solid rgba(26,26,26,0.1)" }}>
          {projects.map((project, i) => <ProjectCard key={project.num} project={project} delay={Math.min(i * 0.06, 0.3)} />)}
        </div>

        <div style={{ height: "5rem" }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const href = project.repo || project.link;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}>
      <div
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ borderRight: "1px solid rgba(26,26,26,0.1)", borderBottom: "1px solid rgba(26,26,26,0.1)", padding: "2.5rem 2rem", height: "420px", display: "flex", flexDirection: "column", background: hovered ? "#1a1a1a" : "transparent", transition: "background 0.45s cubic-bezier(0.16,1,0.3,1)", cursor: href ? "pointer" : "default" }}
        onClick={() => href && window.open(href, "_blank")}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
          <span style={{ fontFamily: "'Faustina', serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: hovered ? "rgba(244,241,234,0.45)" : "#7c7068", transition: "color 0.45s" }}>{project.num}</span>
          <span style={{ fontFamily: "'Faustina', serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: hovered ? "rgba(244,241,234,0.45)" : "#7c7068", transition: "color 0.45s" }}>{project.status}</span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", fontWeight: 300, lineHeight: 1.15, color: hovered ? "#f4f1ea" : "#1a1a1a", margin: "0 0 1rem 0", transition: "color 0.45s" }}>{project.title}</h3>
        <p style={{ fontFamily: "'Faustina', serif", fontSize: "0.9rem", lineHeight: 1.7, color: hovered ? "rgba(244,241,234,0.7)" : "#7c7068", margin: "0 0 1.25rem 0", transition: "color 0.45s", flexGrow: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>{project.blurb}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontFamily: "'Faustina', serif", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", border: `1px solid ${hovered ? "rgba(244,241,234,0.25)" : "rgba(26,26,26,0.18)"}`, padding: "0.3rem 0.65rem", color: hovered ? "rgba(244,241,234,0.65)" : "#7c7068", transition: "border-color 0.45s, color 0.45s" }}>{tag}</span>
          ))}
        </div>
        {href && (
          <a href={href} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontFamily: "'Faustina', serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: hovered ? "#f4f1ea" : "#1a1a1a", textDecoration: "none", borderBottom: `1px solid ${hovered ? "rgba(244,241,234,0.5)" : "rgba(26,26,26,0.3)"}`, paddingBottom: "2px", alignSelf: "flex-start", marginTop: "auto", transition: "color 0.45s, border-color 0.45s" }}>
            {project.linkLabel || "View"}
          </a>
        )}
      </div>
    </motion.div>
  );
}
