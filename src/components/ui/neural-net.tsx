"use client";

import { useEffect, useRef } from "react";

/*
  NeuralNet — red neuronal como marca de agua sutil en el hero (tema claro).
  - Nodos flotantes con conexiones por proximidad, en azul de marca o gris pizarra.
  - Reacciona al puntero: los nodos cercanos se iluminan y se conectan al cursor.
  - Respeta prefers-reduced-motion y se pausa cuando sale de pantalla.
  - Sin dependencias; canvas acotado a su contenedor.
*/

interface NNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

type Tone = "blue" | "gray";

const TONES: Record<Tone, string> = {
  blue: "29,102,241", // brand-600, mismos colores del sitio
  gray: "100,116,139", // pizarra, marca de agua neutra
};

const LINK_DIST = 160;
const MOUSE_DIST = 200;

export default function NeuralNet({
  className = "",
  tone = "blue",
}: {
  className?: string;
  tone?: Tone;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const toneRef = useRef<Tone>(tone);
  toneRef.current = tone;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let nodes: NNode[] = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function seed() {
      const count = Math.max(30, Math.min(110, Math.floor((w * h) / 20000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
      }));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function step() {
      if (!running) return;
      const BLUE = TONES[toneRef.current];
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        // Conexiones nodo-nodo por proximidad (marca de agua: alfa bajo)
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(${BLUE},${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // Conexión al cursor
        const mdist = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (mdist < MOUSE_DIST) {
          const alpha = (1 - mdist / MOUSE_DIST) * 0.35;
          ctx.strokeStyle = `rgba(${BLUE},${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Nodos
      for (const n of nodes) {
        const mdist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const hot = mdist < MOUSE_DIST ? 1 - mdist / MOUSE_DIST : 0;
        ctx.fillStyle = `rgba(${BLUE},${(0.14 + hot * 0.5).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + hot * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );

    resize();
    raf = requestAnimationFrame(step);
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />
  );
}
