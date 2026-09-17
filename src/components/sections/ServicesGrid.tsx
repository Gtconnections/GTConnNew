import SmartLink from "@/components/SmartLink";
import { ServiceArt } from "@/components/ui/service-art";
import type { PageContent, ServiceItem } from "@/lib/types";

/**
 * Grid de servicios (sin expansión). Al pasar el mouse por una tarjeta:
 *  - el gráfico se inclina en 3D (gt-art-3d) mientras se sigue dibujando (gt-art),
 *  - el enlace "Know more" se transforma de texto a botón con una transición
 *    progresiva y fluida (group-hover + transition-all).
 * Todo con CSS puro: server component, sin JS.
 */
function CardArt({ s }: { s: ServiceItem }) {
  return (
    <div className="gt-art flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 ring-1 ring-inset ring-brand-100 [perspective:700px]">
      <div className="gt-art-3d h-24 w-40">
        <ServiceArt name={s.icon} />
      </div>
    </div>
  );
}

/** "Know more": texto que se convierte en botón al hacer hover en la tarjeta. */
function KnowMore() {
  return (
    <div className="mt-5 flex h-10 items-center">
      <span className="inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-brand-600 transition-all duration-500 ease-out group-hover:bg-brand-600 group-hover:px-5 group-hover:py-2.5 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-600/30">
        Know more
        <svg
          className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  );
}

export default function ServicesGrid({
  services,
}: {
  services: NonNullable<PageContent["services"]>;
}) {
  return (
    <section className="section bg-gradient-to-b from-slate-50 to-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Services</p>
          {services.title && (
            <h2 className="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">{services.title}</h2>
          )}
          {services.subtitle && <p className="mt-4 text-lg text-ink-500">{services.subtitle}</p>}
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((s) => (
            <SmartLink
              key={s.title}
              href={s.href ?? "#"}
              external={s.external}
              className={`group relative flex h-full flex-col rounded-2xl transition-shadow duration-300 ease-out hover:shadow-lg ${
                s.highlight
                  ? "bg-gradient-to-br from-brand-500 to-brand-800 p-px shadow-lg"
                  : "border border-slate-200 bg-white p-6 shadow-md hover:border-brand-200"
              }`}
            >
              {s.highlight ? (
                <span className="flex h-full flex-col rounded-[15px] bg-white p-6">
                  <CardArt s={s} />
                  <span className="mt-6 block text-lg font-semibold text-ink-900">{s.title}</span>
                  <span className="mt-2 block flex-1 text-sm leading-relaxed text-ink-500">{s.text}</span>
                  <KnowMore />
                </span>
              ) : (
                <>
                  <CardArt s={s} />
                  <span className="mt-6 block text-lg font-semibold text-ink-900">{s.title}</span>
                  <span className="mt-2 block flex-1 text-sm leading-relaxed text-ink-500">{s.text}</span>
                  <KnowMore />
                </>
              )}
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
