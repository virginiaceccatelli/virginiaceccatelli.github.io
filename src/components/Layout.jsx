import { Link, useLocation } from "react-router-dom";
import { FileDown, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const THEME = {
  // Dark “ink” background with subtle depth
  pageBg: "bg-[linear-gradient(to_bottom,#141518,#111215)]",
  pageText: "text-zinc-100",

  // Glass surfaces + rules
  headerGlass: "glass rule",
  surface: "glass",
  surfaceHover: "hover:bg-white/[0.06]",
  transition: "transition-all duration-300 ease-out",

  // Type + accents (monochrome)
  navText: "text-zinc-300 hover:text-zinc-100",
  navActive: "text-zinc-100",
  subtleText: "text-zinc-400",
  rule: "border-white/10",
};

const RESUME_URL ="https://drive.google.com/file/d/1Anvr3PH1z86O1tP4N6GHabY6VlWxXM6I/view?usp=sharing";
const GITHUB = "https://github.com/virginiaceccatelli";
const LINKEDIN = "https://www.linkedin.com/in/virginia-ceccatelli/";
const EMAIL = "virginia.ceccatelli@mail.mcgill.ca";

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/experience", label: "Experience" },
    { path: "/projects", label: "Projects" },
    { path: "/writing", label: "Writing" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`min-h-screen ${THEME.pageBg} text-zinc-100 ${THEME.pageText} bg-glass-motion`}>
      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 ${THEME.headerGlass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand: display serif, understated */}
            <Link
              to="/"
              className="font-display text-2xl tracking-tight text-zinc-100 hover:opacity-90 transition-opacity"
            >
              VC
            </Link>

            {/* Desktop nav: mono, small, spaced, thin active rule */}
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={[
                      "font-display text-[12px] tracking-[0.18em] uppercase",
                      "pb-1 border-b",
                      active ? `border-white/60 ${THEME.navActive}` : `border-transparent ${THEME.navText}`,
                      THEME.transition,
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-zinc-300 hover:text-zinc-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg ${THEME.transition} ${THEME.surface} ${THEME.surfaceHover}`}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-zinc-200" />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg ${THEME.transition} ${THEME.surface} ${THEME.surfaceHover}`}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-zinc-200" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className={`p-2 rounded-lg ${THEME.transition} ${THEME.surface} ${THEME.surfaceHover}`}
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-zinc-200" />
              </a>

              {/* Resume: minimal, monochrome */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden sm:flex border-white/15 text-zinc-100 bg-white/[0.03] hover:bg-white/[0.06]"
              >
                <a href={"https://drive.google.com/file/d/1Anvr3PH1z86O1tP4N6GHabY6VlWxXM6I/view?usp=sharing"} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  <span className="font-display text-[12px] tracking-[0.18em] uppercase">Resume</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 glass">
            <nav className="flex flex-col p-4 space-y-3">
              {nav.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={[
                      "font-display text-[12px] tracking-[0.18em] uppercase",
                      "py-2 border-b",
                      active ? "border-white/60 text-zinc-100" : "border-white/10 text-zinc-300 hover:text-zinc-100",
                      THEME.transition,
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <a
                href={"https://drive.google.com/file/d/1Anvr3PH1z86O1tP4N6GHabY6VlWxXM6I/view?usp=sharing"}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-between py-2 font-mono text-[12px] tracking-[0.18em] uppercase text-zinc-300 hover:text-zinc-100 transition-colors"
              >
                <span>Resume</span>
                <FileDown className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content: subtle route-friendly animation */}
      <motion.main
        className="relative"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {children}
      </motion.main>

      {/* Footer: thin rules, mono labels */}
      <footer className="mt-20 border-t border-white/10 glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`font-display text-[12px] tracking-[0.14em] uppercase ${THEME.subtleText}`}>
              © {new Date().getFullYear()} Virginia Ceccatelli. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href={`mailto:${EMAIL}`}
                className={`font-display text-[12px] tracking-[0.14em] uppercase ${THEME.subtleText} hover:text-zinc-100 transition-colors`}
              >
                {EMAIL}
              </a>

              <div className="flex items-center gap-3">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-zinc-100 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-zinc-100 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
