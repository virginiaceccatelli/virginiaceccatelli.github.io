import { Link, useLocation } from "react-router-dom";
import { BookOpen, FileDown, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { motion as Motion } from "framer-motion";

const THEME = {
  pageBg: "bg-[#E9E6E7]",
  pageText: "text-[#5E5653]",

  headerGlass: "bg-[#E9E6E7]/90 backdrop-blur-xl border-b border-[#AB978C]/45",
  surface: "border border-[#AB978C]/45 bg-transparent",
  surfaceHover: "hover:bg-[#6B7C98] hover:text-[#E9E6E7]",
  transition: "transition-all duration-300 ease-out",

  navText: "text-[#7B7F8A] hover:text-[#6B7C98]",
  navActive: "text-[#5E5653]",
  subtleText: "text-[#7B7F8A]",
  rule: "border-[#AB978C]/45",
};

const RESUME_URL = "https://drive.google.com/file/d/1_WXtF8ZR1PibWy0pU4sSbGDKIx6uDuSD/view?usp=sharing";
const GITHUB = "https://github.com/virginiaceccatelli";
const LINKEDIN = "https://www.linkedin.com/in/virginia-ceccatelli/";
const SCHOLAR = "https://scholar.google.com/citations?user=kk8BWhAAAAAJ&hl=en";
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
    <div className={`min-h-screen ${THEME.pageBg} ${THEME.pageText} bg-glass-motion paper-noise`}>
      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 ${THEME.headerGlass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand: display serif, understated */}
            <Link
              to="/"
              className="font-display text-2xl tracking-tight text-[#5E5653] hover:opacity-70 transition-opacity"
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
                      active ? `border-[#6B7C98] ${THEME.navActive}` : `border-transparent ${THEME.navText}`,
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
                className="md:hidden p-2 text-[#6B7C98] hover:text-[#AB978C]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className={`p-2 ${THEME.transition} ${THEME.surface} ${THEME.surfaceHover}`}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className={`p-2 ${THEME.transition} ${THEME.surface} ${THEME.surfaceHover}`}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SCHOLAR}
                target="_blank"
                rel="noreferrer"
                className={`p-2 ${THEME.transition} ${THEME.surface} ${THEME.surfaceHover}`}
                aria-label="Google Scholar"
              >
                <BookOpen className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className={`p-2 ${THEME.transition} ${THEME.surface} ${THEME.surfaceHover}`}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>

              {/* Resume: minimal, monochrome */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                <a href={RESUME_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  <span className="font-display text-[12px] tracking-[0.18em] uppercase">Resume</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#AB978C]/45 bg-[#E9E6E7]">
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
                      active ? "border-[#5E5653] text-[#5E5653]" : "border-[#5E5653]/10 text-[#7B7F8A] hover:text-[#5E5653]",
                      THEME.transition,
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-between py-2 font-display text-[12px] tracking-[0.18em] uppercase text-[#7B7F8A] hover:text-[#5E5653] transition-colors"
              >
                <span>Resume</span>
                <FileDown className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content: subtle route-friendly animation */}
      <Motion.main
        className="relative"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {children}
      </Motion.main>

      {/* Footer: thin rules, mono labels */}
      <footer className="mt-20 border-t border-[#5E5653]/20 bg-[#E9E6E7]/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-center font-display text-[12px] tracking-[0.14em] uppercase ${THEME.subtleText}`}>
              © {new Date().getFullYear()} Virginia Ceccatelli. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href={`mailto:${EMAIL}`}
                className={`break-all text-center font-display text-[12px] tracking-[0.14em] uppercase ${THEME.subtleText} hover:text-[#5E5653] transition-colors`}
              >
                {EMAIL}
              </a>

              <div className="flex items-center gap-3">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#7B7F8A] hover:text-[#5E5653] transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#7B7F8A] hover:text-[#5E5653] transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={SCHOLAR}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#7B7F8A] hover:text-[#5E5653] transition-colors"
                  aria-label="Google Scholar"
                >
                  <BookOpen className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
