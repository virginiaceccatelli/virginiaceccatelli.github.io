import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Virginia's own scanned flower drawings, used as page furniture.
 *
 * The scans are ink on white paper, so they are shipped as alpha masks
 * (public/art/*.webp) and painted here with a CSS colour instead of being drawn
 * as images — that way the same drawing works in maroon on cream paper and in
 * cream on maroon paper, and it follows the page theme for free.
 */
const ART = {
  flowers: 1400 / 1871,
  bouquet: 1400 / 2350,
  petals: 1400 / 2098,
  starfish: 1400 / 2578,
  figures: 1400 / 806,
  stars: 1400 / 1843,
  computer: 1400 / 1104,
  book: 1400 / 2736,
};

export default function Doodle({
  art = "flowers",
  width = "40vw",
  tint = "var(--accent)",
  opacity = 1,
  rotate = 0,
  flip = false,
  parallax = 8,
  reveal = true,
  style = {},
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (reveal) {
        // the drawing grows upward, as if it were being drawn on the page
        gsap.fromTo(
          inner,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: outer, start: "top 92%", once: true },
          }
        );
      }
      if (parallax) {
        gsap.fromTo(
          outer,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: {
              trigger: outer,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, outer);
    return () => ctx.revert();
  }, [parallax, reveal]);

  const mask = `url(/art/${art}.webp)`;

  return (
    <div
      ref={outerRef}
      aria-hidden="true"
      style={{
        width,
        pointerEvents: "none",
        userSelect: "none",
        willChange: "transform",
        ...style,
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: "100%",
          aspectRatio: String(ART[art] ?? 1),
          background: tint,
          opacity,
          transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)`,
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          transition: "background-color 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}
