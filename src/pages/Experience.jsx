import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageHeader, { PAD } from "../components/PageHeader";
import Reveal from "../components/fx/Reveal";
import Doodle from "../components/fx/Doodle";
import useMedia from "../hooks/useMedia";

const work = [
  { title: "AI Security Intern", company: "WIIT — The Premium Cloud", location: "Düsseldorf, Germany", period: "July 2026 – Current", bullets: ["Collaborating with WIIT AI Engineers to build an agentic purple-teaming loop that continuously red-teams AI agents and autonomously hardens them.", "Spearheading an automated attacker with a defined taxonomy (prompt injection, tool-parameter manipulation, and goal hijacking) alongside safety pillars such as bias and misinformation.", "Producing an evaluation harness to quantify detection, bypass, and false-positive rates across attack vectors."], tags: ["AI Security", "Red-Teaming", "Agentic Systems"] },
  { title: "AI Security Researcher", company: "UCL S2Lab — Prof. Lorenzo Cavallaro", location: "London, UK (Remote)", period: "June 2026 – Current", bullets: ["Co-developed and validated a taxonomy of internal LLM uncertainty signals, introducing trajectory-based probes that improved uncertainty estimation.", "Built a framework to trace binding, data flow, control dependence, and security taint flow in code models by aligning model activations with code property graphs.", "Verifying causal use of semantic representations via activation patching, and stress-testing robustness under semantics-preserving transformations across 5 obfuscation levels."], tags: ["AI Security", "Interpretability", "Program Analysis"] },
  { title: "AI Safety Researcher", company: "Mila Québec AI Institute — Prof. David Adelani", location: "Montréal, Canada", period: "January 2026 – August 2026", bullets: ["Led SpeechJBB, the first audio-based code-switching jailbreak dataset for multilingual speech-safety evaluation, exposing weaknesses in SOTA LALM safety alignment; published at EMNLP 2026 (Main Conference).", "Identified that non-English code-switching increased mean jailbreak success by 28% and reduced refusal by 14.4% relative to monolingual speech; introduced a pseudo-word obfuscation attack increasing jailbreak success by 34%."], tags: ["AI Safety", "LALMs", "Code-Switching", "Dataset Creation"] },
  { title: "Cyber-Policy Researcher", company: "Andalus Committee — New York Office", location: "New York, USA", period: "July 2025 – July 2026", bullets: ["Authored a policy paper on developing U.S.–Africa cybersecurity partnerships within the emerging Digital Silk Road.", "Explored opportunities for Global North–South collaboration on cybersecurity and emerging technologies."], tags: ["Research", "Policy", "Cybersecurity"] },
  { title: "Vice President", company: "Girls Who Code McGill", location: "Montréal, Canada", period: "August 2024 – May 2026", bullets: ["Directed internal operations for McGill's Girls Who Code chapter.", "Developed a Python curriculum and taught weekly classes at Sacred Heart High School (Montreal)."], tags: ["Teaching", "Python", "Mentoring"] },
  { title: "Computer Vision Researcher", company: "McGill Prometheus Lab — Prof. Joseph Vybihal", location: "Montréal, Canada", period: "May 2025 – August 2025", bullets: ["Devised a ground-segmentation and motion-planning system in C++ (U-Net, MobileNetV2), deployed across images, video, and live webcam for autonomous indoor navigation, reaching 0.91 validation IoU on a custom-labelled dataset.", "Selected the deployment checkpoint via safety-driven evaluation, prioritising small-obstacle detection and calibrated confidence on ambiguous surfaces over peak IoU."], tags: ["Computer Vision", "U-Net", "MobileNetV2", "Robotics"] },
  { title: "Digital Transformation Intern", company: "Wavestone", location: "Munich, Germany", period: "June 2024 – July 2024", bullets: ["Designed an RL system — environment, state & action spaces, and reward function — to automate data cleaning tasks; reduced records requiring manual review by 29% while preserving 96% correction precision.", "Improved the validity, accuracy, and completeness of financial datasets; deployed across the German actuarial department."], tags: ["Reinforcement Learning", "Data Cleaning", "Finance"] },
  { title: "IR & Cybersecurity Researcher", company: "IE University — Prof. Karen Nershi", location: "Madrid, Spain", period: "February 2024 – May 2024", bullets: ["Analyzed ransomware activity patterns during election cycles linked to multiple state actors.", "Produced a structured literature review on ransomware and cyber insurance, identifying gaps between research and policy frameworks."], tags: ["Cybersecurity Research", "Ransomware", "Policy"] },
];

const education = [
  { institution: "McGill University", degree: "BA — Computer Science (Major), Economics (Minor)", location: "Montréal, Canada", period: "2024 – 2026", gpa: "3.8 GPA · Graduated with Distinction (top 25%)", highlights: ["Applied Machine Learning (Graduate)", "Computer Networks (Graduate)", "Compiler Design (Graduate)", "Operating Systems"] },
  { institution: "IE University", degree: "BSc — International Relations (transferred after Year 2)", location: "Madrid, Spain", period: "2022 – 2024", gpa: "9.0/10 · Dean's List (top 10%)", highlights: ["Comparative Politics", "International Law", "Quantitative Methods", "International Political Economy", "Foreign Aid"] },
];

const certs = [
  { title: "CompTIA Network+ (N10-009) Full Course", org: "Udemy / Dion Training Solutions", year: "2025" },
  { title: "KPMG Data Analytics Virtual Internship", org: "Forage", year: "2023" },
];

const skills = {
  "Languages": [
    { name: "Python", level: "Experienced" }, { name: "C / C++", level: "Experienced" },
    { name: "Java", level: "Experienced" }, { name: "OCaml", level: "Intermediate" },
    { name: "Assembly", level: "Intermediate" }, { name: "Bash", level: "Experienced" },
    { name: "SQL", level: "Intermediate" }, { name: "R / Stata / MATLAB", level: "Working" },
  ],
  "ML & Data": [
    { name: "PyTorch", level: "Experienced" }, { name: "Hugging Face Transformers", level: "Experienced" },
    { name: "scikit-learn", level: "Experienced" }, { name: "NumPy / pandas", level: "Experienced" },
    { name: "OpenCV", level: "Working" }, { name: "LLM APIs", level: "Experienced" },
  ],
  "Systems & Tools": [
    { name: "Git", level: "Experienced" }, { name: "Docker", level: "Experienced" },
    { name: "Linux", level: "Working" }, { name: "CUDA", level: "Intermediate" },
    { name: "SGE / SLURM", level: "Experienced" }, { name: "Program Analysis", level: "Working" },
  ],
};

export default function Experience() {
  const wide = useMedia("(min-width: 860px)");

  return (
    <div>
      <PageHeader
        label="Archive / Skills"
        title="Experience"
        size="clamp(2.6rem, 11.5vw, 11rem)"
      />

      {/* WORK — rows that open on click */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 6vh, 4.5rem) 0` }}>
        <Reveal><p className="mono" style={{ padding: `0 ${PAD}`, marginBottom: "2.5rem" }}>Work</p></Reveal>
        {work.map((item, i) => <WorkRow key={i} item={item} index={i} wide={wide} />)}
      </section>

      {/* EDUCATION */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 6vh, 4.5rem) ${PAD}` }}>
        <Reveal><p className="mono" style={{ marginBottom: "2.5rem" }}>Education</p></Reveal>
        {education.map((edu, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ borderTop: "1px solid var(--rule)", padding: "2.25rem 0", display: "grid", gridTemplateColumns: wide ? "1fr 1fr" : "1fr", gap: "1.5rem clamp(2rem, 4vw, 4rem)" }}>
              <div>
                <span className="mono" style={{ display: "block", marginBottom: "0.9rem", fontSize: "0.6rem" }}>
                  Education {String(i + 1).padStart(2, "0")}
                </span>
                <p className="display" style={{ fontSize: "clamp(1.7rem, 4vw, 3.2rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.98, letterSpacing: "-0.03em", margin: "0 0 0.75rem 0" }}>
                  {edu.institution}
                </p>
                <p className="mono" style={{ fontSize: "0.6rem", margin: 0 }}>{edu.period} · {edu.location}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.6, margin: "0 0 0.6rem 0" }}>{edu.degree}</p>
                <p className="mono" style={{ marginBottom: "1.5rem", fontSize: "0.6rem" }}>{edu.gpa}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {edu.highlights.map(h => (
                    <span key={h} className="mono" style={{ border: "1px solid var(--rule)", padding: "0.4rem 0.7rem", fontSize: "0.58rem" }}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CERTIFICATIONS */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 6vh, 4.5rem) ${PAD}` }}>
        <Reveal><p className="mono" style={{ marginBottom: "2.5rem" }}>Certifications</p></Reveal>
        {certs.map((cert, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ borderTop: "1px solid var(--rule)", padding: "1.6rem 0", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.75rem 1.5rem" }}>
              <div>
                <p className="display" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)", fontWeight: 700, textTransform: "uppercase", margin: "0 0 0.35rem 0", lineHeight: 1.1 }}>
                  {cert.title}
                </p>
                <p className="mono" style={{ margin: 0, fontSize: "0.6rem" }}>{cert.org}</p>
              </div>
              <span className="mono" style={{ fontSize: "0.6rem" }}>{cert.year}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* SKILLS */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 6vh, 4.5rem) ${PAD} clamp(4rem, 8vh, 6rem)` }}>
        <Reveal><p className="mono" style={{ marginBottom: "2.5rem" }}>Technical Skills</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(3, 1fr)" : "1fr", gap: "2.5rem clamp(2rem, 4vw, 4rem)" }}>
          {Object.entries(skills).map(([group, items], gi) => (
            <Reveal key={group} delay={gi * 0.08}>
              <p className="display" style={{ fontSize: "1.15rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.01em", margin: "0 0 1.25rem 0", paddingBottom: "1rem", borderBottom: "1px solid var(--rule)" }}>
                {group}
              </p>
              {items.map(s => (
                <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: "0.7rem 0", borderBottom: "1px solid var(--rule)" }}>
                  <span style={{ fontSize: "0.88rem", color: "var(--ink)" }}>{s.name}</span>
                  <span className="mono" style={{ fontSize: "0.55rem", flexShrink: 0 }}>{s.level}</span>
                </div>
              ))}
            </Reveal>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(3rem, 8vh, 6rem)" }}>
          <Doodle art="starfish" width={wide ? "min(20vw, 260px)" : "min(56vw, 220px)"} parallax={9} />
        </div>
      </section>
    </div>
  );
}

function WorkRow({ item, index, wide }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.35) }}
      style={{ borderTop: "1px solid var(--rule)", cursor: "pointer" }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: wide ? "clamp(1.5rem, 3vw, 3rem)" : "1rem", alignItems: "start", padding: `1.75rem ${PAD}` }}>
        <span className="mono" style={{ paddingTop: "0.55rem", fontSize: "0.6rem" }}>{String(index + 1).padStart(2, "0")}</span>
        <div style={{ minWidth: 0 }}>
          <p className="display" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.7rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.03em", margin: "0 0 0.5rem 0" }}>
            {item.title}
          </p>
          <p className="mono" style={{ margin: 0, fontSize: "0.6rem", lineHeight: 1.7 }}>
            {item.company} · {item.location} · {item.period}
          </p>
        </div>
        <span
          className="display"
          style={{ paddingTop: "0.4rem", fontSize: "1.1rem", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div style={{ padding: `0 ${PAD} 2.25rem`, maxWidth: "80ch" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0" }}>
            {item.bullets.map((b, i) => (
              <li key={i} style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--muted)", padding: "0.7rem 0", borderTop: "1px solid var(--rule)", display: "flex", gap: "1rem" }}>
                <span style={{ flexShrink: 0 }}>—</span>{b}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {item.tags.map(tag => (
              <span key={tag} className="mono" style={{ border: "1px solid var(--rule)", padding: "0.35rem 0.7rem", fontSize: "0.56rem" }}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
