import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, GraduationCap, Code, Brain, ScanEye} from "lucide-react";
import profileImg from "../assets/foto.png";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const THEME = {
  surface: "bg-zinc-800/50 backdrop-blur-sm",
  surfaceBorder: "border-zinc-700/50",
  surfaceHover: "hover:bg-zinc-700/30",
  transition: "transition-all duration-300",
};

export default function Home() {
  const NAME = "Virginia Ceccatelli";
  const TAGLINE = "Cybersecurity | AI Governance | Emerging Technologies";
  const ROLE = "Computer Science Student at McGill University";
  const LOCATION = "Montreal, Canada";

  const focusAreas = [
    "Network Defense",
    "Pentesting & Web Sec",
    "Threat Modeling",
    "AI Safety & Security",
    "Privacy & Governance",
    "Secure Systems",
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: "3.7 GPA",
      description: "McGill University",
      color: "text-zinc-300",
    },
    {
      icon: ScanEye,
      title: "AI Safety Researcher",
      description: "MILA Quebec AI Institute",
      color: "text-zinc-300",
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity Focus",
      description: "Network Security & AI Governance",
      color: "text-zinc-300",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <p className="text-sm uppercase tracking-widest text-zinc-200 font-semibold">Hello, I'm</p>
            
            <div className="flex items-center gap-6">
              <img
                src={profileImg}
                alt={NAME}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-zinc-500/30 shadow-2xl"
              />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-zinc-100 to-rose-100 bg-clip-text text-transparent">
                  {NAME}
                </h1>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-zinc-300 font-medium">{ROLE}</p>
            <p className="text-lg text-zinc-400">{LOCATION}</p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {TAGLINE.split("|").map((t) => (
                <Badge key={t.trim()} variant="secondary" className="px-4 py-1.5 text-sm">
                  {t.trim()}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="group">
                <Link to="/projects" className="flex items-center gap-2">
                  View Projects
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/experience">My Experience</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Highlights Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((item, idx) => (
                <Card key={idx} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.surfaceHover} ${THEME.transition} border text-center`}>
                  <CardContent className="p-6">
                    <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-3`} />
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Focus Areas Card */}
            <Card className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.transition} border`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-zinc-200" />
                  Areas of Interest
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {focusAreas.map((area) => (
                    <Badge key={area} variant="outline" className="justify-start px-3 py-2 rounded-lg">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-800">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-zinc-200 mb-2">McGill</div>
            <div className="text-zinc-400">Bachelor</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-zinc-300 mb-2">MILA</div>
            <div className="text-zinc-400">AI Safety Research</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-zinc-300 mb-2">CS</div>
            <div className="text-zinc-400">Computer Science Major</div>
          </div>
        </div>
      </section>
    </div>
  );
}
