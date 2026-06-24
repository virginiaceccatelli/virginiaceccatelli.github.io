import { GraduationCap, Award, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const THEME = {
  surface: "bg-transparent",
  surfaceBorder: "border-black/20",
  surfaceHover: "hover:bg-black hover:text-[#f4f1ea]",
  transition: "transition-all duration-300",
  accentStrong: "text-neutral-950",
  accent: "text-neutral-700",
  accentMuted: "text-neutral-600",
};

export default function About() {
  const achievements = [
    { icon: Award, text: "Computer Science Major, Economics Minor" },
    { icon: Award, text: "Distinction, top 25% - McGill University" },
    { icon: Award, text: "Dean's List, top 10% - IE University" },
    { icon: Users, text: "Former Vice President - Girls Who Code McGill" },
    { icon: BookOpen, text: "Former Andalus Committee NYC Researcher" },
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
    <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="mx-auto space-y-10">
        {/* Header */}
        <div className="grid border-y border-black/20 py-6 md:grid-cols-[0.65fr_1.35fr]">
          <p className="section-kicker mb-4 md:mb-0">Profile / Background</p>
          <div className="space-y-5">
          <h1 className="editorial-title text-6xl md:text-8xl lg:text-9xl">
            About Me
          </h1>
          <p className="max-w-4xl text-2xl font-semibold leading-tight text-neutral-700 md:text-4xl">
            McGill Computer Science alum working across AI safety, systems security, and cybersecurity policy
          </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          {/* About Text */}
          <Card className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border p-0`}>
            <CardHeader className="border-b border-black/20">
              <CardTitle className="flex items-center gap-3 text-2xl uppercase">
                <GraduationCap className="h-6 w-6 text-neutral-950" />
                Background
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-10">
              <div className="space-y-6 text-xl leading-relaxed text-neutral-800">
              <p>
                I'm a McGill University Computer Science alum with a strong interest in AI safety,
                systems security, and cybersecurity policy. Originally trained in International Relations at IE University, I developed a strong interest in
                the societal dimensions of technology, particularly how global events intersect with
                cybersecurity threats. This curiosity led me to shift focus and complete a BA in Computer
                Science with a Minor in Economics at McGill University, where I've been able to explore the
                technical underpinnings of machine learning, networks, compiler design, and systems programming.
              </p>
              <p>
                The decision to pivot was a personal commitment to
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
                Premium Cloud as a Machine Learning Intern focused on cloud-native infrastructure for LLM workloads.
              </p>
              <p>
                I'm eager to develop my skills and gain more experience in the field of cybersecurity and AI safety. I bring a deep motivation to understand emerging security
                threats and make technology more secure, equitable, and reliable.
              </p>
              </div>
            </CardContent>
          </Card>

          {/* At a Glance */}
          <div className="grid border-x border-b border-black/20 lg:border-l-0">
            <Card className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border-0 border-b`}>
              <CardHeader className="border-b border-black/20">
                <CardTitle className="uppercase">At a Glance</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  {achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 border-b border-black/15 p-4 text-sm text-neutral-800 last:border-b-0">
                      <item.icon className="h-4 w-4 text-neutral-950 mt-0.5 flex-shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border-0`}>
              <CardHeader className="border-b border-black/20">
                <CardTitle className="uppercase">Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-2">
                  <div className="mb-2 text-6xl font-black uppercase leading-none text-neutral-950">3.8 GPA</div>
                  <p className="text-sm text-neutral-600 mb-4">McGill University, Distinction</p>
                  <div className="space-y-2">
                    <p className="section-kicker mb-2">Course Highlights:</p>
                    {courseHighlights.map((course, idx) => (
                      <Badge key={idx} variant="outline" className="block w-full px-3 py-2 text-left">
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
