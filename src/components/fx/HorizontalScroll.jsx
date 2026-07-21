import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins a section and converts vertical scroll into horizontal travel across
 * its children — the classic award-site move. On narrow/touch/reduced-motion
 * viewports it degrades to a normal vertical stack (renders children as-is).
 */
export default function HorizontalScroll({ children, className = "", style = {} }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useLayoutEffect(() => {
    const wide = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || reduced) { setEnabled(false); return; }
    setEnabled(true);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + getScrollAmount(),
        pin: true,
        anticipatePin: 1,
        scrub: 0.6,
        invalidateOnRefresh: true,
        animation: tween,
      });
    }, section);

    return () => ctx.revert();
  }, [children]);

  if (!enabled) {
    // vertical fallback: lay panels out stacked
    return (
      <div className={className} style={style}>
        <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className={className} style={{ overflow: "hidden", ...style }}>
      <div
        ref={trackRef}
        style={{ display: "flex", flexWrap: "nowrap", willChange: "transform", height: "100vh" }}
      >
        {children}
      </div>
    </section>
  );
}
