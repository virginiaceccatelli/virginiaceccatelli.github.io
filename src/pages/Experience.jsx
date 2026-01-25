import { Briefcase, GraduationCap, Award, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const THEME = {
  surface: "bg-zinc-800/50 backdrop-blur-sm",
  surfaceBorder: "border-zinc-700/50",
  surfaceHover: "hover:bg-zinc-700/30",
  transition: "transition-all duration-300",
};

export default function Experience() {
  const experiences = [
    {
      type: "work",
      title: "AI Safety Researcher – Audio Jailbreaking & Multilingual LLMs",
      company: "MILA Quebec AI Institute, Prof. David Adelani",
      location: "Montreal, Canada",
      period: "January 2026 – Current",
      description: [
        "Investigating audio-based jailbreaking vulnerabilities in multilingual voice-enabled LLM systems",
        "Exploring how code-switching attack vectors can bypass safety guardrails in speech-to-text pipelines",
      ],
      tags: ["AI Safety", "LLMs", "Security Research", "Multilingual Systems"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
    {
      type: "work",
      title: "Researcher",
      company: "Andalus Committee (New York Office)",
      location: "New York, USA",
      period: "July 2025 – Current",
      description: [
        "Contribute research briefs on technology policy and security-related topics for internal publications",
        "Currently investigating the geopolitical implications of Sub-Saharan Africa's foreign technology dependencies and cybersecurity posture",
      ],
      tags: ["Research", "Policy", "Security"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
    {
      type: "work",
      title: "VP Internal",
      company: "Girls Who Code",
      location: "Montreal, Canada",
      period: "2025 – Current",
      description: [
        "Teaching Python fundamentals to high school students in Montreal as part of a non-profit initiative",
        "Organizing coding workshops, mentoring sessions, networking events and hackathons as part of McGill club initiatives",
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
      period: "May 2025 – August 2025",
      description: [
        "Re-architected the robot vision system in C++ for low-latency, real-time performance on resource-constrained hardware",
        "Built a real-time ground segmentation + motion planning pipeline using a U-Net with a MobileNetV2 backbone",
        "Designed an RGB-only alternative to depth/LIDAR prototyping, reducing hardware cost requirements for early testing",
      ],
      tags: ["Computer Vision", "C++", "U-Net", "Robotics", "Motion Planning"],
      icon: Briefcase,
      color: "text-zinc-300",
    },
    {
      type: "work",
      title: "Digital Finance Transformation Intern",
      company: "Wavestone",
      location: "Munich, Germany",
      period: "June 2024 – July 2024",
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
      period: "February 2024 – May 2024",
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
      degree: "BA in Computer Science, Minor in Economics",
      location: "Montreal, Canada",
      period: "Graduation: May 2026",
      gpa: "3.7 GPA",
      highlights: [
        "Operating Systems",
        "Programming Languages and Paradigms",
        "Probability & Statistics",
        "Financial Instruments & Institutions",
        "Applied Machine Learning (Graduate)",
        "Computer Networks (Graduate)",
        "Compiler Design (Graduate)",
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
      { name: "JavaScript", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" },
    ],
    "Security & Networking": [
      { name: "Nmap", level: "Intermediate" },
      { name: "Wireshark", level: "Intermediate" },
      { name: "Burp Suite", level: "Working" },
      { name: "Metasploit", level: "Working" },
      { name: "OpenSSL / TLS", level: "Working" },
      { name: "Kali Linux", level: "Intermediate" },
    ],
    "Platforms & Tools": [
      { name: "Linux", level: "Working" },
      { name: "Docker", level: "Working" },
      { name: "Cisco Packet Tracer", level: "Intermediate" },
      { name: "Git & GitHub", level: "Experienced" },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-100 to-rose-100 bg-clip-text text-transparent leading-tight pb-1">
            Experience & Skills
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            My professional journey, education, and technical expertise
          </p>
        </div>

        {/* Work Experience */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-zinc-400" />
            Work Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <Card key={idx} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border p-6 md:p-8`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-zinc-800/50 ${exp.color}`}>
                    <exp.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                    <p className="text-zinc-200 font-medium mb-2">{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-4 text-zinc-300">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-zinc-200 mt-1.5">•</span>
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
          <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-zinc-400" />
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <Card key={idx} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border p-6 md:p-8`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-zinc-800/50 ${edu.color}`}>
                    <edu.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                    <p className="text-zinc-400 font-medium mb-2">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </span>
                      <span className="font-semibold text-zinc-200">{edu.gpa}</span>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-zinc-300 mb-3">Course Highlights:</p>
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
          <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
            <Award className="h-8 w-8 text-zinc-400" />
            Certifications & Courses
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, idx) => (
              <Card key={idx} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border p-6`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-zinc-800/50 ${cert.color}`}>
                    <cert.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{cert.title}</h3>
                    <p className="text-sm text-zinc-400 mb-2">{cert.org}</p>
                    <Badge variant="outline">{cert.year}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(skills).map(([group, items]) => (
              <Card key={group} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border p-6`}>
                <h3 className="text-lg font-semibold mb-4">{group}</h3>
                <div className="space-y-3">
                  {items.map((s) => (
                    <div key={s.name} className="flex items-center justify-between">
                      <span className="text-zinc-300">{s.name}</span>
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
