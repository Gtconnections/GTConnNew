import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { PageContent, TestimonialItem } from "@/lib/types";

/**
 * Testimonios — estilo "testimonials-3" (tarjetas con líneas de borde, ícono de
 * comillas, avatar y escalonado diagonal), adaptado a nuestra paleta y contenido.
 */
function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

function Card({ t, index }: { t: TestimonialItem; index: number }) {
  return (
    <figure
      className="group relative flex flex-col justify-between gap-6 px-8 pb-6 pt-8 md:translate-y-[calc(3rem*var(--t))]"
      style={{ ["--t" as string]: index, ["--d" as string]: `${index * 0.6}s` }}
    >
      {/* Líneas de borde tipo "celda" */}
      <div className="absolute -inset-y-4 -left-px w-px bg-slate-200" />
      <div className="absolute -inset-y-4 -right-px w-px bg-slate-200" />
      <div className="absolute -inset-x-4 -top-px h-px bg-slate-200" />
      <div className="absolute -bottom-px -left-4 -right-4 h-px bg-slate-200" />
      {/* Cruz decorativa en la esquina */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-[1] size-3.5 -translate-x-1/2 -translate-y-1/2 text-brand-400"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>

      {/* LED que recorre el borde izquierdo y luego el superior */}
      <span aria-hidden className="pointer-events-none absolute -bottom-4 -left-px -top-4 z-[2] w-px">
        <span className="gt-led-left absolute left-0 h-10 w-px bg-gradient-to-b from-transparent via-brand-500 to-transparent shadow-[0_0_8px_1px_rgba(29,102,241,0.85)]" />
      </span>
      <span aria-hidden className="pointer-events-none absolute -left-4 -right-4 -top-px z-[2] h-px">
        <span className="gt-led-top absolute top-0 h-px w-10 bg-gradient-to-r from-transparent via-brand-500 to-transparent shadow-[0_0_8px_1px_rgba(29,102,241,0.85)]" />
      </span>

      <blockquote className="flex gap-4">
        <QuoteIcon className="size-6 shrink-0 text-brand-400" />
        <p className="flex-1 text-base leading-relaxed text-ink-700">{t.review}</p>
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <Avatar className="size-10 ring-2 ring-slate-200 ring-offset-2 ring-offset-slate-50 transition-shadow group-hover:ring-brand-300">
          <AvatarFallback className="bg-brand-100 text-sm font-semibold text-brand-700">
            {initials(t.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="text-sm font-medium not-italic text-ink-900">{t.name}</cite>
          <p className="text-xs text-ink-500">
            {t.role}
            {t.location ? (
              <>
                , <span className="text-ink-700">{t.location}</span>
              </>
            ) : null}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({
  testimonials,
}: {
  testimonials: NonNullable<PageContent["testimonials"]>;
}) {
  return (
    <section className="section bg-slate-50">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Testimonials</p>
          {testimonials.title && (
            <h2 className="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">
              {testimonials.title}
            </h2>
          )}
          {testimonials.subtitle && (
            <p className="mt-4 text-lg text-ink-500">{testimonials.subtitle}</p>
          )}
        </div>

        {/* pb reserva el espacio del escalonado diagonal (translate-y hasta 6rem)
            para que los bordes/LED no invadan la sección siguiente (FAQ). */}
        <div className="mx-auto mt-16 grid w-full max-w-5xl gap-8 pb-8 md:grid-cols-3 md:gap-6 md:pb-32">
          {testimonials.items.map((t, i) => (
            <Card key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
