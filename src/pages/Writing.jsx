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
    body: "This paper examines the cybersecurity challenges and cooperation opportunities between the United States, Ethiopia, and Kenya in the context of East Africa’s rapid digital transformation. As Kenya consolidates its position as a regional tech hub with evolved digital financial systems like M-Pesa, and Ethiopia pursues further digital reforms and developments, both countries face significant vulnerabilities stemming from weak institutional frameworks, fragmented regulatory environments, and heavy reliance on foreign technology infrastructure.The analysis reveals that these vulnerabilities create systemic risks, including for financial systems and digital governance, not only for national economies but also for regional stability and U.S. strategic interests. The paper argues that effective U.S. engagement must move beyond traditional aid models and toward technical partnerships that respect African agency, support locally-driven innovation, and build long-term institutional capacity to ensure both countries can govern their digital futures independently and securely. Co-authored with F. Diop for the Andalus Committee.",
    link: "https://65bead61-ada5-408e-9924-c7be6e498634.filesusr.com/ugd/d98a02_77af6c01d90f4c0f8e7df233cab6cd35.pdf",
  },
  {
    num: "02",
    title: "Informal Allies: State–Cybercriminal Alignment in the Ransomware Ecosystem",
    short: "Informal Allies",
    year: "2025",
    type: "Journal Article",
    tags: ["Cybersecurity", "Ransomware", "Research Assistance"],
    body: "Cybercrime frequently crosses national borders, as perpetrators and victims are often located in different countries. This paper asks: what role do states play in shaping cybercriminal activity? Drawing on an original dataset of 4194 double extortion ransomware victims collected from dark web sources, I identify cybercriminal activity aligned with Russian state interests. I find Russia-based groups increased attacks before Western elections, and companies that withdrew from Russia after the invasion—an action widely perceived as a condemnation of Russia—faced an increased risk of attack. I also analysed over 60 000 leaked messages from a major cybercriminal group, which reveals information sharing and cooperation with the Kremlin. Based on these analyses, I argue that the Kremlin maintains an informal cooperative relationship with ransomware groups operating from its territory, advancing a more nuanced theoretical understanding of how states can leverage cybercriminals for geopolitical ends. Published in the Journal of Cybersecurity (2025); I contributed research assistance to Prof. Karen Nershi (non-authorship).",
    link: "https://academic.oup.com/cybersecurity/article/11/1/tyaf037/8340911",
  },
  {
    num: "03",
    title: "Sky Diplomacy: The Geopolitical Impact of the Proliferation of Iranian-Russian Military Drone Trade on Global Alliances and Security",
    short: "Sky Diplomacy",
    year: "2024",
    type: "Article",
    tags: ["UAV", "Policy", "Security", "Geopolitics"],
    body: "The geopolitical implications of Russian Iranian advancements in military drone trade, particularly Unmanned Air Vehicles, are closely tied to a shifting Balance of Power that is set to leave the West behind. Focusing on the historical context of Iranian trade with Russia and China, as well as recent developments, the study analyzes how these armed drones are contributing to the shifting world order, wherein Russia and China are increasingly taking on a leading role, and how this is impacting the West from various points of view. The research explores ethical concerns, security risks, and international law violations that are resulting from the deepening military collaboration between Russia and Iran. Broader consequences are highlighted, such as increased instability in Syria and heightened nuclear risks due to a nearing nuclear Iranian state. There are certain measures that the West has to take in order to navigate this evolving landscape and changing power dynamics, in order to fortify their current stance within the international order and overcome this imminent change smoothly. Published in the IE International Policy Review.",
    link: "https://ipr.blogs.ie.edu/wp-content/uploads/sites/574/2024/02/Sky-Diplomacy-Final-Draft.docx-1.pdf",
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
