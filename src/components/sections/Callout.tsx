import { Fragment } from "react";
import SmartLink from "@/components/SmartLink";
import { FloatingPaths } from "@/components/ui/background-paths";
import type { PageContent } from "@/lib/types";

/**
 * Callout / CTA destacado — estilo "Background Paths" (21st.dev) adaptado a la
 * marca: panel con degradado azul profundo, líneas SVG que fluyen de fondo y
 * un título que se revela letra por letra. Es la sección que más resalta.
 *
 * Todo se renderiza en el servidor y con CSS puro: el texto, los botones y las
 * líneas son visibles por defecto; las animaciones son solo una mejora, así que
 * nunca quedan invisibles aunque el JS no corra.
 */
export default function Callout({
  callout,
}: {
  callout: NonNullable<PageContent["callout"]>;
}) {
  const words = callout.title.split(" ");
  let gi = 0; // índice global de letra para el retraso escalonado

  return (
    <section className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-800 to-brand-950 px-6 py-20 text-center shadow-2xl shadow-brand-900/30 sm:px-10 sm:py-24">
          {/* Líneas animadas de fondo (CSS puro, siempre visibles) */}
          <div className="absolute inset-0 text-white/40">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>
          {/* Brillo superior suave */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-1/2 h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16),transparent_60%)]"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Título letra por letra */}
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {words.map((word, wi) => (
                <Fragment key={wi}>
                  <span className="inline-block">
                    {[...word].map((letter) => {
                      const i = gi++;
                      return (
                        <span
                          key={i}
                          className="gt-letter bg-gradient-to-b from-white to-brand-200 bg-clip-text text-transparent"
                          style={{ "--i": i } as React.CSSProperties}
                        >
                          {letter}
                        </span>
                      );
                    })}
                  </span>
                  {wi < words.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </h2>

            {callout.text && (
              <p
                className="gt-rise mx-auto mt-6 max-w-xl text-lg text-brand-100"
                style={{ animationDelay: "0.4s" }}
              >
                {callout.text}
              </p>
            )}

            {callout.ctas && callout.ctas.length > 0 && (
              <div
                className="gt-rise mt-10 flex flex-wrap items-center justify-center gap-4"
                style={{ animationDelay: "0.55s" }}
              >
                {callout.ctas.map((cta, i) => (
                  <SmartLink
                    key={cta.label}
                    href={cta.href}
                    external={cta.external}
                    className={
                      i === 0
                        ? "btn gt-cta-pulse bg-white px-7 py-3.5 text-base text-brand-700 shadow-lg hover:bg-brand-50"
                        : "btn border border-white/60 px-7 py-3.5 text-base text-white backdrop-blur-sm hover:bg-white/10"
                    }
                  >
                    {cta.label}
                  </SmartLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
