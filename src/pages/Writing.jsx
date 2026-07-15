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

const writings = [
  { num: "01", title: "SpeechJBB: Probing Safety Alignment and Comprehension in Large Audio Language Models under Code-Switched Speech", description: "Introduces the first audio-based code-switching jailbreak dataset for multilingual speech-safety evaluation, exposing weaknesses in SOTA large audio language model safety alignment. Non-English code-switching increased mean jailbreak success by 28% and reduced refusal by 14.4% relative to monolingual speech. Published in the Proceedings of EMNLP 2026 (Main Conference).", tags: ["AI Safety", "Speech", "Code-Switching", "LALMs"], year: "2026", type: "Conference Paper", link: "https://arxiv.org/abs/2606.06037" },
  { num: "02", title: "VoxSumm: A Multilingual Corpus of Long-Form Spoken News for Joint Summarization and Translation", description: "A multilingual corpus for joint summarization and translation of long-form spoken news in low-resource languages, developed in collaboration with Google DeepMind. With Y. Jeon, M. Maltais, M. Ma, and D. I. Adelani. Submitted to EACL 2027.", tags: ["Dataset", "Speech", "Summarization", "Translation"], year: "2026", type: "Preprint", link: "https://huggingface.co/datasets/McGill-NLP/speech-translation-and-summarization" },
  { num: "03", title: "Securing the Digital Frontier: U.S.–Sub-Saharan Africa Cybersecurity Partnerships in the Shadow of China's Digital Silk Road", description: "Examines U.S. opportunities to strengthen cybersecurity cooperation with Kenya and Ethiopia as both nations navigate rapid digital transformation in East Africa, with implications for Global North–South technology collaboration. Co-authored with F. Diop for the Andalus Committee.", tags: ["Policy", "Cybersecurity", "Digital Silk Road", "Africa"], year: "2026", type: "Policy Paper", link: "https://65bead61-ada5-408e-9924-c7be6e498634.filesusr.com/ugd/d98a02_77af6c01d90f4c0f8e7df233cab6cd35.pdf" },
  { num: "04", title: "State–Cybercriminal Alignment in the Ransomware Ecosystem", description: "Research assistance to Prof. Karen Nershi's study of statistical patterns in state-backed ransomware activity during electoral cycles, published in the Journal of Cybersecurity (2025).", tags: ["Cybersecurity", "Ransomware", "Research Assistance"], year: "2025", type: "Journal Article", link: null },
  { num: "05", title: "CNN Robotic Vision for Ground Segmentation — U-Net Applicability", description: "Implements a ground segmentation model using U-Net and determines a robot's directional movement decision based on obstacle-free zones. Purely vision-based, portable, and computationally lightweight — useful for prototyping computer vision for robotic navigation.", tags: ["Robotics", "Computer Vision", "Convolutional Neural Networks"], year: "2025", type: "Research Paper", link: "https://github.com/virginiaceccatelli/vision_control" },
  { num: "06", title: "Sky Diplomacy: The Geopolitical Impact of the Proliferation of Iranian-Russian Military Drone Trade on Global Alliances and Security", description: "Focusing on the historical context of Iranian trade with Russia and China as well as recent developments, this study analyzes how armed UAV drones are contributing to the shifting world order and how this is impacting the West from various points of view. Published in the IE International Policy Review.", tags: ["UAV", "Policy", "Security", "Geopolitics"], year: "2024", type: "Article", link: "https://ipr.blogs.ie.edu/wp-content/uploads/sites/574/2024/02/Sky-Diplomacy-Final-Draft.docx-1.pdf" },
];

export default function Writing() {
  return (
    <div style={{ background: "transparent", paddingTop: "56px" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem" }}>

        <div style={{ padding: "6rem 0 5rem", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "1.5rem" }}>Papers / Articles</p></Reveal>
          <Reveal delay={0.08}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0 }}>Writing</h1>
          </Reveal>
        </div>

        <div>
          {writings.map((item, i) => <WritingRow key={item.num} item={item} delay={Math.min(i * 0.07, 0.28)} />)}
          <div style={{ height: "1px", background: "rgba(26,26,26,0.1)" }} />
        </div>
        <div style={{ height: "5rem" }} />
      </div>
    </div>
  );
}

function WritingRow({ item, delay }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }} style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: "2rem", alignItems: "start", padding: "2.5rem 0", cursor: "pointer" }}>
        <span className="kicker" style={{ paddingTop: "0.6rem" }}>{item.num}</span>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)", fontWeight: 300, lineHeight: 1.12, color: "#1a1a1a", margin: "0 0 0.5rem 0" }}>{item.title}</p>
          <span className="kicker">{item.year} · {item.type}</span>
        </div>
        <span className="kicker" style={{ paddingTop: "0.6rem", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </div>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
        <div style={{ paddingLeft: "calc(56px + 2rem)", paddingBottom: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <p style={{ fontFamily: "'Faustina', serif", fontSize: "0.95rem", lineHeight: 1.78, color: "#3a3530", margin: 0, maxWidth: "680px" }}>{item.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {item.tags.map(tag => (
              <span key={tag} style={{ fontFamily: "'Faustina', serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(26,26,26,0.18)", padding: "0.35rem 0.75rem", color: "#7c7068" }}>{tag}</span>
            ))}
          </div>
          {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="kicker link-underline" style={{ color: "#1a1a1a", textDecoration: "none" }}>Read {item.type} →</a>}
        </div>
      </motion.div>
    </motion.div>
  );
}
