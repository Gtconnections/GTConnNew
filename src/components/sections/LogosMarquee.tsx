import type { PageContent } from "@/lib/types";

/**
 * Franja de "clientes" con carrusel infinito hacia la IZQUIERDA + un LÁSER que
 * barre hacia la DERECHA encendiendo los nombres en azul de marca a su paso.
 *
 * Capas:
 *  1. Base: nombres tenues (estado apagado).
 *  2. Reveal: los mismos nombres en brillante, revelados por una máscara-banda
 *     que se desplaza a la derecha (el "encendido" del láser).
 *  3. Beam: el haz visible (núcleo + glow) que barre a la derecha.
 * Todo en CSS puro; degrada bien (sin láser) si se prefiere menos movimiento.
 */
export default function LogosMarquee({
  logos,
}: {
  logos: NonNullable<PageContent["logos"]>;
}) {
  const items = [...logos.items, ...logos.items]; // duplicado para loop continuo

  const Track = ({ variant }: { variant: "base" | "bright" }) => (
    <div className="gt-marquee-track gap-14 px-7">
      {items.map((name, i) => (
        <span
          key={`${variant}-${name}-${i}`}
          className={
            variant === "bright"
              ? "whitespace-nowrap text-xl font-bold tracking-tight text-brand-600 [filter:drop-shadow(0_0_12px_rgba(29,102,241,0.55))]"
              : "whitespace-nowrap text-xl font-bold tracking-tight text-slate-300"
          }
        >
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-gradient-to-b from-white to-slate-50 py-10">
      <div className="container-page">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-ink-500">
          {logos.title ?? "Trusted by our clients"}
        </p>
      </div>

      <div className="gt-marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* 1. Base tenue */}
        <Track variant="base" />

        {/* 2. Capa brillante revelada por el láser */}
        <div className="gt-laser-reveal pointer-events-none absolute inset-0 flex items-center" aria-hidden>
          <Track variant="bright" />
        </div>

        {/* 3. Haz del láser */}
        <div className="gt-laser-beam pointer-events-none absolute inset-y-0 z-10" aria-hidden>
          {/* halo ancho */}
          <div className="absolute inset-y-0 left-1/2 w-40 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.35),transparent_70%)] blur-2xl" />
          {/* núcleo */}
          <div className="absolute inset-y-2 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-300 via-white to-brand-500 shadow-[0_0_18px_4px_rgba(56,189,248,0.85)]" />
        </div>
      </div>
    </section>
  );
}
