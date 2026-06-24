import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, GraduationCap, ScanEye, ServerCog } from "lucide-react";
import profileImg from "../assets/foto.png";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const THEME = {
  surface: "bg-transparent",
  surfaceBorder: "border-black/20",
  surfaceHover: "hover:bg-black hover:text-[#f4f1ea]",
  transition: "transition-all duration-300",
};

export default function Home() {
  const NAME = "Virginia Ceccatelli";
  const TAGLINE = "AI Safety | Systems Security | Cybersecurity Policy";
  const ROLE = "McGill Computer Science Alumni";
  const LOCATION = "Montreal, Canada";

  const focusAreas = [
    "Mechanistic Interpretability",
    "Uncertainty Quantification",
    "Multilingual Speech Safety",
    "AI Safety & Security",
    "Systems Security",
    "Cybersecurity Policy",
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: "3.8 GPA",
      description: "McGill CS + Economics",
      color: "text-zinc-300",
    },
    {
      icon: ScanEye,
      title: "Systems Security Researcher",
      description: "UCL S2Lab",
      color: "text-zinc-300",
    },
    {
      icon: ServerCog,
      title: "ML Intern",
      description: "WIIT Premium Cloud",
      color: "text-zinc-300",
    },
  ];

  return (
    <div className="relative">
      <section className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-10">
        <div className="grid min-h-[calc(100vh-7rem)] grid-rows-[auto_1fr_auto] border-x border-black/15">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-y border-black/20 text-[11px] font-semibold uppercase tracking-[0.18em]">
            <div className="border-b border-black/20 p-3 sm:border-b-0 sm:border-r">Hello!</div>
            <div className="border-b border-black/20 p-3 sm:border-b-0 md:border-r">AI Safety</div>
            <div className="border-r border-black/20 p-3 hidden md:block">Systems Security</div>
            <div className="p-3 text-left md:text-right">Portfolio / 2026</div>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col justify-between border-b border-black/20 p-4 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="space-y-6">
                <h1 className="editorial-title text-[12.5vw] sm:text-[16vw] lg:text-[9.6vw]">
                  {NAME.split(" ")[0]}
                  <br />
                  {NAME.split(" ")[1]}
                </h1>
                <p className="max-w-3xl border-t border-black/20 pt-5 text-2xl font-semibold leading-tight text-neutral-950 md:text-4xl">
                  {ROLE}
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {TAGLINE.split("|").map((t) => (
                    <Badge key={t.trim()} variant="secondary" className="px-4 py-2">
                      {t.trim()}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button asChild size="lg" className="group w-full sm:w-auto">
                    <Link to="/projects" className="flex items-center gap-2">
                      View Projects
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link to="/experience">My Experience</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid content-between">
              <div className="grid grid-cols-[1fr_auto] gap-4 p-4 sm:p-8">
                <div className="section-kicker">Profile</div>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="px-4 sm:px-8">
                <img
                  src={profileImg}
                  alt={NAME}
                  className="aspect-[4/5] w-full border border-black/25 object-cover grayscale contrast-125"
                />
              </div>
              <div className="grid grid-cols-1 border-t border-black/20">
                {highlights.map((item, idx) => (
                  <Card key={idx} className={`${THEME.surface} ${THEME.surfaceBorder} ${THEME.surfaceHover} ${THEME.transition} border-0 border-b last:border-b-0`}>
                    <CardContent className="grid grid-cols-[0.22fr_0.78fr] gap-4 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="section-kicker">0{idx + 1}</span>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase leading-none">{item.title}</h3>
                        <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-band">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 md:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-black/20 p-6 md:border-b-0 md:border-r">
            <CardTitle className="flex items-center gap-2 text-2xl uppercase">
              <ShieldCheck className="h-5 w-5" />
              Areas of Interest
            </CardTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area) => (
              <div key={area} className="border-b border-r border-black/20 p-5 text-xl font-semibold uppercase leading-tight last:border-r-0">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid border border-black/20 md:grid-cols-3">
          <div className="border-b border-black/20 p-8 md:border-b-0 md:border-r">
            <div className="text-5xl font-black uppercase leading-none">McGill</div>
            <div className="mt-3 text-neutral-600">Computer Science + Economics</div>
          </div>
          <div className="border-b border-black/20 p-8 md:border-b-0 md:border-r">
            <div className="text-5xl font-black uppercase leading-none">UCL</div>
            <div className="mt-3 text-neutral-600">S2Lab Systems Security</div>
          </div>
          <div className="p-8">
            <div className="text-5xl font-black uppercase leading-none">MILA</div>
            <div className="mt-3 text-neutral-600">Multilingual AI Safety</div>
          </div>
        </div>
      </section>
    </div>
  );
}
