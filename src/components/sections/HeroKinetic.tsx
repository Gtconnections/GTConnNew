"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import SmartLink from "@/components/SmartLink";
import DomainSearch from "@/components/DomainSearch";
import KineticGrid from "@/components/ui/kinetic-grid";
import NeuralNet from "@/components/ui/neural-net";
import LogoMark from "@/components/ui/logo-mark";
import type { PageContent, SiteConfig } from "@/lib/types";

/**
 * Hero del Home con fondo interactivo (KineticGrid) en tema claro.
 * Efectos:
 *  - Entrada palabra por palabra (CSS gt-rise, escalonada) — siempre termina visible.
 *  - Parte del título con degradado animado que fluye.
 *  - Badge con punto pulsante.
 *  - Parallax por capas con el mouse (mejora progresiva; respeta reduce-motion).
 */
export default function HeroKinetic({
  hero,
  site,
}: {
  hero: NonNullable<PageContent["hero"]>;
  site: SiteConfig;
}) {
  const [p, setP] = useState({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let nx = 0;
    let ny = 0;
    const onMove = (e: MouseEvent) => {
      nx = e.clientX / window.innerWidth - 0.5;
      ny = e.clientY / window.innerHeight - 0.5;
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          raf.current = 0;
          setP({ x: nx, y: ny });
        });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Parallax helper: depth positivo mueve en sentido contrario al cursor.
  const layer = (depth: number): CSSProperties => ({
    transform: `translate3d(${(-p.x * depth * 22).toFixed(2)}px, ${(-p.y * depth * 22).toFixed(2)}px, 0)`,
    transition: "transform 200ms ease-out",
    willChange: "transform",
  });

  // Palabras del título con delay escalonado.
  const prefix = hero.title.split(" ").filter(Boolean);
  const highlight = (hero.titleHighlight ?? "").split(" ").filter(Boolean);
  let d = 0;
  const step = 70;
  const base = 120;

  return (
    <KineticGrid
      theme="light"
      className="min-h-[100svh] bg-gradient-to-b from-brand-100 via-brand-50 to-white"
    >
      {/* Red neuronal sutil sobre el fondo (azul de marca, mismos colores) */}
      <NeuralNet className="absolute inset-0 z-0 h-full w-full opacity-80" />

      {/* Icono de marca gigante girando de fondo (siempre en movimiento) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <LogoMark className="gt-sway3d h-[92vmin] w-[92vmin] max-w-none text-brand-600/[0.26]" />
      </div>

      <div className="container-page relative z-10 flex min-h-[100svh] flex-col items-center justify-center py-28 text-center">
        {/* Badge */}
        {hero.eyebrow && (
          <div style={layer(0.6)}>
            <span
              className="gt-rise inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm backdrop-blur"
              style={{ animationDelay: "0ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="gt-ping absolute inline-flex h-full w-full rounded-full bg-brand-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
              </span>
              {hero.eyebrow}
            </span>
          </div>
        )}

        {/* Título palabra por palabra */}
        <h1
          style={layer(1)}
          className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl"
        >
          {prefix.map((w, i) => {
            d = base + i * step;
            return (
              <span
                key={`p-${i}`}
                className="gt-rise mr-[0.25em] inline-block"
                style={{ animationDelay: `${d}ms` }}
              >
                {w}
              </span>
            );
          })}
          {highlight.map((w, i) => {
            d = base + (prefix.length + i) * step;
            return (
              <span
                key={`h-${i}`}
                className="gt-rise mr-[0.25em] inline-block"
                style={{ animationDelay: `${d}ms` }}
              >
                <span className="gt-text-gradient">{w}</span>
              </span>
            );
          })}
        </h1>

        {/* Subtítulo */}
        {hero.subtitle && (
          <div style={layer(0.5)}>
            <p
              className="gt-rise mx-auto mt-6 max-w-2xl text-lg text-ink-500"
              style={{ animationDelay: `${d + step + 60}ms` }}
            >
              {hero.subtitle}
            </p>
          </div>
        )}

        {/* Buscador */}
        {hero.showDomainSearch && (
          <div
            className="gt-rise mt-8 w-full"
            style={{ ...layer(0.35), animationDelay: `${d + step + 160}ms` }}
          >
            <DomainSearch site={site} />
          </div>
        )}

        {/* CTAs opcionales */}
        {hero.ctas && hero.ctas.length > 0 && (
          <div
            className="gt-rise mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: `${d + step + 220}ms` }}
          >
            {hero.ctas.map((cta, i) => (
              <SmartLink
                key={cta.label}
                href={cta.href}
                external={cta.external}
                className={i === 0 ? "btn-primary" : "btn-outline"}
              >
                {cta.label}
              </SmartLink>
            ))}
          </div>
        )}

        {/* Fila de confianza */}
        {hero.trust && (
          <div
            className="gt-rise mt-8 flex items-center gap-3"
            style={{ ...layer(0.5), animationDelay: `${d + step + 280}ms` }}
          >
            {hero.trust.rating && (
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={i < (hero.trust!.rating ?? 5) ? "h-5 w-5 text-amber-400" : "h-5 w-5 text-slate-300"}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                ))}
              </div>
            )}
            <p className="text-sm font-medium text-ink-500">{hero.trust.text}</p>
          </div>
        )}
      </div>
    </KineticGrid>
  );
}
