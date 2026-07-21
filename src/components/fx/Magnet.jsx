import { useRef, useCallback } from "react";
import gsap from "gsap";

/**
 * react-bits-style magnetic hover: the child is pulled toward the cursor
 * and springs back on leave. No-op on touch devices.
 */
export default function Magnet({ children, strength = 0.35, style = {} }) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || !window.matchMedia("(pointer: fine)").matches) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: "inline-block", willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
