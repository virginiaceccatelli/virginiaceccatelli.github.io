import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import PageHeader, { PAD } from "../components/PageHeader";
import Reveal from "../components/fx/Reveal";
import Doodle from "../components/fx/Doodle";
import { getLenis } from "../components/fx/lenisInstance";
import useMedia from "../hooks/useMedia";

const GITHUB = "https://github.com/virginiaceccatelli";

// Projects are sourced from public repositories, published work, and selected
// ongoing research. Private work is listed without a repository link.
const projects = [
  {
    num: "01",
    title: "U-Space: Uncovering When and Why Uncertainty Arises in Language Models",
    short: "U-Space",
    status: "Under Review at ICLR · UCL S2Lab · 2026",
    role: "Co-author",
    tags: ["Mechanistic Interpretability", "Uncertainty Quantification", "Reasoning Models", "Activation Steering"],
    body: [
      "U-Space is a low-dimensional subspace of a language model's residual stream that makes its evolving uncertainty measurable and interpretable. Small sets of anchor words expressing doubt and certainty are pulled back from the vocabulary into the residual stream through the J-Lens (Anthropic), and their contrasts form an orthonormal basis spanning four sources of uncertainty: ambiguity, incompleteness, conflicting evidence, and general uncertainty. The U-Lens projects every reasoning token onto this basis, producing a token-by-category map of where uncertainty arises and what form it takes, with no correctness labels, repeated generations, or training.",
      "Combined with mean predictive entropy into a single trace-level score, the U-Lens outperforms established uncertainty estimators across three reasoning models and four benchmarks, both in standard and length-controlled evaluation, and transfers more reliably across benchmarks than supervised probes. Steering along the basis directions makes models hesitate and lose confidence even on trivial questions, evidence that these representations shape behaviour rather than merely correlate with it. Co-authored with Tobias Braun, Nils Loose, Alexander Herzog, Marcus Rohrbach, Thomas Eisenbarth, and Lorenzo Cavallaro.",
    ],
    figure: { images: ["/uspace-fig.png"], caption: "U-Space construction and U-Lens readout: (a) uncertainty and certainty anchors are pulled into the residual stream and orthogonalized into the U-Space basis; (b) each reasoning token is projected onto this basis, giving a token-by-category uncertainty map; (c) the end-of-thinking alignment is combined with mean predictive entropy into a trace-level score." },
    links: [
      { label: "Read paper", href: "https://arxiv.org/abs/2610.09087" },
      { label: "View code", href: "https://github.com/TobiasBrx/U-Space" },
    ],
  },
  {
    num: "02",
    title: "Where Is Uncertainty Observed? A Mechanistic Understanding of Uncertainty Quantification in LLMs",
    short: "Where Is Uncertainty Observed?",
    status: "Under Review at TMLR · UCL S2Lab · 2026",
    role: "Co-author",
    tags: ["Uncertainty Quantification", "Mechanistic Interpretability", "Survey", "LLM Evaluation"],
    body: [
      "A survey and framework that asks where in a language model's computation uncertainty is observed. Existing taxonomies organize uncertainty quantification (UQ) methods by the source of uncertainty or by the estimation mechanism. This work adds the observation point as its own axis, because it determines whether an estimator has access to enough information to recover a given target. Drawing on mechanistic interpretability, it defines four observation lenses on the residual stream: the structural lens reads component updates, the representational lens reads hidden states, the distributional lens reads token probabilities, and the semantical lens reads distributions over meanings. Each outer observation is a function of the inner ones and discards some information, so the lenses form a hierarchy. The lens decides whether an estimator is sufficient for a target, while what it resamples and the auxiliary structure it relies on decide how efficient it is.",
      "The survey classifies 159 papers along these axes and separates evaluation targets (correctness, grounding, underspecification, faithfulness), criteria, and metrics. Most hidden-state and component-level methods turn out to be surrogates trained against output-level labels, and 146 of the 159 papers target correctness. A proof-of-concept experiment on three open-weight models and three QA benchmarks finds that the correctness signal a probe can decode mostly decreases from the structural lens outward, with small gains over sampled semantic features, and that established estimators use only part of the signal available at their lens. Co-authored with Xiaoyu Liang, Aliai Eusebi, Tobias Braun, Nils Loose, Carlo Malagnino, and Lorenzo Cavallaro.",
    ],
    figure: { images: ["/uncertainty.png"], caption: "The four lenses applied to two queries. For the math query, the sampled answers agree on a wrong answer, so semantic uncertainty is low, but the hidden state lies near the uncertain direction. For the opinion query, the token distribution spreads over many phrasings, but the answers share one stance. A coloured frame marks the suited lens." },
    links: [
      { label: "Read paper", href: "https://arxiv.org/abs/2611.15735" },
    ],
  },
  {
    num: "03",
    title: "SpeechJBB: Code-Switched Speech Safety Evaluation",
    short: "SpeechJBB",
    status: "Findings of EMNLP 2026 · Mila",
    role: "First Author",
    tags: ["AI Safety", "LALMs", "Speech", "Code-Switching"],
    body: [
      "SpeechJBB is the first audio-based code-switching jailbreak benchmark for evaluating the safety alignment of large audio language models (LALMs). It asks whether models that look well-aligned on monolingual, text-based prompts stay safe when the same harmful request is spoken as speech that mixes languages within a single utterance (code-switching). This is a pattern that comes natural to multilingual speakers, yet is almost absent from safety training.",
      "Across state-of-the-art LALMs, non-English code-switched speech raised mean jailbreak success by 28% and reduced refusals by 14.4% relative to monolingual speech. A further attack inserts phonologically plausible pseudo-words around sensitive terms; this obfuscation seeks to emulate meaningless phonemes or noise and increased jailbreak success by an additional 34%. The findings were compared to general spoken comprehension tasks to distinguish safety misalignment from general model weakness, yet showed that alignment tuned largely on English text leaves systematic vulnerabilities in multilingual and spoken settings.",
    ],
    figure: { images: ["/mila.png"], maxWidth: "560px", caption: "Each Jailbreak Bench prompt is translated, recombined into code switched pairs, and optionally perturbed by the pseudo word probe; both variants are synthesized with XTTS and passed as speech input to each model." },
    links: [
      { label: "Read paper", href: "https://arxiv.org/abs/2606.06037" },
      { label: "View code", href: "https://github.com/virginiaceccatelli/speechJBB" },
    ],
  },
  {
    num: "04",
    title: "VoxSumm: Multilingual Spoken-News Summarization and Translation",
    short: "VoxSumm",
    status: "Under review at NAACL · 2026",
    role: "Co-author",
    tags: ["Speech", "Multilingual NLP", "Summarization", "Translation"],
    body: [
      "VoxSumm introduces joint speech summarization and translation (JSumT) for low-resource languages: generating a concise, faithful summary in a target language directly from a long spoken document in a source language. It is the first multilingual and cross-lingual benchmark for this task, pairing 10,045 BBC news articles and summaries across 24 low-resource languages with approximately 703 hours of speech.",
      "Evaluations of representative speech-language models reveal substantial variation across models and generation settings: Gemini 3.1 Pro is the most consistent, summarization into English generally outperforms generation into non-English languages, and translating a full document before summarizing compounds instruction-following failures. Co-authored with Yejin Jeon, Marie Maltais, Min Ma, and David Ifeoluwa Adelani.",
    ],
    links: [
      { label: "Read paper", href: "https://arxiv.org/abs/2608.10359" },
    ],
  },
  {
    num: "05",
    title: "Robotic Ground Segmentation & Motion Decision",
    short: "Ground Segmentation",
    status: "McGill Prometheus Lab · 2025",
    tags: ["Computer Vision", "U-Net", "MobileNetV2", "Robotics"],
    body: [
      "A purely vision-based navigation pipeline that lets an indoor robot decide where to move from a single camera, with no depth sensor, LiDAR, or map. The core is a U-Net semantic-segmentation network with a lightweight MobileNetV2 encoder, trained on a custom, hand-labelled dataset (built with Labelme) to classify every pixel of an RGB frame as either traversable ground or obstacle. The MobileNetV2 backbone keeps the model small enough to run in real time on an ordinary laptop.",
      "On top of the segmentation mask sits a “laser-beam” decision layer: it splits the frame into vertical regions, scores each by how much clear ground it contains, and picks the safest region to head toward — emitting a concrete steering command (turn left, turn right, or go straight) as a heading in degrees. The model reaches 0.91 validation IoU, and the deployment checkpoint was deliberately chosen for reliable small-obstacle detection and well-calibrated confidence on ambiguous surfaces rather than for peak IoU, since a missed obstacle matters more than a slightly lower score. It runs on still images, recorded video, or a live webcam, and also renders a confidence heatmap marking the zones it judges most safely traversable.",
    ],
    figure: { images: ["/vision1.png", "/vision2.png"], kind: "photo", caption: "The system running on a live indoor scene: the model's traversability confidence heatmap (warm = judged safe to traverse), and the predicted ground-plane mask split into scored regions with the chosen steering direction drawn as a line — both resolving to a single heading (70°)." },
    links: [
      { label: "View code", href: "https://github.com/virginiaceccatelli/vision_control" },
    ],
  },
  {
    num: "06",
    title: "Building and Optimizing a Compiler: Source to MIPS",
    short: "Compiler → MIPS",
    status: "COMP 520 · McGill · 2026",
    tags: ["Compilers", "Parsing", "Code Generation", "MIPS"],
    body: [
      "An end-to-end optimizing compiler that translates a high-level, object-oriented source language all the way down to runnable MIPS assembly. It implements the full pipeline: a lexer that turns source text into tokens, a parser that builds an abstract syntax tree, semantic analysis and type checking over that tree, and code generation, followed by register allocation and instruction-level optimization of the emitted code.",
      "Beyond the core pipeline, it supports object-oriented features and automatic memory management through garbage collection, so the compiler handles objects, methods, and dynamic allocation and produces assembly that runs correctly on a MIPS target.",
    ],
    links: [],
  },
  {
    num: "07",
    title: "Link-State Routing Protocol Simulation",
    short: "Link-State Routing",
    status: "COMP 535 · McGill · 2026",
    tags: ["Networking", "Distributed Systems", "Java", "Dijkstra"],
    body: [
      "A from-scratch implementation of a link-state routing protocol in the style of OSPF, in which routers are separate processes that discover the network's topology and compute routes through it entirely on their own. Each router is launched independently and connects to its neighbours over TCP sockets; a HELLO handshake brings a link up to a two-way state, at which point the two routers consider themselves adjacent.",
      "Once adjacencies form, every router describes its local links in a Link-State Advertisement and floods it to the whole network. Each advertisement carries a sequence number, so a router accepts an update only if it is newer than what it already holds, and it re-floods to all neighbours except the one it heard from. By doing this, the fresh topology information propagate everywhere while old data is ignored and infinite loops are avoided. Each router assembles these advertisements into its own link-state database and runs Dijkstra's algorithm over it to compute, and report on demand, the shortest path and cumulative weight to any destination in the topology.",
    ],
    links: [],
  },
  {
    num: "08",
    title: "Reliable Multicast File Transfer",
    short: "Multicast Transfer",
    status: "COMP 535 · McGill · 2026",
    tags: ["Networking", "Multicast", "C", "Reliability"],
    body: [
      "A system, written in C, for sending a file reliably to many receivers at once over IP multicast — the challenge being that multicast is inherently unreliable and connectionless, so there is no built-in guarantee that any given packet arrives. The sender breaks a file into numbered data chunks and streams them to the whole multicast group in a single transmission, rather than opening a separate connection to each receiver, so one send reaches an arbitrary number of listeners.",
      "A small protocol of five packet types is defined: file definition, data chunk, retransmission request, end-of-file, and retransmission-complete acknowledgement. Each receiver tracks which numbered chunks it has seen, detects gaps left by lost packets, and requests exactly those missing chunks. The sender re-multicasts them, and the end-of-file and acknowledgement packets let every receiver confirm it has reconstructed the complete file correctly before the transfer is considered done.",
    ],
    links: [],
  }
];

/* Hand-set indents so the index reads as a drifting column rather than a table. */
const INDENTS = [0, 24, 10, 36, 4, 28, 14];

export default function Projects() {
  const wide = useMedia("(min-width: 860px)");

  const jumpTo = (num) => {
    const el = document.getElementById(`project-${num}`);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <PageHeader
        label="Selected Work"
        title="Works"
        size="clamp(2.4rem, 8vw, 7rem)"
      />

      {/* INDEX — drifting list of titles, with one photograph alongside */}
      <section style={{ borderTop: "1px solid var(--rule)", padding: `clamp(3rem, 7vh, 5rem) ${PAD}` }}>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "1.55fr 1fr" : "1fr", gap: "clamp(3rem, 6vh, 5rem) clamp(2.5rem, 5vw, 5rem)", alignItems: "start" }}>
          <div>
            <Reveal><p className="mono" style={{ marginBottom: "clamp(2rem, 5vh, 3.5rem)" }}>Index</p></Reveal>
            {projects.map((p, i) => (
              <Reveal key={p.num} delay={Math.min(i * 0.05, 0.3)} y={14}>
                <button
                  onClick={() => jumpTo(p.num)}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    background: "none", border: "none", padding: "0.7rem 0",
                    marginLeft: wide ? `${INDENTS[i % INDENTS.length]}%` : 0,
                    cursor: "pointer",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "baseline", gap: "clamp(0.75rem, 2vw, 1.75rem)", flexWrap: "wrap" }}>
                    <span className="mono" style={{ fontSize: "0.58rem" }}>{p.num}</span>
                    <span
                      className="mono-lg"
                      style={{
                        color: "var(--ink)",
                        textDecoration: "underline",
                        textDecorationColor: "var(--accent)",
                        textUnderlineOffset: "5px",
                        textDecorationThickness: "1px",
                      }}
                    >
                      {p.short}
                    </span>
                    <span className="mono" style={{ fontSize: "0.56rem" }}>{p.status}</span>
                    {p.role && <span className="mono" style={{ fontSize: "0.56rem", color: "var(--accent)" }}>{p.role}</span>}
                  </span>
                </button>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="u-link" style={{ display: "inline-block", marginTop: "2.5rem", fontSize: "0.66rem" }}>
                See more on GitHub →
              </a>
            </Reveal>

            {/* fills the column the photograph leaves standing next to it */}
          </div>

          {/* Her laptop drawing, standing in for a photograph */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: wide ? "clamp(9rem, 8vh, 5.5rem)" : 0 }}>
            <Doodle art="computer" width={wide ? "min(50vw, 420px)" : "min(55vw, 170px)"} parallax={7} />
          </div>
        </div>
      </section>

      {/* FULL ENTRIES */}
      <div>
        {projects.map((project, i) => (
          <ProjectEntry key={project.num} project={project} delay={Math.min(i * 0.04, 0.16)} wide={wide} />
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--rule)", height: "clamp(2rem, 5vh, 4rem)" }} />
    </div>
  );
}

function ProjectEntry({ project, delay, wide }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.section
      id={`project-${project.num}`}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ borderTop: "1px solid var(--rule)", padding: `clamp(2.5rem, 6vh, 4rem) ${PAD}`, scrollMarginTop: "90px" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: wide ? "auto 1fr" : "1fr", gap: wide ? "clamp(1.5rem, 3vw, 3.5rem)" : "1.25rem", alignItems: "start" }}>
        <span className="mono" style={{ paddingTop: "0.5rem", fontSize: "0.6rem" }}>{project.num}</span>

        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem 2rem" }}>
            <h2
              className="display"
              style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.8rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.02, letterSpacing: "-0.03em", margin: 0, maxWidth: "24ch" }}
            >
              {project.title}
            </h2>
            <span style={{ display: "flex", flexDirection: "column", alignItems: wide ? "flex-end" : "flex-start", gap: "0.4rem", flexShrink: 0 }}>
              <span className="mono" style={{ fontSize: "0.6rem" }}>{project.status}</span>
              {project.role && <span className="mono" style={{ fontSize: "0.6rem", color: "var(--accent)" }}>{project.role}</span>}
            </span>
          </div>

          {project.body.length > 0 && (
            <div style={{ margin: "1.75rem 0 0", maxWidth: "74ch" }}>
              {project.body.map((para, i) => (
                <p key={i} className="body-text" style={{ color: "var(--muted)", margin: "0 0 1.1rem 0" }}>{para}</p>
              ))}
            </div>
          )}

          {project.figure?.images && <ProjectFigure figure={project.figure} />}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1.75rem 0 0" }}>
            {project.tags.map(tag => (
              <span key={tag} className="mono" style={{ border: "1px solid var(--rule)", padding: "0.35rem 0.7rem", fontSize: "0.56rem" }}>{tag}</span>
            ))}
          </div>

          {project.links.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", margin: "1.75rem 0 0" }}>
              {project.links.map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="u-link" style={{ fontSize: "0.64rem" }}>
                  {l.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

/*
 * Paper figures come out of matplotlib/TikZ on pure white, which reads as a
 * hard white slab on the cream page. Diagrams are multiplied onto the paper so
 * their white drops out and only the ink remains; photographs keep their own
 * tones and are mounted like prints. Any figure opens full-size on click.
 */
function ProjectFigure({ figure }) {
  const [open, setOpen] = useState(null);
  const photo = figure.kind === "photo";
  const multi = figure.images.length > 1;

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => { lenis?.start(); window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <figure style={{ margin: "2.25rem 0 0", maxWidth: figure.maxWidth ?? (multi ? "1000px" : "820px") }}>
      <div style={{ display: "grid", gridTemplateColumns: multi ? "repeat(auto-fit, minmax(280px, 1fr))" : "1fr", gap: photo ? "1rem" : "0.75rem" }}>
        {figure.images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(src)}
            aria-label="View figure full size"
            className="fig-frame"
            data-kind={photo ? "photo" : "diagram"}
          >
            <img src={src} alt={figure.caption} loading="lazy" decoding="async" />
            {multi && <span className="mono fig-tag">({String.fromCharCode(97 + i)})</span>}
          </button>
        ))}
      </div>
      <figcaption
        className="mono"
        style={{ margin: "1rem 0 0", paddingTop: "0.8rem", borderTop: "1px solid var(--rule)", fontSize: "0.56rem", lineHeight: 1.8, maxWidth: "80ch", textTransform: "none", letterSpacing: "0.04em" }}
      >
        <span style={{ color: "var(--accent)", textTransform: "uppercase", marginRight: "0.6em" }}>Fig.</span>
        {figure.caption}
      </figcaption>

      {createPortal(<AnimatePresence>
        {open && (
          <motion.div
            className="fig-lightbox"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={open}
              alt={figure.caption}
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="mono" style={{ position: "absolute", top: "1.5rem", right: "1.75rem" }}>Close ✕</span>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </figure>
  );
}
