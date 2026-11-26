import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/*
 * Pick the cursor style here:
 *   "dot"    — a small dark dot that glides after the pointer and swells over links
 *   "invert" — a larger dot that inverts the colours beneath it, swelling over links
 *   "native" — the normal system arrow (no custom cursor at all)
 */
const STYLE = "dot";

const INTERACTIVE = "a, button, [role='button'], [data-cursor='hover']";

const LOOKS = {
  dot: {
    size: 8,
    follow: 0.22,   // seconds of glide behind the pointer: higher = smoother/laggier
    hoverScale: 3,
    hoverOpacity: 0.35,
    style: { background: "#1a1a1a" },
  },
  invert: {
    size: 16,
    follow: 0.3,
    hoverScale: 3.2,
    hoverOpacity: 1,
    style: { background: "#fff", mixBlendMode: "difference" },
  },
};

export default function Cursor() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const look = LOOKS[STYLE];

  useEffect(() => {
    if (!look) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    // Hide the system arrow only while the custom cursor is actually showing
    document.documentElement.classList.add("custom-cursor");
    return () => document.documentElement.classList.remove("custom-cursor");
  }, [look]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;

    const toX = gsap.quickTo(dot, "x", { duration: look.follow, ease: "power3.out" });
    const toY = gsap.quickTo(dot, "y", { duration: look.follow, ease: "power3.out" });

    const onMove = (e) => {
      toX(e.clientX); toY(e.clientY);
      gsap.to(dot, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
    };
    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(dot, { scale: look.hoverScale, opacity: look.hoverOpacity, duration: 0.35, ease: "power3.out" });
      }
    };
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
      }
    };
    const onLeave = () => gsap.to(dot, { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, look]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed", top: 0, left: 0, borderRadius: "50%",
        pointerEvents: "none", zIndex: 9999, opacity: 0, visibility: "hidden",
        width: look.size, height: look.size,
        marginLeft: -look.size / 2, marginTop: -look.size / 2,
        ...look.style,
      }}
    />
  );
}
