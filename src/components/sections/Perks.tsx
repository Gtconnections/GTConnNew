import SmartLink from "@/components/SmartLink";
import type { PageContent } from "@/lib/types";

/** Cinta/medalla que se dibuja sola (gt-art) y flota en 3D (gt-art-3d). */
function Badge() {
  const c = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    pathLength: 1,
    "data-draw": true,
  };
  return (
    <svg viewBox="0 0 64 72" className="h-full w-full text-brand-600" aria-hidden>
      <circle cx="32" cy="26" r="20" {...c} style={{ ["--i" as string]: 0 }} />
      <circle cx="32" cy="26" r="12" {...c} style={{ ["--i" as string]: 1 }} />
      <path d="M27 26 l4 4 7 -8" {...c} style={{ ["--i" as string]: 2 }} />
      <path d="M22 44 L16 66 L26 60 L30 68" {...c} style={{ ["--i" as string]: 3 }} />
      <path d="M42 44 L48 66 L38 60 L34 68" {...c} style={{ ["--i" as string]: 4 }} />
    </svg>
  );
}

export default function Perks({ perks }: { perks: NonNullable<PageContent["perks"]> }) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="gt-rise relative mx-auto flex max-w-3xl flex-col items-center overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-b from-brand-50 to-white px-6 py-12 text-center shadow-sm">
          <div className="gt-art [perspective:800px]">
            <div className="gt-art-3d h-20 w-20">
              <Badge />
            </div>
          </div>

          {perks.title && (
            <h2 className="mt-4 text-2xl font-bold text-ink-900 sm:text-3xl">{perks.title}</h2>
          )}
          {perks.text && (
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-500">{perks.text}</p>
          )}

          {perks.items && perks.items.length > 0 && (
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {perks.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-ink-700">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {perks.ctas && perks.ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {perks.ctas.map((cta, i) => (
                <SmartLink
                  key={cta.label}
                  href={cta.href}
                  external={cta.external}
                  className={i === 0 ? "btn-primary gt-cta-pulse" : "btn-outline"}
                >
                  {cta.label}
                </SmartLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
