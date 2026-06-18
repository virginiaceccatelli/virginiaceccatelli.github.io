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
    { icon: Award, text: "Distinction, top 25% - McGill University" },
    { icon: Award, text: "Dean's List, top 10% - IE University" },
    { icon: Users, text: "Vice President - Girls Who Code McGill" },
    { icon: Users, text: "50+ volunteer instructors recruited" },
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
            Computer Science student working across AI safety, systems security, and cybersecurity policy
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
                I'm a Computer Science student with a strong interest in AI safety, systems security,
                and cybersecurity policy. Originally trained in International Relations at IE University, I developed a strong interest in
                the societal dimensions of technology, particularly how global events intersect with
                cybersecurity threats. This curiosity led me to shift focus and pursue a BA in Computer
                Science with a Minor in Economics at McGill University, where I've been able to explore the
                technical underpinnings of machine learning, networks, compiler design, and systems programming.
              </p>
              <p>
                The decision to pivot was not only academic, but it was a personal commitment to
                developing the skills needed to address the security challenges that come with emerging
                technologies and a quickly changing digital landscape.
              </p>
              <p>
                My research has moved between technical security and policy questions: I studied ransomware
                activity around elections, developed a vision-based ground segmentation and motion-planning
                pipeline for autonomous indoor navigation, and contributed to multilingual speech safety work
                at MILA, including SpeechJBB and the MS-VoxNews dataset.
              </p>
              <p>
                Currently, I'm working with UCL S2Lab on trajectory-based uncertainty quantification for
                language models, combining mechanistic interpretability with residual-stream geometry to
                anticipate uncertainty and hallucinations before output generation. I am also joining WIIT
                Premium Cloud as a Machine Learning Intern focused on cloud-native infrastructure for large
                language model workloads.
              </p>
              <p>
                I'm eager to develop my skills and gain more experience in the field of cybersecurity and AI safety. I bring a deep motivation to understand emerging security
                threats and make technology more secure, equitable, and reliable.
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
                  <div className="text-3xl font-bold text-zinc-200 mb-2">3.76 GPA</div>
                  <p className="text-sm text-zinc-400 mb-4">McGill University, Distinction</p>
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
