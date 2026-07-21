import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "./fx/lenisInstance";
import GradientField from "./fx/GradientField";

const RESUME_PATH = "/resume.pdf";
const GITHUB = "https://github.com/virginiaceccatelli";
const LINKEDIN = "https://www.linkedin.com/in/virginia-ceccatelli/";
const SCHOLAR = "https://scholar.google.com/citations?user=kk8BWhAAAAAJ&hl=en";
const EMAIL = "virginia.ceccatelli@mail.mcgill.ca";

const NAV = [
  { path: "/about",      label: "About"      },
  { path: "/experience", label: "Experience" },
  { path: "/projects",   label: "Projects"   },
  { path: "/writing",    label: "Writing"    },
];

const SOCIAL = [
  { label: "GitHub",         href: GITHUB },
  { label: "Google Scholar", href: SCHOLAR },
  { label: "LinkedIn",       href: LINKEDIN },
  { label: EMAIL,            href: `mailto:${EMAIL}` },
];

function Hamburger({ open }) {
  const bar = (extra) => ({
    display: "block", width: "22px", height: "1.5px",
    background: "#1a1a1a",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    ...extra,
  });
  return (
    <span style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <span style={bar({ transform: open ? "translateY(6.5px) rotate(45deg)"  : "none" })} />
      <span style={bar({ opacity: open ? 0 : 1 })} />
      <span style={bar({ transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" })} />
    </span>
  );
}

export default function Layout({ children }) {
  const location = useLocation();
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isMobile,   setIsMobile]   = useState(() => window.innerWidth < 768);
  const fieldRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const lenis = getLenis();
    if (menuOpen) lenis?.stop(); else lenis?.start();
    return () => { document.body.style.overflow = ""; lenis?.start(); };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const isActive  = (path) => location.pathname === path;

  const navBg = scrolled || menuOpen
    ? "rgba(250,248,244,0.95)"
    : "transparent";
  const navBorder = scrolled || menuOpen
    ? "1px solid rgba(26,26,26,0.08)"
    : "1px solid transparent";
  const navBlur = scrolled || menuOpen ? "blur(18px)" : "none";

  return (
    <div
      style={{ minHeight: "100vh", background: "transparent", color: "#1a1a1a" }}
      onClick={() => fieldRef.current?.shuffle()}
    >
      {/* Living gradient field — replaces the old static blobs */}
      <GradientField ref={fieldRef} />

      {/* Nav */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        height: "56px", display: "flex", alignItems: "center", padding: "0 1.5rem",
        transition: "background 0.5s ease, border-color 0.5s ease",
        background: navBg, borderBottom: navBorder,
        backdropFilter: navBlur, WebkitBackdropFilter: navBlur,
      }}>
        <div style={{
          maxWidth: "1440px", margin: "0 auto", width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Brand */}
          <Link to="/"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 400, letterSpacing: "0.06em", color: "#1a1a1a", textDecoration: "none", transition: "opacity 0.25s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.45")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            VC
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
              {NAV.map(item => (
                <NavLink key={item.path} to={item.path} active={isActive(item.path)}>
                  {item.label}
                </NavLink>
              ))}
              <a href={RESUME_PATH} download="Virginia_Ceccatelli_CV.pdf"
                className="kicker link-underline"
                style={{ color: "#7c7068", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#7c7068")}>
                CV
              </a>
            </nav>
          )}

          {/* Hamburger — mobile only */}
          {isMobile && (
            <button
              onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", lineHeight: 0 }}
            >
              <Hamburger open={menuOpen} />
            </button>
          )}
        </div>
      </header>

      {/* Scroll progress hairline */}
      <div
        ref={progressRef}
        style={{
          position: "fixed", top: "56px", left: 0, right: 0, zIndex: 301,
          height: "1px", background: "#1a1a1a",
          transform: "scaleX(0)", transformOrigin: "left",
          pointerEvents: "none",
        }}
      />

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <>
            {/* Backdrop */}
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={e => { e.stopPropagation(); closeMenu(); }}
              style={{ position: "fixed", inset: 0, zIndex: 295, background: "rgba(0,0,0,0.06)" }}
            />

            {/* Dropdown panel */}
            <motion.div key="dropdown"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed", top: "56px", left: 0, right: 0, zIndex: 296,
                background: "rgba(250,248,244,0.97)",
                backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(26,26,26,0.1)",
              }}
            >
              {NAV.map(item => (
                <Link key={item.path} to={item.path}
                  onClick={e => { e.stopPropagation(); closeMenu(); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0.9rem 1.5rem",
                    fontFamily: "'Faustina', serif", fontSize: "0.68rem",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: isActive(item.path) ? "#1a1a1a" : "#7c7068",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(26,26,26,0.06)",
                  }}>
                  {item.label}
                  {isActive(item.path) && (
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#1a1a1a" }} />
                  )}
                </Link>
              ))}
              <a href={RESUME_PATH} download="Virginia_Ceccatelli_CV.pdf"
                onClick={e => { e.stopPropagation(); closeMenu(); }}
                style={{
                  display: "block", padding: "0.9rem 1.5rem",
                  fontFamily: "'Faustina', serif", fontSize: "0.68rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#7c7068", textDecoration: "none",
                }}>
                CV — Download
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.main key={location.pathname}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
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
              <a key={link.href} href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
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
