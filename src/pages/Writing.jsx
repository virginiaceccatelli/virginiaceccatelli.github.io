import { FileText, ExternalLink } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const THEME = {
  surface: "bg-zinc-800/50 backdrop-blur-sm",
  surfaceBorder: "border-zinc-700/50",
  surfaceHover: "hover:bg-zinc-700/30",
  transition: "transition-all duration-300",
};

export default function Writing() {
  const writings = [
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
      link: "https://65bead61-ada5-408e-9924-c7be6e498634.filesusr.com/ugd/d98a02_77af6c01d90f4c0f8e7df233cab6cd35.pdf",
      icon: FileText,
      color: "text-zinc-400",
    },
    {
      title: "Securing the Digital Frontier: U.S.-Sub-Saharan Africa Cybersecurity Partnerships in the Shadow of China’s Digital Silk Road",
      description: "This policy report, released by the Andalus Committee's New York Office, examines the United States' opportunities to strengthen cybersecurity cooperation with Kenya and Ethiopia as both nations navigate rapid digital transformation in East Africa.",
      tags: ["Policy", "Cybersecurity"],
      year: "2025",
      type: "Policy Report",
      link: "https://65bead61-ada5-408e-9924-c7be6e498634.filesusr.com/ugd/d98a02_77af6c01d90f4c0f8e7df233cab6cd35.pdf",
      icon: FileText,
      color: "text-zinc-400",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-100 to-rose-100 bg-clip-text text-transparent leading-tight pb-1">
            Papers & Articles
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Research papers, articles, and technical writing
          </p>
        </div>

        {/* Writings Grid */}
        <div className="space-y-6">
          {writings.map((writing, idx) => (
            <Card
              key={idx}
              className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.surfaceHover} ${THEME.transition} border p-6 md:p-8 group`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-zinc-800/50 ${writing.color}`}>
                  <writing.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-zinc-200 transition-colors">
                    {writing.title}
                  </h3>
                  <p className="text-zinc-300 mb-4 leading-relaxed">{writing.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {writing.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-zinc-400">
                      {writing.year} • {writing.type}
                    </div>
                    <a
                      href={writing.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-zinc-200 hover:text-zinc-300 transition-colors"
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
