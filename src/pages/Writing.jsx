import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageHeader, { PAD } from "../components/PageHeader";
import Reveal from "../components/fx/Reveal";
import Doodle from "../components/fx/Doodle";
import useMedia from "../hooks/useMedia";

const writings = [
  {
    num: "01",
    title: "Securing the Digital Frontier: U.S.–Sub-Saharan Africa Cybersecurity Partnerships in the Shadow of China's Digital Silk Road",
    short: "Securing the Digital Frontier",
    year: "2026",
    type: "Policy Paper",
    tags: ["Policy", "Cybersecurity", "Digital Silk Road", "Africa"],
    body: "How can the United States build durable cybersecurity partnerships in East Africa — with Kenya and Ethiopia as focal cases — at a moment when both states are digitising rapidly and China's Digital Silk Road is supplying much of the underlying infrastructure? The paper argues that ceding this space carries long-term strategic and security costs, and that the U.S. has a real opening to compete not by displacement but through cooperation — capacity-building, standards, and infrastructure partnerships pursued as Global North–South collaboration rather than great-power rivalry played out on African networks. Co-authored with F. Diop for the Andalus Committee.",
    link: "https://65bead61-ada5-408e-9924-c7be6e498634.filesusr.com/ugd/d98a02_77af6c01d90f4c0f8e7df233cab6cd35.pdf",
  },
  {
    num: "02",
    title: "Informal Allies: State–Cybercriminal Alignment in the Ransomware Ecosystem",
    short: "Informal Allies",
    year: "2025",
    type: "Journal Article",
    tags: ["Cybersecurity", "Ransomware", "Research Assistance"],
    body: "Do ransomware groups act as informal instruments of state interest rather than as purely profit-driven criminals? Drawing on an original dataset of 4,194 double-extortion victims from dark-web leak sites and over 60,000 leaked messages from a major cybercriminal group, the study finds that Russia-based groups intensify attacks ahead of Western elections, and that firms which withdrew from Russia after the 2022 invasion faced an elevated risk of being targeted; the leaked communications reveal information-sharing and cooperation with the Kremlin. Together this points to an informal alignment between the Russian state and the cybercriminal ecosystem. Published in the Journal of Cybersecurity (2025); I contributed research assistance to Prof. Karen Nershi.",
    link: "https://academic.oup.com/cybersecurity/article/11/1/tyaf037/8340911",
  },
  {
    num: "03",
    title: "Sky Diplomacy: The Geopolitical Impact of the Proliferation of Iranian-Russian Military Drone Trade on Global Alliances and Security",
    short: "Sky Diplomacy",
    year: "2024",
    type: "Article",
    tags: ["UAV", "Policy", "Security", "Geopolitics"],
    body: "What does the deepening Iranian–Russian trade in military drones mean for the global balance of power? Setting recent transfers against the longer history of Iranian arms cooperation with Russia and China, the paper argues that armed UAVs have become an instrument of alignment among these states, accelerating a shift toward a world order in which Russia and China take a more central role and the West is left comparatively exposed. It traces the strategic, economic, and security dimensions of that shift and what it implies for Western alliances. Published in the IE International Policy Review.",
    link: "https://ipr.blogs.ie.edu/academic-papers/sky-diplomacy-final-draft-docx-1/",
  },
];

export default function Writing() {
  const wide = useMedia("(min-width: 860px)");

  return (
    <div>
      <PageHeader label="Papers / Articles" title="Writing" size="clamp(3.2rem, 14vw, 12rem)" />

      {/* Contents + photograph */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 7vh, 5rem) ${PAD}` }}>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "1.5fr 1fr" : "1fr", gap: "clamp(3rem, 6vh, 5rem) clamp(2.5rem, 5vw, 5rem)", alignItems: "start" }}>
          <div>
            <Reveal><p className="mono" style={{ marginBottom: "clamp(2rem, 5vh, 3.5rem)" }}>Contents</p></Reveal>
            {writings.map((item, i) => (
              <Reveal key={item.num} delay={i * 0.07} y={14}>
                <div style={{ borderTop: "1px solid var(--rule)", padding: "1.4rem 0", marginLeft: wide ? `${i * 14}%` : 0 }}>
                  <span style={{ display: "flex", alignItems: "baseline", gap: "clamp(0.75rem, 2vw, 1.5rem)", flexWrap: "wrap" }}>
                    <span className="mono" style={{ fontSize: "0.58rem" }}>{item.num}</span>
                    <span className="mono-lg" style={{ color: "var(--ink)" }}>{item.short}</span>
                    <span className="mono" style={{ fontSize: "0.56rem" }}>{item.year} · {item.type}</span>
                  </span>
                </div>
              </Reveal>
            ))}

            {/* desktop only — on a phone the cat drawing below carries the page */}
            {wide && (
              <div style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
                <Doodle art="figures" width="min(18vw, 190px)" parallax={7} rotate={-6} />
              </div>
            )}
          </div>

          {/* Her cat-on-a-book drawing, standing in for a photograph */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Doodle art="book" width={wide ? "min(17vw, 300px)" : "min(62vw, 260px)"} parallax={8} />
          </div>
        </div>
      </section>

      {/* FULL ENTRIES */}
      <div>
        {writings.map((item, i) => (
          <WritingEntry key={item.num} item={item} delay={Math.min(i * 0.05, 0.2)} wide={wide} />
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--rule)", height: "clamp(2rem, 5vh, 4rem)" }} />
    </div>
  );
}

function WritingEntry({ item, delay, wide }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ borderTop: "1px solid var(--rule)", padding: `clamp(2.5rem, 6vh, 4rem) ${PAD}` }}
    >
      <div style={{ display: "grid", gridTemplateColumns: wide ? "auto 1fr" : "1fr", gap: wide ? "clamp(1.5rem, 3vw, 3.5rem)" : "1.25rem", alignItems: "start" }}>
        <span className="mono" style={{ paddingTop: "0.5rem", fontSize: "0.6rem" }}>{item.num}</span>

        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem 2rem" }}>
            <h2
              className="display"
              style={{ fontSize: "clamp(1.35rem, 2.9vw, 2.4rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.06, letterSpacing: "-0.03em", margin: 0, maxWidth: "30ch" }}
            >
              {item.title}
            </h2>
            <span className="mono" style={{ flexShrink: 0, fontSize: "0.6rem" }}>{item.year} · {item.type}</span>
          </div>

          <p className="body-text" style={{ color: "var(--muted)", margin: "1.75rem 0 0", maxWidth: "74ch" }}>{item.body}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1.75rem 0 0" }}>
            {item.tags.map(tag => (
              <span key={tag} className="mono" style={{ border: "1px solid var(--rule)", padding: "0.35rem 0.7rem", fontSize: "0.56rem" }}>{tag}</span>
            ))}
          </div>

          {item.link && (
            <div style={{ margin: "1.75rem 0 0" }}>
              <a href={item.link} target="_blank" rel="noreferrer" className="u-link" style={{ fontSize: "0.64rem" }}>
                Read {item.type} →
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
