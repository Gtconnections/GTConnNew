"use client";

import { useEffect, useRef, useState } from "react";
import type { PageContent, StatItem } from "@/lib/types";

/**
 * Banda de estadísticas interactiva:
 *  - Los números cuentan hacia arriba al entrar en vista (transición).
 *  - Efecto constante: barrido de brillo por la banda + un "pop" que refresca
 *    los valores en bucle (siempre hay movimiento).
 * Respeta prefers-reduced-motion (muestra los valores finales, sin bucle).
 */
function Counter({
  to,
  prefix = "",
  suffix = "",
  run,
  cycle,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  run: boolean;
  cycle: number;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start: number | undefined;
    const dur = 1500;
    setVal(0);
    const step = (t: number) => {
      if (start === undefined) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to, cycle]);

  return (
    <>
      {prefix}
      {val}
      {suffix}
    </>
  );
}

// Barras del ecualizador (deterministas para evitar desajustes de hidratación)
const BARS = Array.from({ length: 44 }, (_, i) => ({
  h: 26 + ((i * 37) % 74), // altura base 26–99%
  dur: 1.8 + ((i * 7) % 9) * 0.2, // 1.8–3.4s
  delay: ((i * 5) % 13) * 0.13, // 0–1.56s
}));

export default function Stats({ stats }: { stats: NonNullable<PageContent["stats"]> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!el || typeof IntersectionObserver === "undefined" || reduce) {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Bucle: refresca el conteo cada cierto tiempo (efecto constante).
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), 4500);
    return () => window.clearInterval(id);
  }, [run]);

  return (
    <section className="section">
      <div className="container-page">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-950 px-6 py-14 sm:px-12"
        >
          {/* Ecualizador de barras (fondo translúcido en movimiento) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 flex h-28 items-end gap-1.5 px-6 [mask-image:linear-gradient(to_top,black,transparent)]"
          >
            {BARS.map((b, i) => (
              <span
                key={i}
                className="gt-bar flex-1 rounded-t-sm bg-white/12"
                style={{
                  height: `${b.h}%`,
                  ["--dur" as string]: `${b.dur}s`,
                  ["--delay" as string]: `${b.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Brillo que barre constantemente */}
          <div
            aria-hidden
            className="gt-sheen pointer-events-none absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />

          <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.items.map((s: StatItem, i) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-extrabold text-white sm:text-5xl">
                  <span key={cycle} className="gt-count-pop inline-block" style={{ animationDelay: `${i * 90}ms` }}>
                    {typeof s.to === "number" ? (
                      <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} run={run} cycle={cycle} />
                    ) : (
                      s.value
                    )}
                  </span>
                </p>
                <p className="mt-2 text-sm font-medium text-brand-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
