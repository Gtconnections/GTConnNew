import SmartLink from "@/components/SmartLink";
import DomainSearch from "@/components/DomainSearch";
import LogoMark from "@/components/ui/logo-mark";
import type { PageContent, SiteConfig } from "@/lib/types";

/**
 * Hero de subpáginas — mismos fundamentos que el Home (versión ligera, sin canvas):
 *  - Icono de marca girando en 3D de fondo (gt-sway3d), tenue.
 *  - Entrada escalonada palabra por palabra / bloque por bloque (gt-rise, CSS puro).
 *  - Degradado de marca y buen aire vertical.
 * Server component; las animaciones son CSS y terminan visibles.
 */
export default function Hero({
  hero,
  site,
}: {
  hero: NonNullable<PageContent["hero"]>;
  site: SiteConfig;
}) {
  const words = hero.title.split(" ").filter(Boolean);
  const highlight = (hero.titleHighlight ?? "").split(" ").filter(Boolean);
  const step = 70;
  const base = 90;
  let d = base;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-50 to-white">
      {/* Icono de marca girando en 3D de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <LogoMark className="gt-sway3d h-[80vmin] w-[80vmin] max-w-none text-brand-500/[0.12]" />
      </div>

      <div className="container-page relative z-10 py-24 text-center sm:py-32">
        {hero.eyebrow && (
          <p className="eyebrow gt-rise" style={{ animationDelay: "0ms" }}>
            {hero.eyebrow}
          </p>
        )}

        <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
          {words.map((w, i) => {
            d = base + i * step;
            return (
              <span key={`w-${i}`} className="gt-rise mr-[0.25em] inline-block" style={{ animationDelay: `${d}ms` }}>
                {w}
              </span>
            );
          })}
          {highlight.map((w, i) => {
            d = base + (words.length + i) * step;
            return (
              <span key={`h-${i}`} className="gt-rise mr-[0.25em] inline-block" style={{ animationDelay: `${d}ms` }}>
                <span className="gt-text-gradient">{w}</span>
              </span>
            );
          })}
        </h1>

        {hero.subtitle && (
          <p
            className="gt-rise mx-auto mt-5 max-w-2xl text-lg text-ink-500"
            style={{ animationDelay: `${d + step + 40}ms` }}
          >
            {hero.subtitle}
          </p>
        )}

        {hero.showDomainSearch && (
          <div className="gt-rise mt-8" style={{ animationDelay: `${d + step + 120}ms` }}>
            <DomainSearch site={site} />
          </div>
        )}

        {hero.ctas && hero.ctas.length > 0 && (
          <div
            className="gt-rise mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: `${d + step + 180}ms` }}
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
      </div>
    </section>
  );
}
