import { Github, ExternalLink, Code, Brain, Network } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const THEME = {
  surface: "bg-zinc-800/50 backdrop-blur-sm",
  surfaceBorder: "border-zinc-700/50",
  surfaceHover: "hover:bg-zinc-700/30",
  transition: "transition-all duration-300",
};

const GITHUB = "https://github.com/virginiaceccatelli";

export default function Projects() {
  const projects = [
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-100 to-rose-100 bg-clip-text text-transparent leading-tight pb-1">
            My Projects
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A collection of my recent work in AI, robotics, and network security
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-200 hover:text-zinc-300 transition-colors underline underline-offset-4"
          >
            <Github className="h-4 w-4" />
            See more on GitHub
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <Card
              key={idx}
              className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.surfaceHover} ${THEME.transition} border p-6 group`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-zinc-800/50 ${project.color}`}>
                  <project.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-zinc-300 mb-4 leading-relaxed">{project.blurb}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-3 pt-2">
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
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
