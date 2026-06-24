import { Briefcase, GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const THEME = {
  surface: "bg-transparent",
  surfaceBorder: "border-black/20",
  surfaceHover: "hover:bg-black hover:text-[#f4f1ea]",
  transition: "transition-all duration-300",
};

export default function Experience() {
  const experiences = [
    {
      type: "work",
      title: "Machine Learning Intern",
      company: "WIIT - The Premium Cloud",
      location: "Dusseldorf, Germany",
      period: "July 2026 - Current",
      description: [
        "Leading development and deployment of a cloud-native cluster for large language model workloads",
      ],
      tags: ["Machine Learning", "LLM Infrastructure", "Cloud Native", "Deployment"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
    {
      type: "work",
      title: "Systems Security Researcher",
      company: "UCL S2Lab, Prof. Lorenzo Cavallaro",
      location: "London, UK",
      period: "June 2026 - Current",
      description: [
        "Developing a trajectory-based uncertainty quantification framework for language models",
        "Combining mechanistic interpretability with residual-stream geometry to anticipate uncertainty and hallucinations before output generation",
      ],
      tags: ["Systems Security", "AI Safety", "Mechanistic Interpretability", "Uncertainty Quantification"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
    {
      type: "work",
      title: "AI Safety Researcher – Audio Jailbreaking & Multilingual LLMs",
      company: "MILA Quebec AI Institute, Prof. David Adelani",
      location: "Montreal, Canada",
      period: "January 2026 - August 2026",
      description: [
        "Led SpeechJBB, an audio-based code-switching jailbreak dataset for multilingual speech safety evaluation",
        "Exposed weaknesses in large audio language model safety alignment under code-switched and perturbed multilingual speech",
        "Created the dataset for MS-VoxNews, a multilingual corpus for joint summarization and translation of long-form spoken news in low-resource languages",
      ],
      tags: ["AI Safety", "LALMs", "Code-Switching", "Dataset Creation"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
    {
      type: "work",
      title: "Researcher",
      company: "Andalus Committee (New York Office)",
      location: "New York, USA",
      period: "July 2025 - July 2026",
      description: [
        "Authored a policy paper on developing U.S.-Africa cybersecurity partnerships within the emerging Digital Silk Road",
        "Explored opportunities for Global North-South collaboration on cybersecurity and emerging technologies",
      ],
      tags: ["Research", "Policy", "Security"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
    {
      type: "work",
      title: "Vice President",
      company: "Girls Who Code",
      location: "Montreal, Canada",
      period: "August 2024 - May 2026",
      description: [
        "Directed internal operations for McGill's Girls Who Code chapter",
        "Developed a Python curriculum and recruited more than 50 volunteer instructors for weekly classes across Montreal high schools",
      ],
      tags: ["Teaching", "Python", "Mentoring"],
      icon: Briefcase,
      color: "text-zinc-300",
    },    
    {
      type: "work",
      title: "Robotic Vision Researcher",
      company: "McGill Prometheus Lab, Prof. Joseph Vybihal",
      location: "Montreal, Canada",
      period: "May 2025 - August 2025",
      description: [
        "Developed a real-time ground-segmentation and motion-planning system using a U-Net with a MobileNetV2 backbone",
        "Processed images, videos, and live webcam input for autonomous indoor navigation in hospital-like environments",
        "Engineered an RGB-only semantic-segmentation pipeline as a low-cost alternative to LIDAR-based navigation",
      ],
      tags: ["Computer Vision", "U-Net", "MobileNetV2", "Robotics", "Motion Planning"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
    {
      type: "work",
      title: "Financial Optimization Intern",
      company: "Wavestone",
      location: "Munich, Germany",
      period: "June 2024 - July 2024",
      description: [
        "Led development of a reinforcement-learning approach to automate data cleaning and reduce manual preprocessing",
        "Built a preprocessing pipeline to flag invalid cells, eliminate missing values, and improve dataset alignment with a reference solution",
        "Presented outcomes to actuarial leadership, focusing on measurable efficiency gains in financial data processing",
      ],
      tags: ["Reinforcement Learning", "Data Cleaning", "Finance", "Analytics"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
    {
      type: "work",
      title: "International Relations & Cybersecurity Researcher",
      company: "IE University, Prof. Karen Nershi",
      location: "Madrid, Spain",
      period: "February 2024 - May 2024",
      description: [
        "Analyzed ransomware activity patterns during election cycles linked to multiple state actors",
        "Produced a structured literature review on ransomware and cyber insurance, identifying gaps between research and policy frameworks",
      ],
      tags: ["Cybersecurity Research", "Ransomware", "Policy", "Quant Analysis"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
  ];  

  const education = [
    {
      institution: "McGill University",
      degree: "Bachelor's, Major in Computer Science; Minor in Economics",
      location: "Montreal, Canada",
      period: "2024 - 2026",
      gpa: "3.8 GPA, Distinction",
      highlights: [
        "Operating Systems",
        "Applied Machine Learning (Graduate)",
        "Computer Networks (Graduate)",
        "Compiler Design (Graduate)",
      ],
      icon: GraduationCap,
      color: "text-zinc-300",
    },
    {
      institution: "IE University",
      note: "Transferred to McGill after second year",
      degree: "Bachelor's, International Relations",
      location: "Madrid, Spain",
      period: "2022 - 2024",
      gpa: "9.02/10 GPA, Dean's List",
      highlights: [
        "Comparative Politics",
        "International Law",
        "Quantitative Methods",
        "International Political Economy",
        "Foreign Aid",
      ],
      icon: GraduationCap,
      color: "text-zinc-300",
    },
  ];  

  const certifications = [
    {
      title: "CompTIA Network+ (N10-009) Full Course",
      org: "Udemy / Dion Training Solutions",
      year: "2025",
      icon: Award,
      color: "text-zinc-300",
    },
    {
      title: "KPMG Data Analytics Virtual Internship",
      org: "Forage",
      year: "2023",
      icon: Award,
      color: "text-zinc-400",
    },
  ];

  const skills = {
    Languages: [
      { name: "Python", level: "Experienced" },
      { name: "Java", level: "Experienced" },
      { name: "Assembly", level: "Intermediate" },
      { name: "C/C++", level: "Intermediate" },
      { name: "OCaml", level: "Intermediate" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" },
    ],
    "ML & Data": [
      { name: "Machine Learning", level: "Experienced" },
      { name: "Mechanistic Interpretability", level: "Working" },
      { name: "R / Stata / MATLAB", level: "Working" },
      { name: "PyTorch / OpenCV", level: "Working" },
      { name: "Data Analysis", level: "Experienced" },
      { name: "Dataset Creation", level: "Experienced" },
    ],
    "Security & Systems": [
      { name: "Kali Linux", level: "Intermediate" },
      { name: "Linux", level: "Working" },
      { name: "Docker", level: "Working" },
      { name: "Cybersecurity Policy", level: "Experienced" },
      { name: "Cisco Packet Tracer", level: "Intermediate" },
      { name: "Git & GitHub", level: "Experienced" },
    ],
  };

  return (
    <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="mx-auto space-y-16">
        {/* Header */}
        <div className="grid border-y border-black/20 py-6 md:grid-cols-[0.65fr_1.35fr]">
          <p className="section-kicker mb-4 md:mb-0">Archive / Skills</p>
          <div className="space-y-5">
          <h1 className="editorial-title text-5xl sm:text-6xl md:text-8xl lg:text-9xl">
            Experience & Skills
          </h1>
          <p className="max-w-3xl text-2xl font-semibold leading-tight text-neutral-700 md:text-4xl">
            My professional journey, education, and technical expertise
          </p>
          </div>
        </div>

        {/* Work Experience */}
        <section>
          <h2 className="mb-6 flex items-center gap-3 border-b border-black/20 pb-3 text-4xl font-black uppercase">
            <Briefcase className="h-7 w-7 text-neutral-950" />
            Work Experience
          </h2>
          <div className="border-x border-t border-black/20">
            {experiences.map((exp, idx) => (
              <Card key={idx} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border-0 border-b`}>
                <div className="grid gap-0 md:grid-cols-[0.18fr_0.82fr]">
                  <div className="flex items-start justify-between border-b border-black/20 p-5 md:block md:border-b-0 md:border-r">
                    <span className="text-5xl font-black leading-none">0{idx + 1}</span>
                    <exp.icon className="h-6 w-6" />
                  </div>
                  <div className="p-5 md:p-7">
                    <h3 className="text-3xl font-black uppercase leading-none md:text-5xl">{exp.title}</h3>
                    <p className="mt-3 text-lg font-semibold text-neutral-700">{exp.company}</p>
                    <div className="mb-5 mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </span>
                    </div>
                    <ul className="mb-5 space-y-2 text-neutral-800">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 text-neutral-950">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="mb-6 flex items-center gap-3 border-b border-black/20 pb-3 text-4xl font-black uppercase">
            <GraduationCap className="h-7 w-7 text-neutral-950" />
            Education
          </h2>
          <div className="grid border-l border-t border-black/20 lg:grid-cols-2">
            {education.map((edu, idx) => (
              <Card key={idx} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border-0 border-b border-r p-0`}>
                <div>
                  <div className="flex items-center justify-between border-b border-black/20 p-5">
                    <span className="section-kicker">Education 0{idx + 1}</span>
                    <edu.icon className="h-5 w-5" />
                  </div>
                  <div className="p-5 md:p-7">
                    <h3 className="mb-3 text-3xl font-black uppercase leading-none">{edu.degree}</h3>
                    <p className="font-semibold text-neutral-700">
                      {edu.institution}
                      {edu.note && <span className="text-neutral-500"> · {edu.note}</span>}
                    </p>
                    <div className="mb-5 mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </span>
                      <span className="font-semibold text-neutral-950">{edu.gpa}</span>
                    </div>
                    <div className="mt-4">
                      <p className="section-kicker mb-3">Course Highlights:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {edu.highlights.map((course, i) => (
                          <Badge key={i} variant="outline" className="justify-start px-3 py-2">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="mb-6 flex items-center gap-3 border-b border-black/20 pb-3 text-4xl font-black uppercase">
            <Award className="h-7 w-7 text-neutral-950" />
            Certifications & Courses
          </h2>
          <div className="grid border-l border-t border-black/20 md:grid-cols-2">
            {certifications.map((cert, idx) => (
              <Card key={idx} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border-0 border-b border-r p-6`}>
                <div className="flex items-start gap-4">
                  <div className="border border-black/20 p-3">
                    <cert.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-neutral-950">{cert.title}</h3>
                    <p className="text-sm text-neutral-600 mb-2">{cert.org}</p>
                    <Badge variant="outline">{cert.year}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="mb-6 border-b border-black/20 pb-3 text-4xl font-black uppercase">Technical Skills</h2>
          <div className="grid border-l border-t border-black/20 md:grid-cols-3">
            {Object.entries(skills).map(([group, items]) => (
              <Card key={group} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border-0 border-b border-r p-6`}>
                <h3 className="mb-5 text-2xl font-black uppercase">{group}</h3>
                <div className="space-y-3">
                  {items.map((s) => (
                    <div key={s.name} className="flex items-center justify-between">
                      <span className="text-neutral-800">{s.name}</span>
                      <Badge variant="secondary" className="text-xs">{s.level}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
