import { Store, Tags, CreditCard, LifeBuoy, Server, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PageContent } from "@/lib/types";

/**
 * Cards estilo "Feature Velocity" (21st.dev) adaptado a la marca: sección oscura
 * con textura diagonal, títulos grandes en mayúsculas y tarjetas con glow de marca
 * al pasar el mouse. Se alimenta del contenido `cards` (variant: "velocity").
 */
const ICONS: Record<string, LucideIcon> = {
  store: Store,
  tags: Tags,
  card: CreditCard,
  support: LifeBuoy,
  server: Server,
};

// Glow claro que aparece al hover sobre el fondo azul (varía sutil por tarjeta)
const GLOWS = [
  "from-white/20",
  "from-sky-200/25",
  "from-cyan-200/25",
  "from-brand-200/25",
  "from-white/20",
];

export default function CardsVelocity({ cards }: { cards: NonNullable<PageContent["cards"]> }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 py-20 sm:py-28">
      {/* Textura de líneas diagonales con desvanecido superior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 9px)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, #000 60%, transparent 110%)",
          maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, #000 60%, transparent 110%)",
        }}
      />
      {/* Brillo superior suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1/3 h-2/3 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_60%)]"
      />

      <div className="container-page relative z-10">
        {/* Encabezado */}
        <div className="flex flex-col gap-8 border-b border-white/20 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            {cards.eyebrow && (
              <p className="gt-rise mb-3 font-mono text-xs uppercase tracking-[0.3em] text-brand-100">
                {cards.eyebrow}
              </p>
            )}
            {cards.title && (
              <h2 className="gt-rise text-4xl font-black uppercase leading-none tracking-tighter text-white sm:text-5xl md:text-6xl">
                {cards.title}
              </h2>
            )}
          </div>
          {cards.subtitle && (
            <p className="gt-rise max-w-xs text-sm leading-relaxed text-brand-100" style={{ animationDelay: "120ms" }}>
              {cards.subtitle}
            </p>
          )}
        </div>

        {/* Grid de tarjetas */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.items.map((card, i) => {
            const Icon = ICONS[card.icon ?? ""] ?? Store;
            return (
              <div
                key={card.title}
                className="gt-rise group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-8 backdrop-blur-sm transition-colors duration-500 hover:border-white/40"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Glow de marca al hover */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100",
                    GLOWS[i % GLOWS.length],
                  )}
                />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-inset ring-white/25 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-6 text-white" />
                  </div>
                  <div className="mt-10 space-y-3">
                    {card.label && (
                      <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-brand-200">
                        {card.label}
                      </span>
                    )}
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-100">{card.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
