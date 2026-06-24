import { FileText, ExternalLink } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const THEME = {
  surface: "bg-transparent",
  surfaceBorder: "border-black/20",
  surfaceHover: "hover:bg-black hover:text-[#f4f1ea]",
  transition: "transition-all duration-300",
};

export default function Writing() {
  const writings = [
    {
      title: "SpeechJBB: Probing Safety Alignment and Comprehension in Large Audio Language Models under Code-Switched Speech",
      description: "Introduces an audio-based code-switching jailbreak dataset for multilingual speech safety evaluation, showing how code-switched and perturbed multilingual speech can expose weaknesses in large audio language model safety alignment.",
      tags: ["AI Safety", "Speech", "Code-Switching", "LALMs"],
      year: "2026",
      type: "Preprint",
      link: "https://arxiv.org/abs/2606.06037",
      icon: FileText,
      color: "text-zinc-400",
    },
    {
      title: "Sky Diplomacy: The Geopolitical Impact of the Proliferation of Iranian-Russian Military Drone Trade on Global Alliances and Security",
      description: "Focusing on the historical context of Iranian trade with Russia and China, as well as recent developments, the study analyzes how armed UAV drones are contributing to the shifting world order, wherein Russia and China are increasingly taking on a leading role, and how this is impacting the West from various points of view.",
      tags: ["UAV", "Policy", "Security"],
      year: "2024",
      type: "Article",
      link: "https://ipr.blogs.ie.edu/wp-content/uploads/sites/574/2024/02/Sky-Diplomacy-Final-Draft.docx-1.pdf",
      icon: FileText,
      color: "text-zinc-400",
    },
    {
      title: "CNN Robotic Vision for Ground Segmentation - U-Net Applicability",
      description: "This project implements a model that performs ground segmentation using a U-Net model and determines a robot's directional movement decision based on obstacle-free zones. This approach is purely vision-based, portable, and computationally lightweight - it might be useful for prototyping computer vision for robotic navigation on simple laptops.",
      tags: ["Robotics", "Computer Vision", "Convolutional Neural Networks"],
      year: "2025",
      type: "Research Paper",
      link: "https://github.com/virginiaceccatelli/vision_control",
      icon: FileText,
      color: "text-zinc-400",
    },
    {
      title: "Securing the Digital Frontier: U.S.-Sub-Saharan Africa Cybersecurity Partnerships in the Shadow of China’s Digital Silk Road",
      description: "This policy report, released by the Andalus Committee's New York Office, examines the United States' opportunities to strengthen cybersecurity cooperation with Kenya and Ethiopia as both nations navigate rapid digital transformation in East Africa.",
      tags: ["Policy", "Cybersecurity", "Digital Silk Road"],
      year: "2025",
      type: "Policy Report",
      link: "https://65bead61-ada5-408e-9924-c7be6e498634.filesusr.com/ugd/d98a02_77af6c01d90f4c0f8e7df233cab6cd35.pdf",
      icon: FileText,
      color: "text-zinc-400",
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="mx-auto space-y-12">
        {/* Header */}
        <div className="grid border-y border-black/20 py-6 md:grid-cols-[0.65fr_1.35fr]">
          <p className="section-kicker mb-5 md:mb-0">Papers / Articles</p>
          <div className="space-y-5">
          <h1 className="editorial-title text-6xl md:text-8xl lg:text-9xl">
            Papers & Articles
          </h1>
          <p className="max-w-3xl text-2xl font-semibold leading-tight text-neutral-700 md:text-4xl">
            Research papers, articles, and technical writing
          </p>
          </div>
        </div>

        {/* Writings Grid */}
        <div className="border-x border-t border-black/20">
          {writings.map((writing, idx) => (
            <Card
              key={idx}
              className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.surfaceHover} ${THEME.transition} group border-0 border-b`}
            >
              <div className="grid md:grid-cols-[0.22fr_0.78fr]">
                <div className="flex items-start justify-between border-b border-black/20 p-5 md:block md:border-b-0 md:border-r">
                  <span className="text-5xl font-black leading-none">0{idx + 1}</span>
                  <writing.icon className="mt-4 h-6 w-6" />
                </div>
                <div className="p-5 md:p-8">
                  <h3 className="mb-5 text-3xl font-black uppercase leading-none transition-colors md:text-5xl">
                    {writing.title}
                  </h3>
                  <p className="mb-5 max-w-4xl text-lg leading-relaxed text-neutral-700 group-hover:text-[#f4f1ea]">{writing.description}</p>
                  
                  <div className="mb-5 flex flex-wrap gap-2">
                    {writing.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs group-hover:border-[#f4f1ea]/40 group-hover:text-[#f4f1ea]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="section-kicker">
                      {writing.year} • {writing.type}
                    </div>
                    <a
                      href={writing.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 border-b border-current text-sm font-semibold uppercase tracking-[0.14em] transition-colors"
                    >
                      <span>Read</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
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
