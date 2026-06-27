import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESUME_PATH = "/resume.pdf";
const GITHUB = "https://github.com/virginiaceccatelli";
const LINKEDIN = "https://www.linkedin.com/in/virginia-ceccatelli/";
const SCHOLAR = "https://scholar.google.com/citations?user=kk8BWhAAAAAJ&hl=en";
const EMAIL = "virginia.ceccatelli@mail.mcgill.ca";

const NAV = [
  { path: "/about", label: "About" },
  { path: "/experience", label: "Experience" },
  { path: "/projects", label: "Projects" },
  { path: "/writing", label: "Writing" },
];

const SOCIAL = [
  { label: "GitHub", href: GITHUB },
  { label: "Google Scholar", href: SCHOLAR },
  { label: "LinkedIn", href: LINKEDIN },
  { label: EMAIL, href: `mailto:${EMAIL}` },
];

const PALETTE = [
  "#b8a9d4", // soft lavender
  "#c9b38a", // warm sand
  "#a8c4b0", // sage green
  "#d4a8a8", // dusty rose
  "#9ab4c8", // muted blue
  "#c4b8a0", // warm linen
  "#b4a8c4", // muted violet
  "#a0b8b4", // soft teal
  "#c8b890", // golden wheat
  "#b4a0b8", // pale mauve
  "#a8b8a0", // muted mint
  "#c4a890", // terracotta blush
  "#a8b0c4", // periwinkle mist
  "#c0a8a4", // rose clay
  "#a8b8a8", // soft olive
  "#b8a8b8", // lilac grey
];

function pickColors() {
  return [...PALETTE].sort(() => Math.random() - 0.5).slice(0, 4);
}

const BLOB_CONFIG = [
  {
    style: { top: "5vh", left: "5vw", width: "45vw", height: "45vw" },
    anim: { x: [0, 80, -50, 30, 0], y: [0, 60, -70, 40, 0] },
    duration: 22,
  },
  {
    style: { top: "0vh", right: "5vw", width: "40vw", height: "40vw" },
    anim: { x: [0, -70, 55, -30, 0], y: [0, 80, -60, 35, 0] },
    duration: 18,
  },
  {
    style: { bottom: "10vh", left: "15vw", width: "48vw", height: "48vw" },
    anim: { x: [0, 60, -65, 25, 0], y: [0, -70, 55, -30, 0] },
    duration: 26,
  },
  {
    style: { bottom: "5vh", right: "10vw", width: "38vw", height: "38vw" },
    anim: { x: [0, -60, 50, -20, 0], y: [0, -55, 65, -25, 0] },
    duration: 20,
  },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [blobColors, setBlobColors] = useState(() => pickColors());

  const shuffleColors = useCallback(() => setBlobColors(pickColors()), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{ minHeight: "100vh", background: "transparent", color: "#1a1a1a" }}
      onClick={shuffleColors}
    >
      {/* Animated blobs — multiply blend, click anywhere to change colours */}
      {BLOB_CONFIG.map((cfg, i) => (
        <motion.div
          key={i}
          animate={cfg.anim}
          transition={{ duration: cfg.duration, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
          style={{
            position: "fixed",
            borderRadius: "50%",
            filter: "blur(70px)",
            opacity: 0.65,
            zIndex: 10,
            mixBlendMode: "multiply",
            pointerEvents: "none",
            backgroundColor: blobColors[i],
            transition: "background-color 1.6s cubic-bezier(0.16,1,0.3,1)",
            ...cfg.style,
          }}
        />
      ))}

      {/* Nav */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
          height: "56px", display: "flex", alignItems: "center", padding: "0 2rem",
          transition: "background 0.5s ease, border-color 0.5s ease",
          background: scrolled ? "rgba(250,248,244,0.88)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(26,26,26,0.08)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 400, letterSpacing: "0.06em", color: "#1a1a1a", textDecoration: "none", transition: "opacity 0.25s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.45")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            VC
          </Link>
          <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="hidden md:flex">
            {NAV.map(item => <NavLink key={item.path} to={item.path} active={isActive(item.path)}>{item.label}</NavLink>)}
            <a href={RESUME_PATH} download="Virginia_Ceccatelli_CV.pdf" className="kicker link-underline"
              style={{ color: "#7c7068", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#7c7068")}>
              CV
            </a>
          </nav>
          <button onClick={e => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="md:hidden kicker"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#1a1a1a", letterSpacing: "0.2em", fontSize: "0.68rem" }}>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, zIndex: 290, background: "rgba(250,248,244,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 2.5rem", gap: "0.25rem" }}>
            {NAV.map((item, i) => (
              <motion.div key={item.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <Link to={item.path} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 12vw, 5rem)", fontWeight: 300, lineHeight: 1.1, color: "#1a1a1a", textDecoration: "none", letterSpacing: "-0.01em", transition: "opacity 0.2s", display: "block" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.4")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} style={{ marginTop: "3rem" }}>
              <a href={RESUME_PATH} download="Virginia_Ceccatelli_CV.pdf" className="kicker" style={{ color: "#7c7068", textDecoration: "none" }}>Download CV</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.main key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 1 }}>
        {children}
      </motion.main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(26,26,26,0.1)", padding: "2.5rem 2rem", marginTop: "8rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "space-between", alignItems: "center" }}>
          <span className="kicker">© {new Date().getFullYear()} Virginia Ceccatelli</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {SOCIAL.map(link => (
              <a key={link.href} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
                className="kicker link-underline"
                style={{ color: "#7c7068", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#7c7068")}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link to={to} className="kicker link-underline"
      style={{ color: active ? "#1a1a1a" : "#7c7068", textDecoration: "none", borderBottom: active ? "1px solid #1a1a1a" : "1px solid transparent", paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s" }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#1a1a1a"; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#7c7068"; }}>
      {children}
    </Link>
  );
}
