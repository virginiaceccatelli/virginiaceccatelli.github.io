import PageHeader, { PAD } from "../components/PageHeader";
import Reveal from "../components/fx/Reveal";
import Doodle from "../components/fx/Doodle";
import useMedia from "../hooks/useMedia";

const achievements = [
  "Computer Science Major, Economics Minor — McGill University",
  "Distinction, top 25% — McGill University",
  "Currently AI Security Intern at WIIT — The Premium Cloud",
  "Currently AI Security Researcher at UCL S2Lab",
  "Former Researcher at Mila - Quebec AI Institute",
  "Former Policy Researcher at Andalus Committee - Columbia University",
  "Dean's List, top 10% — IE University Madrid",
];

const courses = [
  "Applied Machine Learning (Graduate)",
  "Computer Networks (Graduate)",
  "Compiler Design (Graduate)",
  "Probability & Statistics",
  "Operating Systems",
];

// Note: the corpus below is "VoxSumm," left unnamed here while the paper is under ACL review.
const bio = [
  "I am a computer scientist working on the safety and security of machine learning systems, and on the policy questions that surround them. My research interests lie in understanding modern language models' failures under adversarial pressure as well as native safety issues, and how those failures can be measured and governed.",
  "I came to computer science from international relations. I began a degree in IR at IE University, where I grew interested in the societal dimensions of technology and, in particular, in how geopolitical events intersect with cybersecurity. That interest led me to transfer to McGill University and complete a BA in Computer Science with a minor in Economics; studying machine learning, computer networks, compiler design, and systems programming, ultimately graduating with Distinction.",
  "My work moves between the technical and the political. On the technical side, I led SpeechJBB, the first audio code-switching jailbreak benchmark for evaluating the safety of large audio language models, and built a multilingual corpus for spoken-news summarization and translation. On the policy side, I have written on U.S.–Africa cybersecurity partnerships to strengthen Sub-Saharan African technological sovereignty and on the geopolitics of the Iranian–Russian military drone trade.",
  "I am currently an AI Security Researcher at UCL's Systems Security Lab (S2Lab), where I am leading a program-analysis framework that traces binding, data flow, control dependence, and security taint through code models to understand how semantic information is represented internally. It probes whether code property graph information is represented in model latent space, how these representations degrade under obfuscations and long context and whether they are causally used; verified with causal interventions such as activation patching. Alongside this, I am an AI Security intern at WIIT, building an agentic purple-teaming loop that continuously red-teams AI agents and autonomously hardens them.",
];

const positions = [
  { role: "AI Security Researcher", org: "UCL S2Lab", when: "Current" },
  { role: "AI Security Intern", org: "WIIT — The Premium Cloud", when: "Current" },
  { role: "Prev. AI Safety Researcher", org: "Mila — Québec AI Institute", when: "2026" },
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
        label="Profile / Background"
        title="About Me"
        intro="Computer scientist working on the safety and security of machine learning systems, and on the policy questions that increasingly surround them."
      />

      {/* desktop only — on a phone it would crowd the title block */}
      {wide && (
        <Doodle
          art="petals"
          width="18vw"
          parallax={5}
          reveal={false}
          style={{
            position: "absolute",
            top: "12vh",
            right: PAD,
            zIndex: 1,
          }}
        />
      )}

      {/* CURRENT — mono grid, as on the reference education block */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 7vh, 5rem) ${PAD}` }}>
        <Reveal><p className="mono" style={{ marginBottom: "2.5rem" }}>Current</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(3, 1fr)" : "1fr", gap: "2.5rem clamp(2rem, 4vw, 4rem)" }}>
          {positions.map((p, i) => (
            <Reveal key={p.role} delay={i * 0.07}>
              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: "1.25rem" }}>
                <p className="mono" style={{ margin: "0 0 0.9rem", fontSize: "0.6rem" }}>{p.when}</p>
                <p
                  className="display"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.75rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.05, margin: "0 0 0.5rem" }}
                >
                  {p.role}
                </p>
                <p className="mono" style={{ margin: 0, fontSize: "0.62rem" }}>{p.org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

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
        <Reveal><p className="mono" style={{ marginBottom: "2rem" }}>General Interests</p></Reveal>
        <Reveal delay={0.06}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {interests.map(t => (
              <span key={t} className="mono" style={{ border: "1px solid var(--rule)", padding: "0.55rem 0.9rem", color: "var(--ink)", fontSize: "0.62rem" }}>{t}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* AT A GLANCE + ACADEMIC */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 7vh, 5rem) ${PAD}` }}>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "1fr 1fr" : "1fr", gap: "clamp(3rem, 6vh, 4.5rem) clamp(2.5rem, 5vw, 5rem)" }}>
          <div>
            <Reveal><p className="mono" style={{ marginBottom: "2.5rem" }}>At a Glance</p></Reveal>
            {achievements.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", borderTop: "1px solid var(--rule)", padding: "1rem 0" }}>
                  <span className="mono" style={{ flexShrink: 0, paddingTop: "2px", fontSize: "0.6rem" }}>{String(i + 1).padStart(2, "0")}</span>
                  <p style={{ fontSize: "0.93rem", lineHeight: 1.55, color: "var(--ink)", margin: 0 }}>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal><p className="mono" style={{ marginBottom: "1rem" }}>Academic Achievements</p></Reveal>
            <Reveal delay={0.06}>
              <p className="display" style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)", fontWeight: 800, lineHeight: 0.85, letterSpacing: "-0.05em", margin: "0 0 1rem 0" }}>
                3.8
              </p>
              <p className="mono" style={{ marginBottom: "3rem", fontSize: "0.62rem" }}>GPA · McGill University · Distinction</p>
            </Reveal>
            <Reveal delay={0.1}><p className="mono" style={{ marginBottom: "1.5rem" }}>Course Highlights</p></Reveal>
            {courses.map((course, i) => (
              <Reveal key={i} delay={0.1 + i * 0.035}>
                <div style={{ borderTop: "1px solid var(--rule)", padding: "0.8rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "0.9rem", color: "var(--ink)" }}>{course}</span>
                  <span className="mono" style={{ fontSize: "0.58rem", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
      </section>
    </div>
  );
}
