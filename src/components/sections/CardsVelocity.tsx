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

// Familia de azules de marca para el glow (varía por tarjeta, mantiene la paleta)
const GLOWS = [
  "from-brand-500/25",
  "from-sky-500/25",
  "from-blue-500/25",
  "from-cyan-500/25",
  "from-indigo-500/25",
];

export default function CardsVelocity({ cards }: { cards: NonNullable<PageContent["cards"]> }) {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 sm:py-28">
      {/* Textura de líneas diagonales con desvanecido superior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 9px)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, #000 60%, transparent 110%)",
          maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, #000 60%, transparent 110%)",
        }}
      />

      <div className="container-page relative z-10">
        {/* Encabezado */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            {cards.eyebrow && (
              <p className="gt-rise mb-3 font-mono text-xs uppercase tracking-[0.3em] text-brand-400">
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
            <p className="gt-rise max-w-xs text-sm leading-relaxed text-slate-400" style={{ animationDelay: "120ms" }}>
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
                className="gt-rise group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-500 hover:border-white/20"
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
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/10 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-6 text-white" />
                  </div>
                  <div className="mt-10 space-y-3">
                    {card.label && (
                      <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                        {card.label}
                      </span>
                    )}
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">{card.text}</p>
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
