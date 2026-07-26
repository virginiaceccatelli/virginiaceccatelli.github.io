import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "./fx/lenisInstance";
import { themeFor, WORDMARK } from "../theme";

const RESUME_PATH = "/resume.pdf";
const GITHUB = "https://github.com/virginiaceccatelli";
const LINKEDIN = "https://www.linkedin.com/in/virginia-ceccatelli/";
const SCHOLAR = "https://scholar.google.com/citations?user=kk8BWhAAAAAJ&hl=en";
const EMAIL = "virginia.ceccatelli@mail.mcgill.ca";

const NAV = [
  { path: "/about",      label: "About Me"   },
  { path: "/experience", label: "Experience" },
  { path: "/projects",   label: "Works"      },
  { path: "/writing",    label: "Writing"    },
];

const SOCIAL = [
  { label: "GitHub",   href: GITHUB },
  { label: "Scholar",  href: SCHOLAR },
  { label: "LinkedIn", href: LINKEDIN },
  { label: "Email",    href: `mailto:${EMAIL}` },
];

function Hamburger({ open }) {
  const bar = (extra) => ({
    display: "block", width: "22px", height: "1.5px",
    background: "var(--ink)",
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 860);
  const progressRef = useRef(null);

  const theme = themeFor(location.pathname);
  const isHome = location.pathname === "/";

  // The whole document flips palette per route; everything downstream reads
  // the CSS variables, including the grain overlay and the custom cursor.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 860);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
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
  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)", transition: "background-color 0.7s cubic-bezier(0.16,1,0.3,1)" }}>

      {/* Header: page name hard left in bold caps, underlined mono links hard right.
          Once scrolled it takes on the page's own paper colour so it stays
          readable when a red band or panel passes underneath it. */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        padding: scrolled ? "1rem clamp(1.25rem, 3vw, 2.5rem)" : "1.6rem clamp(1.25rem, 3vw, 2.5rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "1.5rem",
        background: scrolled || menuOpen ? "var(--paper)" : "transparent",
        borderBottom: `1px solid ${scrolled && !menuOpen ? "var(--rule)" : "transparent"}`,
        transition: "background-color 0.4s ease, border-color 0.4s ease, padding 0.4s ease",
      }}>
        <Link
          to="/"
          className="display"
          style={{
            fontSize: "clamp(1.05rem, 1.7vw, 1.4rem)", fontWeight: 700,
            letterSpacing: "-0.01em", textTransform: "uppercase",
            color: "var(--ink)", textDecoration: "none", lineHeight: 1,
            transition: "opacity 0.25s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          {WORDMARK}
        </Link>

        {!isMobile && (
          <nav style={{ display: "flex", gap: "clamp(1.25rem, 2.5vw, 2.25rem)", alignItems: "center" }}>
            {NAV.filter(item => !isActive(item.path)).map(item => (
              <Link key={item.path} to={item.path} className="u-link" style={{ fontSize: "0.66rem" }}>
                {item.label}
              </Link>
            ))}
            {!isHome && (
              <Link to="/" className="u-link" style={{ fontSize: "0.66rem" }}>Home</Link>
            )}
            <a href={RESUME_PATH} download="Virginia_Ceccatelli_CV.pdf" className="u-link" style={{ fontSize: "0.66rem" }}>
              CV
            </a>
          </nav>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", lineHeight: 0 }}
          >
            <Hamburger open={menuOpen} />
          </button>
        )}
      </header>

      {/* Scroll progress hairline */}
      <div
        ref={progressRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 301,
          height: "2px", background: "var(--accent)",
          transform: "scaleX(0)", transformOrigin: "left",
          pointerEvents: "none",
        }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 299,
              background: "var(--paper)",
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "0 clamp(1.25rem, 6vw, 3rem)",
            }}
          >
            {[{ path: "/", label: "Home" }, ...NAV].map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={item.path}
                  onClick={closeMenu}
                  className="display"
                  style={{
                    display: "block", padding: "0.5rem 0",
                    fontSize: "clamp(2.2rem, 11vw, 3.5rem)", fontWeight: 700,
                    textTransform: "uppercase", textDecoration: "none",
                    color: isActive(item.path) ? "var(--accent)" : "var(--ink)",
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href={RESUME_PATH}
              download="Virginia_Ceccatelli_CV.pdf"
              onClick={closeMenu}
              className="u-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{ marginTop: "2.5rem", fontSize: "0.7rem" }}
            >
              CV — Download
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {children}
      </motion.main>

      {/* Footer — tiny, low, and out of the way, as in the reference */}
      <footer style={{ padding: "2rem clamp(1.25rem, 3vw, 2.5rem)", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2rem", justifyContent: "space-between", alignItems: "center" }}>
          <span className="mono" style={{ fontSize: "0.6rem" }}>
            © {new Date().getFullYear()} Virginia Ceccatelli · All rights reserved
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {SOCIAL.map(link => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="mono link-underline"
                style={{ fontSize: "0.6rem", color: "var(--muted)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
