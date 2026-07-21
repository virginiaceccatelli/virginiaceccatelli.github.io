import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed parallax. Wrap an image container: the inner layer drifts
 * vertically (and optionally over-scales) as it crosses the viewport.
 */
export default function Parallax({ children, strength = 12, scale = 1.12, style = {} }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { yPercent: -strength, scale },
        {
          yPercent: strength,
          scale,
          ease: "none",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, outerRef);
    return () => ctx.revert();
  }, [strength, scale]);

  return (
    <div ref={outerRef} style={{ overflow: "hidden", ...style }}>
      <div ref={innerRef} style={{ height: "100%", willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
