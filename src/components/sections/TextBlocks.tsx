import SmartLink from "@/components/SmartLink";
import type { PageContent } from "@/lib/types";

export function Intro({ intro }: { intro: NonNullable<PageContent["intro"]> }) {
  return (
    <section className="section">
      <div className="container-page flex max-w-3xl flex-col items-center text-center">
        {intro.icon && (
          <div className="gt-art mb-6 [perspective:600px]">
            <div className="gt-art-3d flex size-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
              <IntroIcon name={intro.icon} />
            </div>
          </div>
        )}
        {intro.title && (
          <h2 className="gt-rise text-3xl font-bold text-ink-900 sm:text-4xl">{intro.title}</h2>
        )}
        <p
          className="gt-rise mt-4 text-lg leading-relaxed text-ink-500"
          style={{ animationDelay: "90ms" }}
        >
          {intro.text}
        </p>
        {intro.cta && (
          <SmartLink
            href={intro.cta.href}
            external={intro.cta.external}
            className="btn-primary gt-rise mt-8"
            style={{ animationDelay: "180ms" }}
          >
            {intro.cta.label}
          </SmartLink>
        )}
      </div>
    </section>
  );
}

function IntroIcon({ name }: { name: string }) {
  const c = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    pathLength: 1,
    "data-draw": true,
  };
  return (
    <svg viewBox="0 0 40 40" className="size-9" aria-hidden data-name={name}>
      <rect x="7" y="9" width="26" height="18" rx="2" {...c} style={{ ["--i" as string]: 0 }} />
      <path d="M7 15 H33" {...c} style={{ ["--i" as string]: 1 }} />
      <path d="M12 21 H22" {...c} style={{ ["--i" as string]: 2 }} />
      <path d="M14 31 H26 M20 27 V31" {...c} style={{ ["--i" as string]: 3 }} />
    </svg>
  );
}

export function MissionVision({
  mission,
  vision,
}: {
  mission?: PageContent["mission"];
  vision?: PageContent["vision"];
}) {
  const blocks = [mission, vision].filter(Boolean) as { title?: string; text: string }[];
  if (blocks.length === 0) return null;

  return (
    <section className="section bg-slate-50">
      <div className="container-page">
        <div className={`grid gap-6 ${blocks.length === 2 ? "md:grid-cols-2" : ""}`}>
          {blocks.map((block, i) => (
            <div
              key={block.title ?? i}
              className="gt-rise group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-200"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Barra de acento superior que aparece en hover */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-700 transition-transform duration-300 group-hover:scale-x-100" />
              {block.title && (
                <h2 className="text-xl font-bold text-brand-700">{block.title}</h2>
              )}
              <p className="mt-3 leading-relaxed text-ink-700">{block.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
