import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { getLenis } from "./lenisInstance";

/**
 * Hand-written Canvas 2D flowing gradient field — no WebGL library.
 * Soft pastel plumes drift on their own, shift with scroll progress, and
 * bend gently toward the cursor. Mirrors the old CSS blobs (cream base,
 * multiply blend) but alive and reactive. `shuffle()` re-rolls the palette.
 */

// Scholarly but not grey — a wider set of soft, gently saturated hues
// (violet, blue, teal, sage, amber, clay) kept muted so the field still
// reads as a quiet wash behind text rather than a candy bloom.
const PALETTE = [
  "#a99bd0", "#8fb0cf", "#8fc0b4", "#c8b285",
  "#cf9f9a", "#9fb98f", "#b39ac2", "#87a9c4",
  "#c4ab7e", "#9ec2ba", "#c99ba6", "#a7b58c",
  "#9d9fce", "#7fb3b0", "#cba98e", "#b8a0c0",
];
const BASE = "#faf8f4";

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// spread anchors so plumes stay separated instead of piling into the centre
const ANCHORS = [
  [0.16, 0.22], [0.82, 0.18], [0.24, 0.78], [0.78, 0.74], [0.5, 0.45],
];

function makeBlobs(count) {
  const pool = [...PALETTE].sort(() => Math.random() - 0.5);
  return Array.from({ length: count }, (_, i) => {
    const [ax, ay] = ANCHORS[i % ANCHORS.length];
    return {
      hx: ax, hy: ay,
      radius: 0.3 + Math.random() * 0.16, // fraction of max(w,h) — smaller, softer
      color: hexToRgb(pool[i % pool.length]),
      dx: 0.05 + Math.random() * 0.06, // drift amplitude
      dy: 0.05 + Math.random() * 0.06,
      sx: 0.05 + Math.random() * 0.06, // drift speed
      sy: 0.04 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
      depth: 0.4 + Math.random() * 0.8, // parallax weight for scroll + mouse
    };
  });
}

const GradientField = forwardRef(function GradientField(_, ref) {
  const canvasRef = useRef(null);
  const blobsRef = useRef(makeBlobs(5));
  const targetColorsRef = useRef(blobsRef.current.map((b) => [...b.color]));

  useImperativeHandle(ref, () => ({
    shuffle() {
      const pool = [...PALETTE].sort(() => Math.random() - 0.5);
      targetColorsRef.current = blobsRef.current.map((_, i) => hexToRgb(pool[i % pool.length]));
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // pointer, smoothed
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e) => { mouse.tx = e.clientX / w; mouse.ty = e.clientY / h; };
    window.addEventListener("mousemove", onMove, { passive: true });

    let scrollN = 0; // normalized scroll progress, smoothed
    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = getLenis()?.scroll ?? window.scrollY;
      return max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
    };

    const draw = (t) => {
      const time = t * 0.001;
      const blobs = blobsRef.current;
      const targets = targetColorsRef.current;

      // ease pointer + scroll
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      scrollN += (scrollProgress() - scrollN) * 0.08;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = BASE;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "multiply";
      const maxDim = Math.max(w, h);

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        // migrate color toward target (shuffle transition)
        for (let c = 0; c < 3; c++) b.color[c] += (targets[i][c] - b.color[c]) * 0.02;

        const drift = reduced ? 0 : 1;
        const px =
          b.hx +
          Math.sin(time * b.sx + b.phase) * b.dx * drift +
          (mouse.x - 0.5) * 0.07 * b.depth +
          Math.sin(scrollN * Math.PI * 2 + b.phase) * 0.05 * b.depth;
        const py =
          b.hy +
          Math.cos(time * b.sy + b.phase) * b.dy * drift +
          (mouse.y - 0.5) * 0.07 * b.depth -
          scrollN * 0.18 * b.depth; // whole field lifts as you scroll

        const cx = px * w;
        const cy = py * h;
        const r = b.radius * maxDim;
        const [rr, gg, bb] = b.color.map((v) => Math.round(v));

        // lower alpha than before — a restrained tint, not a saturated bloom
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(${rr},${gg},${bb},0.26)`);
        grad.addColorStop(0.45, `rgba(${rr},${gg},${bb},0.12)`);
        grad.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) rafId = requestAnimationFrame(draw);
    };

    let rafId = requestAnimationFrame(draw);
    if (reduced) { draw(0); cancelAnimationFrame(rafId); }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0, width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none",
      }}
    />
  );
});

export default GradientField;
