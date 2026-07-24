import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "../components/fx/SplitText";

const GITHUB = "https://github.com/virginiaceccatelli";

// Projects are sourced from public repositories and published work. Entries
// without a public source are intentionally omitted; per request, Semantic
// Flow is listed without description while the work is ongoing.
const projects = [
  {
    num: "01",
    title: "SpeechJBB: Code-Switched Speech Safety Evaluation",
    status: "EMNLP 2026 · Mila",
    tags: ["AI Safety", "LALMs", "Speech", "Code-Switching"],
    body: [
      "SpeechJBB is the first audio-based code-switching jailbreak benchmark for evaluating the safety alignment of large audio language models (LALMs). It asks a simple question with uncomfortable answers: do models that look well-aligned on monolingual, text-based prompts stay safe when the same harmful request is spoken as speech that mixes languages within a single utterance — a pattern natural to multilingual speakers, yet almost absent from safety training?",
      "Across state-of-the-art LALMs, non-English code-switched speech raised mean jailbreak success by 28% and reduced refusals by 14.4% relative to monolingual speech. A further attack inserts phonologically plausible pseudo-words around sensitive terms; this natural-sounding obfuscation increased jailbreak success by an additional 34%. The findings show that alignment tuned largely on English text leaves systematic vulnerabilities in multilingual and spoken settings.",
    ],
    figure: { images: ["/mila.png"], caption: "Jailbreak success rate across large audio language models (rows) and monolingual and code-switched language conditions (columns)." },
    links: [
      { label: "Read paper", href: "https://arxiv.org/abs/2606.06037" },
      { label: "View code", href: "https://github.com/virginiaceccatelli/MILA_safety" },
    ],
  },
  // {
  //   num: "02",
  //   title: "VoxSumm: Multilingual Corpus for Summarization & Translation",
  //   status: "Submitted, ACL ARR 2027 · Mila",
  //   tags: ["Dataset", "Speech", "Summarization", "Translation"],
  //   body: [
  //     "VoxSumm is a multilingual corpus for jointly summarizing and translating long-form spoken news in low-resource languages, built in collaboration with Google DeepMind. It pairs long spoken-news recordings with reference summaries and translations, so that speech and language models can be trained and evaluated on a harder, more realistic task than the usual benchmarks allow — condensing and translating speech at length, rather than transcribing short, clean, English-only clips.",
  //     "The corpus is designed around languages that current speech systems serve poorly, making it a resource for measuring how well models generalize beyond high-resource settings. Built with Y. Jeon, M. Maltais, M. Ma, and D. I. Adelani.",
  //   ],
  //   links: [
  //     { label: "View dataset", href: "https://huggingface.co/datasets/McGill-NLP/speech-translation-and-summarization" },
  //   ],
  // },
  {
    num: "03",
    title: "Semantic Flow: Tracing Semantic State in Code Models",
    status: "Ongoing · UCL S2Lab",
    tags: ["Interpretability", "Program Analysis", "Code Models"],
    body: [
      "Semantic Flow asks whether code language models internally represent the meaning of a program — which definition a name refers to, where a value flows, what controls its execution, and whether it is tainted — or only its surface text. To test this, it generates small Python programs whose semantic structure is known exactly by construction, runs a frozen code model over them, and trains low-capacity linear probes on the saved hidden states to check whether relations like binding, data flow, control dependence, and security taint are linearly decodable — with controls that rule out shortcuts from surface form alone. It further studies how that internal structure holds up as context grows and as code is rewritten while its meaning is held fixed, and whether the model causally relies on these representations, using activation patching.",
    ],
    links: [
      { label: "View repository", href: "https://github.com/virginiaceccatelli/semantic-flow" },
    ],
  },
  {
    num: "04",
    title: "Robotic Ground Segmentation & Motion Decision",
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
    status: "COMP 520 · McGill · 2026",
    tags: ["Compilers", "Parsing", "Code Generation", "MIPS"],
    body: [
      "An end-to-end optimizing compiler that translates a high-level, object-oriented source language all the way down to runnable MIPS assembly. It implements the full pipeline: a lexer that turns source text into tokens, a parser that builds an abstract syntax tree, semantic analysis and type checking over that tree, and code generation, followed by register allocation and instruction-level optimization of the emitted code.",
      "Beyond the core pipeline, it supports object-oriented features and automatic memory management through garbage collection, so the compiler handles real programs — objects, methods, and dynamic allocation — rather than toy arithmetic, and produces assembly that runs correctly on a MIPS target.",
    ],
    links: [],
  },
  {
    num: "06",
    title: "Link-State Routing Protocol Simulation",
    status: "COMP 535 · McGill · 2026",
    tags: ["Networking", "Distributed Systems", "Java", "Dijkstra"],
    body: [
      "A from-scratch implementation of a link-state routing protocol in the style of OSPF, in which routers are separate processes that discover the network's topology and compute routes through it entirely on their own. Each router is launched independently and connects to its neighbours over TCP sockets; a HELLO handshake brings a link up to a two-way state, at which point the two routers consider themselves adjacent.",
      "Once adjacencies form, every router describes its local links in a Link-State Advertisement and floods it to the whole network. Each advertisement carries a sequence number, so a router accepts an update only if it is newer than what it already holds, and it re-floods to all neighbours except the one it heard from — this is what lets fresh topology information propagate everywhere while old data is ignored and infinite loops are avoided. Each router assembles these advertisements into its own link-state database and runs Dijkstra's algorithm over it to compute, and report on demand, the shortest path and cumulative weight to any destination in the topology.",
    ],
    links: [
      { label: "View code", href: "https://github.com/virginiaceccatelli/computer-networks" },
    ],
  },
  {
    num: "07",
    title: "Reliable Multicast File Transfer",
    status: "COMP 535 · McGill · 2026",
    tags: ["Networking", "Multicast", "C", "Reliability"],
    body: [
      "A system, written in C, for sending a file reliably to many receivers at once over IP multicast — the challenge being that multicast is inherently unreliable and connectionless, so there is no built-in guarantee that any given packet arrives. The sender breaks a file into numbered data chunks and streams them to the whole multicast group in a single transmission, rather than opening a separate connection to each receiver, so one send reaches an arbitrary number of listeners.",
      "Reliability is layered on top through a small protocol of five packet types — file definition, data chunk, retransmission request, end-of-file, and retransmission-complete acknowledgement. Each receiver tracks which numbered chunks it has seen, detects gaps left by lost packets, and requests exactly those missing chunks; the sender re-multicasts them, and the end-of-file and acknowledgement packets let every receiver confirm it has reconstructed the complete file correctly before the transfer is considered done.",
    ],
    links: [
      { label: "View code", href: "https://github.com/virginiaceccatelli/multicast-file-sharing" },
    ],
  },
  {
    num: "08",
    title: "Cisco SOHO Network Simulation",
    status: "2024",
    tags: ["Cisco", "Subnetting", "VLANs", "Routing"],
    body: [
      "The design and configuration of a small-office / home-office network in Cisco Packet Tracer, built to a realistic brief: a single ISP-assigned Class C block (192.168.1.0) has to serve three departments — Admin/IT, Finance/HR, and Customer Service — that must each sit on their own isolated segment yet still be able to reach one another, all on one router and one switch.",
      "The work starts from the subnetting maths: borrowing two host bits to carve the block into equal subnets, then laying out the network, broadcast, and usable host ranges for each department. Those subnets are mapped onto separate VLANs so departments are logically isolated, each with its own wireless network, DHCP hands out addresses automatically to hosts, and inter-VLAN routing on the router lets the segments communicate where needed — a compact but complete illustration of subnetting, VLAN segmentation, and routing working together.",
    ],
    links: [
      { label: "View code", href: "https://github.com/virginiaceccatelli/Cisco-Packet-Tracer-Projects" },
    ],
  },
];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div style={{ background: "transparent", paddingTop: "56px" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem" }}>

        <div style={{ padding: "6rem 0 5rem", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
          <Reveal><p className="kicker" style={{ marginBottom: "1.5rem" }}>Selected Work</p></Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}>
            <SplitText
              text="Projects"
              tag="h1"
              trigger="load"
              delay={0.1}
              stagger={0.045}
              duration={1.3}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 11vw, 10rem)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0 }}
            />
            <Reveal delay={0.15}>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="kicker link-underline" style={{ color: "#7c7068", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")} onMouseLeave={e => (e.currentTarget.style.color = "#7c7068")}>
                See more on GitHub →
              </a>
            </Reveal>
          </div>
        </div>

        <div>
          {projects.map((project, i) => <ProjectEntry key={project.num} project={project} delay={Math.min(i * 0.05, 0.2)} />)}
          <div style={{ height: "1px", background: "rgba(26,26,26,0.1)" }} />
        </div>

        <div style={{ height: "5rem" }} />
      </div>
    </div>
  );
}

function ProjectEntry({ project, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ borderTop: "1px solid rgba(26,26,26,0.1)", padding: "3.5rem 0", display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "0" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "2rem", alignItems: "start" }}>
        <span className="kicker" style={{ paddingTop: "0.55rem" }}>{project.num}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem 2rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3.4vw, 2.7rem)", fontWeight: 300, lineHeight: 1.1, color: "#1a1a1a", margin: 0, maxWidth: "22ch" }}>{project.title}</h2>
            <span className="kicker" style={{ flexShrink: 0 }}>{project.status}</span>
          </div>

          {project.body.length > 0 && (
            <div style={{ margin: "1.75rem 0 0", maxWidth: "72ch" }}>
              {project.body.map((para, i) => (
                <p key={i} style={{ fontFamily: "'Faustina', serif", fontSize: "clamp(0.98rem, 1.4vw, 1.08rem)", lineHeight: 1.8, color: "#3a3530", margin: "0 0 1.1rem 0" }}>{para}</p>
              ))}
            </div>
          )}

          {project.figure && (
            <figure style={{ margin: "2rem 0 0", maxWidth: project.figure.images?.length > 1 ? "960px" : "760px" }}>
              {project.figure.images ? (
                <div style={{ display: "grid", gridTemplateColumns: project.figure.images.length > 1 ? "repeat(auto-fit, minmax(280px, 1fr))" : "1fr", gap: "0.75rem" }}>
                  {project.figure.images.map(src => (
                    <img key={src} src={src} alt={project.figure.caption} loading="lazy" style={{ width: "100%", height: "auto", display: "block", border: "1px solid rgba(26,26,26,0.18)", background: "#faf8f4" }} />
                  ))}
                </div>
              ) : (
                <div style={{
                  border: "1px solid rgba(26,26,26,0.18)",
                  aspectRatio: "16 / 8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(26,26,26,0.015)",
                }}>
                  <span className="kicker" style={{ color: "rgba(26,26,26,0.32)" }}>{project.figure.label} — to be added</span>
                </div>
              )}
              <figcaption style={{ fontFamily: "'Faustina', serif", fontSize: "0.82rem", fontStyle: "italic", lineHeight: 1.6, color: "#7c7068", margin: "0.85rem 0 0", maxWidth: "70ch" }}>
                {project.figure.caption}
              </figcaption>
            </figure>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1.75rem 0 0" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{ fontFamily: "'Faustina', serif", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(26,26,26,0.18)", padding: "0.3rem 0.65rem", color: "#7c7068" }}>{tag}</span>
            ))}
          </div>

          {project.links?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", margin: "1.75rem 0 0" }}>
              {project.links.map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="kicker link-underline" style={{ color: "#1a1a1a", textDecoration: "none" }}>
                  {l.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
