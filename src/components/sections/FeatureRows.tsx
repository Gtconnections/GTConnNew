import SmartLink from "@/components/SmartLink";
import { LandingArt } from "@/components/ui/landing-art";
import type { PageContent } from "@/lib/types";

/**
 * Filas alternas imagen/texto (estilo del landing original) con nuestros
 * fundamentos: ilustración que se dibuja sola (gt-art) y flota en 3D (gt-art-3d)
 * sobre un blob de marca, y texto con entrada animada (gt-rise). CSS puro.
 */
export default function FeatureRows({
  features,
}: {
  features: NonNullable<PageContent["features"]>;
}) {
  return (
    <section className="section">
      <div className="container-page">
        {features.title && (
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="gt-rise text-3xl font-bold text-ink-900 sm:text-4xl">{features.title}</h2>
            {features.subtitle && (
              <p className="gt-rise mt-4 text-lg text-ink-500" style={{ animationDelay: "90ms" }}>
                {features.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="space-y-16 sm:space-y-24">
          {features.items.map((f, i) => {
            const imageRight = i % 2 === 1;
            return (
              <div
                key={f.title}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                {/* Ilustración */}
                <div
                  className={`group relative flex justify-center ${imageRight ? "md:order-2" : ""}`}
                >
                  {/* Blob de marca detrás */}
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 -z-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/70 blur-2xl"
                  />
                  <div className="gt-art relative z-10 flex h-56 w-full items-center justify-center rounded-3xl border border-slate-200 bg-white/60 shadow-sm ring-1 ring-inset ring-brand-100 [perspective:900px]">
                    <div className="gt-art-3d h-36 w-56">
                      <LandingArt name={f.icon} />
                    </div>
                  </div>
                </div>

                {/* Texto */}
                <div className={imageRight ? "md:order-1" : ""}>
                  <h3 className="gt-rise text-2xl font-bold text-ink-900 sm:text-3xl">{f.title}</h3>
                  <p
                    className="gt-rise mt-4 text-lg leading-relaxed text-ink-500"
                    style={{ animationDelay: "80ms" }}
                  >
                    {f.text}
                  </p>
                  {f.cta && (
                    <SmartLink
                      href={f.cta.href}
                      external={f.cta.external}
                      className="btn-primary gt-rise mt-6"
                      style={{ animationDelay: "160ms" }}
                    >
                      {f.cta.label}
                    </SmartLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
