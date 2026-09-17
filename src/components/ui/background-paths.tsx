import { cn } from "@/lib/utils";

/**
 * FloatingPaths — líneas SVG que fluyen de forma continua (estilo 21st.dev),
 * reescrito en CSS puro (sin JS). Los trazos son visibles por defecto y el
 * movimiento (flujo del guion) es una mejora vía animación CSS `gt-flow`.
 * `className` controla el color base (currentColor). Úsalo p.ej. text-white
 * sobre un fondo oscuro de marca.
 */
export function FloatingPaths({
  position,
  className,
}: {
  position: number;
  className?: string;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.35 + i * 0.018,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className={cn("h-full w-full", className)}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <path
            key={path.id}
            className="gt-flow-path"
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.05 + path.id * 0.014}
            pathLength={1}
            strokeDasharray="0.9 0.1"
            style={
              {
                "--dur": `${10 + (path.id % 8)}s`,
                "--fd": `${-(path.id * 0.3)}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}
