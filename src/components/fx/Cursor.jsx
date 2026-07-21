import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const INTERACTIVE = "a, button, [role='button'], [data-cursor='hover']";

/**
 * Custom cursor: a solid dot that tracks the pointer and a lagging ring
 * that expands over links/buttons. Renders nothing on touch devices.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e) => {
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
      gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: "auto" });
    };
    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 2.4, duration: 0.35, ease: "power3.out" });
        gsap.to(dot, { scale: 0.4, duration: 0.35, ease: "power3.out" });
      }
    };
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to([ring, dot], { scale: 1, duration: 0.35, ease: "power3.out" });
      }
    };
    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });

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
  }, [enabled]);

  if (!enabled) return null;

  const base = {
    position: "fixed", top: 0, left: 0, borderRadius: "50%",
    pointerEvents: "none", zIndex: 9999, opacity: 0,
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <div ref={dotRef} style={{ ...base, width: "6px", height: "6px", background: "#1a1a1a", marginLeft: "-3px", marginTop: "-3px", transform: "none" }} />
      <div ref={ringRef} style={{ ...base, width: "34px", height: "34px", border: "1px solid rgba(26,26,26,0.35)", marginLeft: "-17px", marginTop: "-17px", transform: "none" }} />
    </>
  );
}
