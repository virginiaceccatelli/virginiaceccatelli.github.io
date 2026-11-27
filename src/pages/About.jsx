import PageHeader, { PAD } from "../components/PageHeader";
import Reveal from "../components/fx/Reveal";
import Doodle from "../components/fx/Doodle";
import useMedia from "../hooks/useMedia";
import ExperienceSections from "./Experience";

const bio = [
  "I am a computer scientist working on the safety and security of machine learning systems, and on the policy questions that surround them. My research interests lie in understanding modern language models' failures under adversarial pressure as well as native safety issues, and how those failures can be measured and governed.",
  "I came to computer science from a social science background. I began a degree in international relations at IE University, where I grew interested in the societal dimensions of technology and, in particular, in how geopolitical events intersect with cybersecurity and emerging technologies. That interest led me to transfer to McGill University and complete a BA in Computer Science with a minor in Economics; studying machine learning, computer networks, compiler design, and systems programming, ultimately graduating with Distinction.",
  "On the technical side, I joined Mila under the supervision of Prof. David Adelani, where I led SpeechJBB, the first audio code-switching jailbreak benchmark for evaluating the safety of large audio language models. At UCL's Systems Security Research Lab (S2Lab), under the supervision of Prof. Lorenzo Cavallaro, my work focused on mech interp approaches to uncertainty quantification and secure agentic decision-making. Alongside this research, at WIIT I designed a secure multi-tenant platform for serving LLMs and built an adversarial evaluation harness for LLM-based and agentic systems security.",
  "On the policy side,I wrote a paper for the Andalus Committee on U.S.–Africa cybersecurity partnerships to strengthen Sub-Saharan African technological sovereignty. I also conducted research on the widespread risks of Russian-Iranian military drone (UAV) cooperation, the consequences for the West, the ethical implications of such advanced military technologies and the role of international law in regulating them.",
];

const interests = [
  "russian literature",
  "philosophy",
  "creative writing",
  "electric guitar",
  "alpine skiing",
  "trekking",
];

const languages = ["English (Native)", "Italian (Native)", "German (Native)", "Spanish (Advanced)", "French (Advanced)"];

export default function About() {
  const wide = useMedia("(min-width: 860px)");

  return (
    <div>
      <PageHeader
        title="About Me"
        size="clamp(2.4rem, 8vw, 7rem)"
      />


      {/* BACKGROUND — two columns of running text, with a big drawing alongside */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 7vh, 5rem) ${PAD}` }}>
        <Reveal><p className="mono" style={{ marginBottom: "2.5rem" }}>Background</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "1fr 1fr" : "1fr", gap: "0 clamp(2.5rem, 5vw, 5rem)", alignItems: "start" }}>
          {[bio.slice(0, 2), bio.slice(2)].map((column, ci) => (
            <div key={ci}>
              {column.map((para, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <p className="body-text" style={{ color: "var(--muted)", margin: "0 0 1.6rem 0", maxWidth: "60ch" }}>{para}</p>
                </Reveal>
              ))}
            </div>
          ))}
        </div>

        
      </section>

      {/* RESEARCH INTERESTS */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 7vh, 5rem) ${PAD}` }}>
        <Reveal><p className="mono" style={{ marginBottom: "2rem" }}>Personal Interests</p></Reveal>
        <Reveal delay={0.06}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {interests.map(t => (
              <span key={t} className="mono" style={{ border: "1px solid var(--rule)", padding: "0.55rem 0.9rem", color: "var(--ink)", fontSize: "0.62rem" }}>{t}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <ExperienceSections />

      {/* LANGUAGES — set big, as a closing statement */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 7vh, 5rem) ${PAD} clamp(4rem, 9vh, 6rem)` }}>
        <Reveal><p className="mono" style={{ marginBottom: "2rem" }}>Languages</p></Reveal>
        <Reveal delay={0.06}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem clamp(1.5rem, 3vw, 2.75rem)", alignItems: "baseline" }}>
            {languages.map(lang => (
              <span
                key={lang}
                className="display"
                style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.9rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em" }}
              >
                {lang}
              </span>
            ))}
          </div>
        </Reveal>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(3rem, 8vh, 6rem)" }}>
          <Doodle art="starfish" width={wide ? "min(20vw, 260px)" : "min(56vw, 220px)"} parallax={9} />
        </div>
      </section>
    </div>
  );
}
