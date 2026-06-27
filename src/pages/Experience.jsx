import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  );
}

const work = [
  { title: "Machine Learning Intern", company: "WIIT — The Premium Cloud", location: "Düsseldorf, Germany", period: "July 2026 – Current", bullets: ["Leading development and deployment of a cloud-native cluster for large language model workloads."], tags: ["Machine Learning", "LLM Infrastructure", "Cloud Native"] },
  { title: "Systems Security Researcher", company: "UCL S2Lab — Prof. Lorenzo Cavallaro", location: "London, UK", period: "June 2026 – Current", bullets: ["Developing a trajectory-based uncertainty quantification framework for language models.", "Combining mechanistic interpretability with residual-stream geometry to anticipate uncertainty and hallucinations before output generation."], tags: ["Systems Security", "AI Safety", "Mechanistic Interpretability"] },
  { title: "AI Safety Researcher", company: "MILA Québec AI Institute — Prof. David Adelani", location: "Montréal, Canada", period: "January 2026 – August 2026", bullets: ["Led SpeechJBB, an audio-based code-switching jailbreak dataset for multilingual speech safety evaluation.", "Exposed weaknesses in large audio language model safety alignment under code-switched and perturbed multilingual speech.", "Created the dataset for MS-VoxNews, a multilingual corpus for joint summarization and translation of long-form spoken news in low-resource languages."], tags: ["AI Safety", "LALMs", "Code-Switching", "Dataset Creation"] },
  { title: "Cyber-Policy Researcher", company: "Andalus Committee — New York Office", location: "New York, USA", period: "July 2025 – July 2026", bullets: ["Authored a policy paper on developing U.S.–Africa cybersecurity partnerships within the emerging Digital Silk Road.", "Explored opportunities for Global North–South collaboration on cybersecurity and emerging technologies."], tags: ["Research", "Policy", "Cybersecurity"] },
  { title: "Vice President", company: "Girls Who Code McGill", location: "Montréal, Canada", period: "August 2024 – May 2026", bullets: ["Directed internal operations for McGill's Girls Who Code chapter.", "Developed a Python curriculum and recruited more than 50 volunteer instructors for weekly classes across Montréal high schools."], tags: ["Teaching", "Python", "Mentoring"] },
  { title: "Robotic Vision Researcher", company: "McGill Prometheus Lab — Prof. Joseph Vybihal", location: "Montréal, Canada", period: "May 2025 – August 2025", bullets: ["Developed a real-time ground-segmentation and motion-planning system using a U-Net with a MobileNetV2 backbone.", "Engineered an RGB-only semantic-segmentation pipeline as a low-cost alternative to LIDAR-based navigation."], tags: ["Computer Vision", "U-Net", "MobileNetV2", "Robotics"] },
  { title: "Financial Optimization Intern", company: "Wavestone", location: "Munich, Germany", period: "June 2024 – July 2024", bullets: ["Led development of a reinforcement-learning approach to automate data cleaning and reduce manual preprocessing.", "Presented outcomes to actuarial leadership, focusing on measurable efficiency gains in financial data processing."], tags: ["Reinforcement Learning", "Data Cleaning", "Finance"] },
  { title: "IR & Cybersecurity Researcher", company: "IE University — Prof. Karen Nershi", location: "Madrid, Spain", period: "February 2024 – May 2024", bullets: ["Analyzed ransomware activity patterns during election cycles linked to multiple state actors.", "Produced a structured literature review on ransomware and cyber insurance, identifying gaps between research and policy frameworks."], tags: ["Cybersecurity Research", "Ransomware", "Policy"] },
];

const education = [
  { institution: "McGill University", degree: "BA — Computer Science (Major), Economics (Minor)", location: "Montréal, Canada", period: "2024 – 2026", gpa: "3.8 GPA · Distinction", highlights: ["Operating Systems", "Applied Machine Learning (Graduate)", "Computer Networks (Graduate)", "Compiler Design (Graduate)"] },
  { institution: "IE University", degree: "BA — International Relations (transferred after Year 2)", location: "Madrid, Spain", period: "2022 – 2024", gpa: "9.02/10 · Dean's List", highlights: ["Comparative Politics", "International Law", "Quantitative Methods", "International Political Economy"] },
];

const certs = [
  { title: "CompTIA Network+ (N10-009) Full Course", org: "Udemy / Dion Training Solutions", year: "2025" },
  { title: "KPMG Data Analytics Virtual Internship", org: "Forage", year: "2023" },
];

const skills = {
  "Languages": [
    { name: "Python", level: "Experienced" }, { name: "Java", level: "Experienced" },
    { name: "C / C++", level: "Intermediate" }, { name: "Assembly", level: "Intermediate" },
    { name: "OCaml", level: "Intermediate" }, { name: "JavaScript", level: "Intermediate" }, { name: "SQL", level: "Intermediate" },
  ],
  "ML & Data": [
    { name: "Machine Learning", level: "Experienced" }, { name: "PyTorch / OpenCV", level: "Working" },
    { name: "Mechanistic Interpretability", level: "Working" }, { name: "R / Stata / MATLAB", level: "Working" },
    { name: "Data Analysis", level: "Experienced" }, { name: "Dataset Creation", level: "Experienced" },
  ],
  "Security & Systems": [
    { name: "Kali Linux", level: "Intermediate" }, { name: "Linux", level: "Working" },
    { name: "Docker", level: "Working" }, { name: "Cisco Packet Tracer", level: "Intermediate" },
    { name: "Cybersecurity Policy", level: "Experienced" }, { name: "Git & GitHub", level: "Experienced" },
  ],
};

export default function Experience() {
  return (
    <div style={{ background: "transparent", paddingTop: "56px" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem" }}>

        <div style={{ padding: "6rem 0 5rem", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "1.5rem" }}>Archive / Skills</p></Reveal>
          <Reveal delay={0.08}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 12vw, 11rem)", fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0 }}>Experience</h1>
          </Reveal>
        </div>

        <section style={{ padding: "5rem 0" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "3rem" }}>Work</p></Reveal>
          {work.map((item, i) => <WorkRow key={i} item={item} index={i} />)}
        </section>

        <div style={{ height: "1px", background: "rgba(26,26,26,0.1)" }} />

        <section style={{ padding: "5rem 0" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "3rem" }}>Education</p></Reveal>
          {education.map((edu, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ borderTop: "1px solid rgba(26,26,26,0.1)", padding: "3rem 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
                <div>
                  <span className="kicker" style={{ display: "block", marginBottom: "1rem" }}>Education 0{i+1}</span>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.05, color: "#1a1a1a", margin: "0 0 0.5rem 0" }}>{edu.institution}</p>
                  <p className="kicker">{edu.period} · {edu.location}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "'Faustina', serif", fontSize: "0.95rem", color: "#3a3530", lineHeight: 1.65, margin: "0 0 0.75rem 0" }}>{edu.degree}</p>
                  <p className="kicker" style={{ marginBottom: "1.5rem" }}>{edu.gpa}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {edu.highlights.map(h => (
                      <span key={h} style={{ fontFamily: "'Faustina', serif", fontSize: "0.75rem", letterSpacing: "0.1em", border: "1px solid rgba(26,26,26,0.2)", padding: "0.35rem 0.75rem", color: "#7c7068" }}>{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <div style={{ height: "1px", background: "rgba(26,26,26,0.1)" }} />

        <section style={{ padding: "5rem 0" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "3rem" }}>Certifications</p></Reveal>
          {certs.map((cert, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ borderTop: "1px solid rgba(26,26,26,0.1)", padding: "2rem 0", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 300, color: "#1a1a1a", margin: "0 0 0.35rem 0", lineHeight: 1.15 }}>{cert.title}</p>
                  <p className="kicker">{cert.org}</p>
                </div>
                <span className="kicker">{cert.year}</span>
              </div>
            </Reveal>
          ))}
        </section>

        <div style={{ height: "1px", background: "rgba(26,26,26,0.1)" }} />

        <section style={{ padding: "5rem 0" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "3rem" }}>Technical Skills</p></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "3rem" }}>
            {Object.entries(skills).map(([group, items], gi) => (
              <Reveal key={group} delay={gi * 0.08}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, color: "#1a1a1a", margin: "0 0 1.5rem 0", borderBottom: "1px solid rgba(26,26,26,0.1)", paddingBottom: "1rem" }}>{group}</p>
                {items.map(s => (
                  <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid rgba(26,26,26,0.07)" }}>
                    <span style={{ fontFamily: "'Faustina', serif", fontSize: "0.92rem", color: "#3a3530" }}>{s.name}</span>
                    <span className="kicker">{s.level}</span>
                  </div>
                ))}
              </Reveal>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

function WorkRow({ item, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.35) }}
      style={{ borderTop: "1px solid rgba(26,26,26,0.1)", cursor: "pointer" }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: "2rem", alignItems: "start", padding: "2.25rem 0" }}>
        <span className="kicker" style={{ paddingTop: "0.4rem" }}>{String(index+1).padStart(2,"0")}</span>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)", fontWeight: 300, lineHeight: 1.05, color: "#1a1a1a", margin: "0 0 0.3rem 0" }}>{item.title}</p>
          <p style={{ fontFamily: "'Faustina', serif", fontSize: "0.9rem", color: "#7c7068", margin: 0 }}>{item.company} · {item.location} · {item.period}</p>
        </div>
        <span className="kicker" style={{ paddingTop: "0.5rem", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </div>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
        <div style={{ paddingLeft: "calc(56px + 2rem)", paddingBottom: "2.5rem" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0" }}>
            {item.bullets.map((b, i) => (
              <li key={i} style={{ fontFamily: "'Faustina', serif", fontSize: "0.95rem", lineHeight: 1.75, color: "#3a3530", padding: "0.5rem 0", borderTop: "1px solid rgba(26,26,26,0.07)", display: "flex", gap: "1rem" }}>
                <span style={{ color: "#7c7068", flexShrink: 0 }}>—</span>{b}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {item.tags.map(tag => (
              <span key={tag} style={{ fontFamily: "'Faustina', serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(26,26,26,0.2)", padding: "0.35rem 0.75rem", color: "#7c7068" }}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
