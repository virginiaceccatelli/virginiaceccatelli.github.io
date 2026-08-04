import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageHeader, { PAD } from "../components/PageHeader";
import Reveal from "../components/fx/Reveal";
import Doodle from "../components/fx/Doodle";
import { getLenis } from "../components/fx/lenisInstance";
import useMedia from "../hooks/useMedia";

const GITHUB = "https://github.com/virginiaceccatelli";

// Projects are sourced from public repositories and published work. Entries
// without a public source are intentionally omitted; per request, Semantic
// Flow is listed without description while the work is ongoing.
const projects = [
  {
    num: "01",
    title: "SpeechJBB: Code-Switched Speech Safety Evaluation",
    short: "SpeechJBB",
    status: "EMNLP 2026 · Mila",
    tags: ["AI Safety", "LALMs", "Speech", "Code-Switching"],
    body: [
      "SpeechJBB is the first audio-based code-switching jailbreak benchmark for evaluating the safety alignment of large audio language models (LALMs). It asks a simple question with uncomfortable answers: do models that look well-aligned on monolingual, text-based prompts stay safe when the same harmful request is spoken as speech that mixes languages within a single utterance. This is a pattern that comes natural to multilingual speakers, yet is almost absent from safety training.",
      "Across state-of-the-art LALMs, non-English code-switched speech raised mean jailbreak success by 28% and reduced refusals by 14.4% relative to monolingual speech. A further attack inserts phonologically plausible pseudo-words around sensitive terms; this natural-sounding obfuscation increased jailbreak success by an additional 34%. The findings show that alignment tuned largely on English text leaves systematic vulnerabilities in multilingual and spoken settings.",
    ],
    figure: { images: ["/mila.png"], caption: "Jailbreak success rate across large audio language models (rows) and monolingual and code-switched language conditions (columns)." },
    links: [
      { label: "Read paper", href: "https://arxiv.org/abs/2606.06037" },
      { label: "View code", href: "https://github.com/virginiaceccatelli/speechJBB" },
    ],
  },
  {
    num: "02",
    // Real name is "VoxSumm"; kept as "Preprint" temporarily while the paper is under ACL review.
    title: "Multilingual Corpus for Summarization & Translation",
    short: "Preprint",
    status: "ACL ARR 2027 · Mila",
    tags: ["Dataset", "Speech", "Summarization", "Translation"],
    body: [
      "This project formalizes joint speech summarization and translation (JSumT): generating a concise, faithful summary in a target language directly from a long spoken document in a source language, rather than treating summarization and translation as separate steps. Built in collaboration with Google DeepMind, it is the first multilingual benchmark for this task, comprising 10,045 BBC article-summary pairs across 24 languages and roughly 703 hours of synthesized speech, with audio quality validated through ASR-based character error rate, NISQA naturalness scoring, and human listening evaluations.",
      "Evaluating Gemini, Gemma, and Qwen across zero-shot, few-shot, and chain-of-thought prompting revealed consistent patterns: Gemini is the most consistent model across languages and prompting strategies, few-shot prompting most reliably benefits stronger models, and all three models improve with the source language's resource availability. Generating an English summary from non-English speech is consistently easier than the reverse direction, since models can condense content in their dominant pretraining language before the comparatively short task of translating the summary.",
      "A further ablation compares task ordering: translating an entire spoken document before summarizing it, versus summarizing first and translating the summary. The former compounds instruction-following failures, models more often drop the summary or hallucinate after sustained non-English generation, establishing summarize-then-translate as the more reliable pipeline.",
    ],
    links: [
      { label: "View dataset", href: "https://huggingface.co/datasets/McGill-NLP/speech-translation-and-summarization" },
    ],
  },
  {
    num: "03",
    title: "Semantic Flow: Tracing Semantic State in Code Models",
    short: "Semantic Flow",
    status: "Ongoing · UCL S2Lab",
    tags: ["Interpretability", "Program Analysis", "Code Models"],
    body: [
      "Semantic Flow asks whether code language models internally represent the meaning of a program, namely which definition a name refers to, where a value flows, what controls its execution, and whether it is tainted, or only its surface text. To test this, it generates Python programs whose semantic structure is known exactly by construction, builds corresponding code property graphs, runs a frozen code model over them and trains low-capacity linear probes on the saved hidden states to check whether relations like binding, data flow, control dependence, and security taint are linearly decodable. The appropriate controls are also implemented to rule out shortcuts from surface form alone. It further studies how that internal structure holds up as context grows and as code is rewritten while its meaning is held fixed, and whether the model causally relies on these representations, using activation patching.",
    ],
    links: [
      { label: "View repository", href: "https://github.com/virginiaceccatelli/semantic-flow" },
    ],
  },
  {
    num: "04",
    title: "Robotic Ground Segmentation & Motion Decision",
    short: "Ground Segmentation",
    status: "McGill Prometheus Lab · 2025",
    tags: ["Computer Vision", "U-Net", "MobileNetV2", "Robotics"],
    body: [
      "A purely vision-based navigation pipeline that lets an indoor robot decide where to move from a single camera, with no depth sensor, LiDAR, or map. The core is a U-Net semantic-segmentation network with a lightweight MobileNetV2 encoder, trained on a custom, hand-labelled dataset (built with Labelme) to classify every pixel of an RGB frame as either traversable ground or obstacle. The MobileNetV2 backbone keeps the model small enough to run in real time on an ordinary laptop.",
      "On top of the segmentation mask sits a “laser-beam” decision layer: it splits the frame into vertical regions, scores each by how much clear ground it contains, and picks the safest region to head toward — emitting a concrete steering command (turn left, turn right, or go straight) as a heading in degrees. The model reaches 0.91 validation IoU, and the deployment checkpoint was deliberately chosen for reliable small-obstacle detection and well-calibrated confidence on ambiguous surfaces rather than for peak IoU, since a missed obstacle matters more than a slightly lower score. It runs on still images, recorded video, or a live webcam, and also renders a confidence heatmap marking the zones it judges most safely traversable.",
    ],
    figure: { images: ["/vision1.png", "/vision2.png"], caption: "The system running on a live indoor scene: the model's traversability confidence heatmap (warm = judged safe to traverse), and the predicted ground-plane mask split into scored regions with the chosen steering direction drawn as a line — both resolving to a single heading (70°)." },
    links: [
      { label: "View code", href: "https://github.com/virginiaceccatelli/vision_control" },
    ],
  },
  {
    num: "05",
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
    num: "06",
    title: "Link-State Routing Protocol Simulation",
    short: "Link-State Routing",
    status: "COMP 535 · McGill · 2026",
    tags: ["Networking", "Distributed Systems", "Java", "Dijkstra"],
    body: [
      "A from-scratch implementation of a link-state routing protocol in the style of OSPF, in which routers are separate processes that discover the network's topology and compute routes through it entirely on their own. Each router is launched independently and connects to its neighbours over TCP sockets; a HELLO handshake brings a link up to a two-way state, at which point the two routers consider themselves adjacent.",
      "Once adjacencies form, every router describes its local links in a Link-State Advertisement and floods it to the whole network. Each advertisement carries a sequence number, so a router accepts an update only if it is newer than what it already holds, and it re-floods to all neighbours except the one it heard from. By doing this, the fresh topology information propagate everywhere while old data is ignored and infinite loops are avoided. Each router assembles these advertisements into its own link-state database and runs Dijkstra's algorithm over it to compute, and report on demand, the shortest path and cumulative weight to any destination in the topology.",
    ],
    links: [
      { label: "View code", href: "https://github.com/virginiaceccatelli/computer-networks" },
    ],
  },
  {
    num: "07",
    title: "Reliable Multicast File Transfer",
    short: "Multicast Transfer",
    status: "COMP 535 · McGill · 2026",
    tags: ["Networking", "Multicast", "C", "Reliability"],
    body: [
      "A system, written in C, for sending a file reliably to many receivers at once over IP multicast — the challenge being that multicast is inherently unreliable and connectionless, so there is no built-in guarantee that any given packet arrives. The sender breaks a file into numbered data chunks and streams them to the whole multicast group in a single transmission, rather than opening a separate connection to each receiver, so one send reaches an arbitrary number of listeners.",
      "A small protocol of five packet types is defined: file definition, data chunk, retransmission request, end-of-file, and retransmission-complete acknowledgement. Each receiver tracks which numbered chunks it has seen, detects gaps left by lost packets, and requests exactly those missing chunks. The sender re-multicasts them, and the end-of-file and acknowledgement packets let every receiver confirm it has reconstructed the complete file correctly before the transfer is considered done.",
    ],
    links: [
      { label: "View code", href: "https://github.com/virginiaceccatelli/multicast-file-sharing" },
    ],
  },
  {
    num: "08",
    title: "Cisco SOHO Network Simulation",
    short: "Cisco SOHO Network",
    status: "2024",
    tags: ["Cisco", "Subnetting", "VLANs", "Routing"],
    body: [
      "The design and configuration of a small-office / home-office network in Cisco Packet Tracer. A single ISP-assigned Class C block serves three departments, namely Admin/IT, Finance/HR, and Customer Service. These must each sit on their own isolated segment yet still be able to reach one another, all on one router and one switch.",
      "The computed subnets are mapped onto separate VLANs so departments are logically isolated, each with its own wireless network, DHCP hands out addresses automatically to hosts, and inter-VLAN routing on the router lets the segments communicate where needed. This was an exercise in subnetting, VLAN configuration, and routing table management.",
    ],
    links: [
      { label: "View code", href: "https://github.com/virginiaceccatelli/Cisco-Packet-Tracer-Projects" },
    ],
  },
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
        size="clamp(3.5rem, 15vw, 13rem)"
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Doodle art="computer" width={wide ? "min(30vw, 420px)" : "min(72vw, 300px)"} parallax={7} />
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
            <span className="mono" style={{ flexShrink: 0, fontSize: "0.6rem" }}>{project.status}</span>
          </div>

          {project.body.length > 0 && (
            <div style={{ margin: "1.75rem 0 0", maxWidth: "74ch" }}>
              {project.body.map((para, i) => (
                <p key={i} className="body-text" style={{ color: "var(--muted)", margin: "0 0 1.1rem 0" }}>{para}</p>
              ))}
            </div>
          )}

          {project.figure?.images && (
            <figure style={{ margin: "2rem 0 0", maxWidth: project.figure.images.length > 1 ? "1000px" : "780px" }}>
              <div style={{ display: "grid", gridTemplateColumns: project.figure.images.length > 1 ? "repeat(auto-fit, minmax(280px, 1fr))" : "1fr", gap: "0.75rem" }}>
                {project.figure.images.map(src => (
                  <img
                    key={src}
                    src={src}
                    alt={project.figure.caption}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block", border: "1px solid var(--rule)" }}
                  />
                ))}
              </div>
              <figcaption className="mono" style={{ margin: "0.9rem 0 0", fontSize: "0.56rem", lineHeight: 1.8, maxWidth: "80ch", textTransform: "none", letterSpacing: "0.04em" }}>
                {project.figure.caption}
              </figcaption>
            </figure>
          )}

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
