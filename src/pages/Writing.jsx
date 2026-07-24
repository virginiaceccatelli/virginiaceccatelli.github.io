import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "../components/fx/SplitText";

const writings = [
  {
    num: "01",
    title: "Securing the Digital Frontier: U.S.–Sub-Saharan Africa Cybersecurity Partnerships in the Shadow of China's Digital Silk Road",
    year: "2026",
    type: "Policy Paper",
    tags: ["Policy", "Cybersecurity", "Digital Silk Road", "Africa"],
    body: "How can the United States build durable cybersecurity partnerships in East Africa — with Kenya and Ethiopia as focal cases — at a moment when both states are digitising rapidly and China's Digital Silk Road is supplying much of the underlying infrastructure? The paper argues that ceding this space carries long-term strategic and security costs, and that the U.S. has a real opening to compete not by displacement but through cooperation — capacity-building, standards, and infrastructure partnerships pursued as Global North–South collaboration rather than great-power rivalry played out on African networks. Co-authored with F. Diop for the Andalus Committee.",
    link: "https://65bead61-ada5-408e-9924-c7be6e498634.filesusr.com/ugd/d98a02_77af6c01d90f4c0f8e7df233cab6cd35.pdf",
  },
  {
    num: "02",
    title: "Informal Allies: State–Cybercriminal Alignment in the Ransomware Ecosystem",
    year: "2025",
    type: "Journal Article",
    tags: ["Cybersecurity", "Ransomware", "Research Assistance"],
    body: "Do ransomware groups act as informal instruments of state interest rather than as purely profit-driven criminals? Drawing on an original dataset of 4,194 double-extortion victims from dark-web leak sites and over 60,000 leaked messages from a major cybercriminal group, the study finds that Russia-based groups intensify attacks ahead of Western elections, and that firms which withdrew from Russia after the 2022 invasion faced an elevated risk of being targeted; the leaked communications reveal information-sharing and cooperation with the Kremlin. Together this points to an informal alignment between the Russian state and the cybercriminal ecosystem. Published in the Journal of Cybersecurity (2025); I contributed research assistance to Prof. Karen Nershi.",
    link: "https://academic.oup.com/cybersecurity/article/11/1/tyaf037/8340911",
  },
  {
    num: "03",
    title: "Sky Diplomacy: The Geopolitical Impact of the Proliferation of Iranian-Russian Military Drone Trade on Global Alliances and Security",
    year: "2024",
    type: "Article",
    tags: ["UAV", "Policy", "Security", "Geopolitics"],
    body: "What does the deepening Iranian–Russian trade in military drones mean for the global balance of power? Setting recent transfers against the longer history of Iranian arms cooperation with Russia and China, the paper argues that armed UAVs have become an instrument of alignment among these states, accelerating a shift toward a world order in which Russia and China take a more central role and the West is left comparatively exposed. It traces the strategic, economic, and security dimensions of that shift and what it implies for Western alliances. Published in the IE International Policy Review.",
    link: "https://ipr.blogs.ie.edu/academic-papers/sky-diplomacy-final-draft-docx-1/",
  },
];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  );
}

export default function Writing() {
  return (
    <div style={{ background: "transparent", paddingTop: "56px" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem" }}>

        <div style={{ padding: "6rem 0 5rem", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "1.5rem" }}>Papers / Articles</p></Reveal>
          <SplitText
            text="Writing"
            tag="h1"
            trigger="load"
            delay={0.1}
            stagger={0.05}
            duration={1.3}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 11vw, 10rem)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0 }}
          />
        </div>

        <div>
          {writings.map((item, i) => <WritingEntry key={item.num} item={item} delay={Math.min(i * 0.05, 0.2)} />)}
          <div style={{ height: "1px", background: "rgba(26,26,26,0.1)" }} />
        </div>
        <div style={{ height: "5rem" }} />
      </div>
    </div>
  );
}

function WritingEntry({ item, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ borderTop: "1px solid rgba(26,26,26,0.1)", padding: "3.5rem 0" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "2rem", alignItems: "start" }}>
        <span className="kicker" style={{ paddingTop: "0.55rem" }}>{item.num}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem 2rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 300, lineHeight: 1.12, color: "#1a1a1a", margin: 0, maxWidth: "32ch" }}>{item.title}</h2>
            <span className="kicker" style={{ flexShrink: 0 }}>{item.year} · {item.type}</span>
          </div>

          <p style={{ fontFamily: "'Faustina', serif", fontSize: "clamp(0.98rem, 1.4vw, 1.08rem)", lineHeight: 1.8, color: "#3a3530", margin: "1.75rem 0 0", maxWidth: "72ch" }}>{item.body}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1.75rem 0 0" }}>
            {item.tags.map(tag => (
              <span key={tag} style={{ fontFamily: "'Faustina', serif", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(26,26,26,0.18)", padding: "0.3rem 0.65rem", color: "#7c7068" }}>{tag}</span>
            ))}
          </div>

          {item.link && (
            <div style={{ margin: "1.75rem 0 0" }}>
              <a href={item.link} target="_blank" rel="noreferrer" className="kicker link-underline" style={{ color: "#1a1a1a", textDecoration: "none" }}>
                Read {item.type} →
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
