import type { CSSProperties, ReactNode } from "react";
import type { PageContent } from "@/lib/types";

/**
 * Sección "What's our process" al estilo "How it works", más dinámica:
 *  - Los iconos se dibujan en bucle continuo (gt-art / stroke draw).
 *  - Un punto luminoso recorre la línea que conecta los pasos.
 *  - Los círculos numerados laten suavemente.
 * Mantiene nuestra paleta (azul de marca + acentos fríos).
 */

const ACCENTS = ["#1d66f1", "#0ea5e9", "#6366f1", "#8b5cf6"];

// Atributos comunes para trazos que se dibujan (ver globals.css .gt-art)
const dr = (i: number) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  pathLength: 1,
  "data-draw": true,
  style: { ["--i" as string]: i } as CSSProperties,
});

const ICONS: ReactNode[] = [
  // Discover (brújula + búsqueda)
  <svg key="0" viewBox="0 0 24 24" className="h-full w-full">
    <circle cx="11" cy="11" r="7" {...dr(0)} />
    <path d="M13 8.5l-1.5 4-4 1.5 1.5-4z" {...dr(1)} />
    <path d="M16.5 16.5L20 20" {...dr(2)} />
  </svg>,
  // Design (lápiz)
  <svg key="1" viewBox="0 0 24 24" className="h-full w-full">
    <path d="M4 20h4L19 9a2 2 0 0 0-3-3L5 17z" {...dr(0)} />
    <path d="M14.5 7.5l2 2" {...dr(1)} />
  </svg>,
  // Develop (código)
  <svg key="2" viewBox="0 0 24 24" className="h-full w-full">
    <path d="M8 8l-4 4 4 4" {...dr(0)} />
    <path d="M16 8l4 4-4 4" {...dr(1)} />
    <path d="M13 6l-2 12" {...dr(2)} />
  </svg>,
  // Deliver (check + caja)
  <svg key="3" viewBox="0 0 24 24" className="h-full w-full">
    <path d="M4 7l8-4 8 4v8l-8 4-8-4z" {...dr(0)} />
    <path d="M8.5 11.5l2.5 2.5 4.5-5" {...dr(1)} />
  </svg>,
];

export default function ProcessCards({
  steps,
}: {
  steps: NonNullable<PageContent["steps"]>;
}) {
  const total = steps.items.length;

  return (
    <section className="section bg-slate-50">
      <div className="container-page">
        {steps.title && (
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="eyebrow">Process</p>
            <h2 className="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">{steps.title}</h2>
          </div>
        )}

        {/* Línea conectora con círculos numerados + punto que la recorre (desktop) */}
        <div className="relative mx-auto mb-8 hidden max-w-6xl lg:block">
          <div
            aria-hidden
            className="absolute left-[12.5%] top-1/2 h-0.5 w-[75%] -translate-y-1/2 bg-slate-200"
          />
          {/* Punto luminoso en movimiento */}
          <div
            aria-hidden
            className="gt-line-dot absolute top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500 shadow-[0_0_14px_3px_rgba(29,102,241,0.7)]"
          />
          <div className="relative grid grid-cols-4">
            {steps.items.map((step, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <div
                  key={step.title}
                  className="gt-ring flex h-9 w-9 items-center justify-center justify-self-center rounded-full text-sm font-bold text-white ring-4 ring-slate-50"
                  style={{ backgroundColor: accent, ["--rd" as string]: `${i * 0.4}s` }}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tarjetas */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.items.map((step, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const style: CSSProperties = { animationDelay: `${i * 100}ms` };
            return (
              <article
                key={step.title}
                style={style}
                className="gt-rise group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="gt-art flex h-11 w-11 items-center justify-center rounded-xl p-2.5"
                    style={{ backgroundColor: `${accent}1A`, color: accent }}
                  >
                    {ICONS[i % ICONS.length]}
                  </span>
                  <span className="text-xs font-semibold tracking-wider text-ink-400">
                    <span style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span> /{" "}
                    {String(total).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.text}</p>

                {step.benefits && step.benefits.length > 0 && (
                  <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                    {step.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-3">
                        <span
                          className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${accent}26` }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                        </span>
                        <span className="text-sm text-ink-500">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
