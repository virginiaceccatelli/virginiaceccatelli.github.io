import { Github, ExternalLink, Code, Brain, Network, Mic, Newspaper } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const THEME = {
  surface: "bg-transparent",
  surfaceBorder: "border-black/20",
  surfaceHover: "hover:bg-black hover:text-[#f4f1ea]",
  transition: "transition-all duration-300",
};

const GITHUB = "https://github.com/virginiaceccatelli";

export default function Projects() {
  const projects = [
    {
      title: "SpeechJBB: Code-Switched Speech Safety Evaluation",
      blurb: "Audio jailbreak benchmark probing safety alignment and comprehension in large audio language models under code-switched and perturbed multilingual speech.",
      tags: ["AI Safety", "LALMs", "Speech", "Code-Switching"],
      repo: null,
      demo: "https://arxiv.org/abs/2606.06037",
      icon: Mic,
      color: "text-zinc-400",
    },
    {
      title: "MS-VoxNews Dataset",
      blurb: "Multilingual corpus for joint summarization and translation of long-form spoken news in low-resource languages.",
      tags: ["Dataset", "Speech", "Summarization", "Translation"],
      repo: null,
      demo: "https://huggingface.co/datasets/McGill-NLP/speech-translation-and-summarization",
      icon: Newspaper,
      color: "text-zinc-400",
    },
    {
      title: "Trajectory-Based Uncertainty Quantification for LMs",
      blurb: "Research framework combining mechanistic interpretability with residual-stream geometry to anticipate uncertainty and hallucinations before generation.",
      tags: ["Mechanistic Interpretability", "Uncertainty", "LLMs"],
      repo: null,
      demo: "",
      icon: Brain,
      color: "text-zinc-400",
    },
    {
      title: "Reinforcement-Learning Data Preprocessing Pipeline Automation",
      blurb: "RL-driven data quality checks: outlier detection, imputation, and financial validity rules.",
      tags: ["RL", "Pandas", "Sklearn"],
      repo: null,
      demo: "",
      icon: Brain,
      color: "text-zinc-400",
    },
    {
      title: "Robotic Ground Segmentation and Motion Decision",
      blurb: "Robotic empty space detection and CNN direction generation for robot navigation.",
      tags: ["Pytorch", "TorchScript", "OpenCV"],
      repo: "https://github.com/virginiaceccatelli/vision_control",
      demo: "",
      icon: Code,
      color: "text-zinc-400",
    },
    {
      title: "Cisco SOHO Network Simulation",
      blurb: "Small Office, Home Office Network Configuration on Cisco Packet Tracer Platform.",
      tags: ["Cisco", "Subnetting", "Routing"],
      repo: "https://github.com/virginiaceccatelli/Cisco-Packet-Tracer-Projects",
      demo: "",
      icon: Network,
      color: "text-zinc-400",
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="mx-auto space-y-12">
        {/* Header */}
        <div className="grid border-y border-black/20 py-6 md:grid-cols-[0.65fr_1.35fr]">
          <div className="mb-5 md:mb-0">
            <p className="section-kicker">Selected Work</p>
          </div>
          <div className="space-y-5">
          <h1 className="editorial-title text-6xl md:text-8xl lg:text-9xl">
            My Projects
          </h1>
          <p className="max-w-3xl text-2xl font-semibold leading-tight text-neutral-700 md:text-4xl">
            A collection of my recent work in AI safety, robotics, data systems, and network security
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-b border-black text-sm font-semibold uppercase tracking-[0.14em] text-neutral-950 transition-colors hover:text-neutral-600"
          >
            <Github className="h-4 w-4" />
            See more on GitHub
          </a>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid border-l border-t border-black/20 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, idx) => (
            <Card
              key={idx}
              className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.surfaceHover} ${THEME.transition} group min-h-[360px] border-0 border-b border-r p-0`}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-black/20 p-5">
                  <span className="text-5xl font-black leading-none">0{idx + 1}</span>
                  <project.icon className="h-6 w-6" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-5 text-3xl font-black uppercase leading-none transition-colors">
                    {project.title}
                  </h3>
              
                  <p className="mb-5 leading-relaxed text-neutral-700 group-hover:text-[#f4f1ea]">{project.blurb}</p>
              
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs group-hover:border-[#f4f1ea]/40 group-hover:text-[#f4f1ea]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
              
                  <div className="mt-auto flex gap-3 pt-2">
                    {project.repo && (
                      <Button asChild variant="outline" size="sm">
                        <a href={project.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button asChild size="sm">
                        <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
