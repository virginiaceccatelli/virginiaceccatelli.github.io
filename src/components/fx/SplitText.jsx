import { useRef, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * react-bits-style split text reveal.
 * Splits `text` (use "\n" for line breaks) into masked lines of characters
 * that rise into place, either on mount ("load") or when scrolled into view ("scroll").
 */
export default function SplitText({
  text,
  // eslint-disable-next-line no-unused-vars -- used as JSX component below
  tag: Tag = "div",
  trigger = "load",
  delay = 0,
  stagger = 0.025,
  duration = 1.1,
  className = "",
  style = {},
}) {
  const rootRef = useRef(null);
  const lines = useMemo(() => text.split("\n"), [text]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chars = root.querySelectorAll("[data-char]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(chars, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 110, opacity: 0 });
      const vars = {
        yPercent: 0,
        opacity: 1,
        duration,
        ease: "power4.out",
        stagger,
        delay,
      };
      if (trigger === "scroll") {
        gsap.to(chars, {
          ...vars,
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
        });
      } else {
        gsap.to(chars, vars);
      }
    }, root);

    return () => ctx.revert();
  }, [text, trigger, delay, stagger, duration]);

  return (
    <Tag ref={rootRef} className={className} style={style} aria-label={text.replace("\n", " ")}>
      {lines.map((line, li) => (
        <span
          key={li}
          aria-hidden="true"
          style={{ display: "block", overflow: "hidden", padding: "0.05em 0.06em 0.26em", margin: "-0.05em -0.06em -0.26em" }}
        >
          {line.split("").map((ch, ci) => (
            <span
              key={ci}
              data-char
              style={{ display: "inline-block", whiteSpace: "pre", willChange: "transform" }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
