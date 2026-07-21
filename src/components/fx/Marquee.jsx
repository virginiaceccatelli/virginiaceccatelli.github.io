import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { getLenis } from "./lenisInstance";

/**
 * react-bits ScrollVelocity-style marquee: an infinite band of text whose
 * speed and direction react to scroll velocity.
 */
export default function Marquee({ text, baseSpeed = 0.6, style = {} }) {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let pos = 0;
    let half = track.scrollWidth / 2;
    const onResize = () => { half = track.scrollWidth / 2; };
    window.addEventListener("resize", onResize);

    const tick = () => {
      const velocity = getLenis()?.velocity ?? 0;
      const boost = gsap.utils.clamp(-6, 6, velocity * 0.12);
      pos -= baseSpeed + boost * baseSpeed;
      if (half > 0) {
        if (pos <= -half) pos += half;
        if (pos > 0) pos -= half;
      }
      gsap.set(track, { x: pos });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
    };
  }, [baseSpeed]);

  const content = Array(6).fill(text).join("   ·   ");

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", ...style }} aria-hidden="true">
      <div ref={trackRef} style={{ display: "inline-block", willChange: "transform" }}>
        <span>{content}   ·   </span>
        <span>{content}   ·   </span>
      </div>
    </div>
  );
}
