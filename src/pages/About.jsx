import { GraduationCap, Award, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const THEME = {
  surface: "bg-zinc-800/50 backdrop-blur-sm",
  surfaceBorder: "border-zinc-700/50",
  surfaceHover: "hover:bg-zinc-700/30",
  transition: "transition-all duration-300",
  accentStrong: "text-zinc-200",
  accent: "text-zinc-300",
  accentMuted: "text-zinc-400",
};

export default function About() {
  const achievements = [
    { icon: Award, text: "Computer Science Major, Economics Minor" },
    { icon: Award, text: "Dean's List, top 10% - IE University" },
    { icon: Users, text: "Girls Who Code Python Instructor" },
    { icon: Users, text: "Girls Who Code VP Internal - McGill" },
    { icon: Users, text: "Member of Women In Tech Club - McGill" },
    { icon: BookOpen, text: "Andalus Committee NYC Researcher" },
  ];

  const courseHighlights = [
    "Operating Systems",
    "Programming Languages and Paradigms",
    "Probability & Statistics",
    "Financial Instruments & Institutions",
    "Applied Machine Learning (Graduate)",
    "Computer Networks (Graduate)",
    "Compiler Design (Graduate)",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent leading-tight pb-1">
            About Me
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Computer Science student passionate about cybersecurity, AI governance, and emerging technologies
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* About Text */}
          <Card className={`lg:col-span-2 ${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-zinc-200" />
                Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                I'm a Computer Science student with a strong interest in cybersecurity, computer networks,
                and AI governance. Originally trained in International Relations at IE University, I developed a strong interest in
                the societal dimensions of technology, particularly how global events intersect with
                cybersecurity threats. This curiosity led me to shift focus and pursue a BA in Computer
                Science with a Minor in Economics at McGill University, where I've been able to explore the
                technical underpinnings of cybersecurity, machine learning, and systems programming.
              </p>
              <p>
                The decision to pivot was not only academic, but it was a personal commitment to
                developing the skills needed to address the security challenges that come with emerging
                technologies and a quickly changing digital landscape.
              </p>
              <p>
                I applied statistical modeling and data analysis to examine links between spikes in ransomware
                attacks originating from North Korea, China, Russia, and Iran, and political elections in the
                West. More recently, I led the development of a Reinforcement Learning Algorithm to automate data cleaning, improving the accuracy and
                completeness of financial datasets, and reducing manual preprocessing time. I also designed a ground segmentation and motion
                planning system for hospital robots at the McGill Prometheus Lab.
              </p>
              <p>
                Currently, I'm working as an AI Safety Researcher at MILA Quebec AI Institute, investigating
                audio-based jailbreaking vulnerabilities in multilingual voice-enabled LLM systems, exploring how code-switching
                attack vectors can bypass safety guardrails in speech-to-text pipelines.
              </p>
              <p>
                I'm eager to develop my skills and gain more experience in the field of cybersecurity and AI safety. I bring a deep motivation to understand emerging security
                threats and make technology more secure, equitable, and intelligent.
              </p>
              </div>
            </CardContent>
          </Card>

          {/* At a Glance */}
          <div className="space-y-6">
            <Card className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border`}>
              <CardHeader>
                <CardTitle>At a Glance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                      <item.icon className="h-4 w-4 text-zinc-300 mt-0.5 flex-shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border`}>
              <CardHeader>
                <CardTitle>Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-zinc-200 mb-2">3.7 GPA</div>
                  <p className="text-sm text-zinc-400 mb-4">McGill University</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-zinc-300 mb-2">Course Highlights:</p>
                    {courseHighlights.map((course, idx) => (
                      <Badge key={idx} variant="outline" className="block w-full text-left px-3 py-2 mb-2">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
