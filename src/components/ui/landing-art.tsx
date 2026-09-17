import type { CSSProperties } from "react";

/*
  Ilustraciones de línea para el Landing (se dibujan en bucle con gt-art y flotan
  en 3D con gt-art-3d). Mismos fundamentos que service-art: cada trazo lleva
  data-draw, pathLength={1} y un --i para desfasar el dibujado.
*/

const S = (i: number): CSSProperties => ({ ["--i" as string]: i });
const c = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  pathLength: 1,
  "data-draw": true,
};

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 140 100" className="h-full w-full text-brand-600" aria-hidden>
      {children}
    </svg>
  );
}

/** Primera impresión — laptop + móvil (diseños adaptables). */
function Impression() {
  return (
    <Svg>
      <rect x="10" y="16" width="82" height="52" rx="4" {...c} style={S(0)} />
      <path d="M10 28 H92" {...c} style={S(1)} />
      <circle cx="16" cy="22" r="1.4" {...c} style={S(2)} />
      <circle cx="22" cy="22" r="1.4" {...c} style={S(2)} />
      <path d="M18 38 H50 M18 46 H44 M18 54 H54" {...c} style={S(3)} />
      <rect x="62" y="36" width="22" height="22" rx="2" {...c} style={S(4)} />
      <path d="M4 74 H98" {...c} style={S(5)} />
      <rect x="98" y="44" width="30" height="48" rx="6" {...c} style={S(6)} />
      <path d="M108 50 H118" {...c} style={S(7)} />
      <path d="M104 60 H122 M104 68 H116" {...c} style={S(8)} />
      <rect x="104" y="76" width="18" height="9" rx="3" {...c} style={S(9)} />
    </Svg>
  );
}

/** Generar leads — lista de suscriptores. */
function Leads() {
  return (
    <Svg>
      {[0, 1, 2].map((r) => {
        const y = 20 + r * 24;
        return (
          <g key={r}>
            <rect x="14" y={y} width="112" height="18" rx="4" {...c} style={S(r * 2)} />
            <circle cx={26} cy={y + 9} r="5" {...c} style={S(r * 2 + 1)} />
            <path d={`M38 ${y + 6} H104`} {...c} style={S(r * 2 + 1)} />
            <path d={`M38 ${y + 12} H86`} {...c} style={S(r * 2 + 2)} />
            <path d={`M114 ${y + 9} l3 3 l5 -6`} {...c} style={S(r * 2 + 2)} />
          </g>
        );
      })}
    </Svg>
  );
}

/** Vender producto/servicio — avatares conectados a un correo. */
function Sell() {
  return (
    <Svg>
      <rect x="52" y="20" width="52" height="34" rx="4" {...c} style={S(0)} />
      <path d="M52 24 L78 42 L104 24" {...c} style={S(1)} />
      <circle cx="24" cy="30" r="9" {...c} style={S(2)} />
      <circle cx="20" cy="70" r="9" {...c} style={S(3)} />
      <circle cx="52" cy="82" r="9" {...c} style={S(4)} />
      <path d="M33 34 C44 40 46 40 52 40" {...c} style={S(5)} />
      <path d="M28 66 C40 54 44 50 55 46" {...c} style={S(6)} />
      <path d="M60 78 C72 66 74 60 82 56" {...c} style={S(7)} />
      <path d="M100 66 l4 6 8 -12" {...c} style={S(8)} />
      <circle cx="106" cy="70" r="12" {...c} style={S(8)} />
    </Svg>
  );
}

/** Crecer audiencia — gráfico de barras en ascenso + flecha. */
function Growth() {
  return (
    <Svg>
      <path d="M20 84 H124" {...c} style={S(0)} />
      <path d="M20 84 V20" {...c} style={S(0)} />
      <rect x="30" y="62" width="14" height="22" rx="2" {...c} style={S(1)} />
      <rect x="52" y="50" width="14" height="34" rx="2" {...c} style={S(2)} />
      <rect x="74" y="38" width="14" height="46" rx="2" {...c} style={S(3)} />
      <rect x="96" y="26" width="14" height="58" rx="2" {...c} style={S(4)} />
      <path d="M28 58 L52 46 L74 34 L112 16" {...c} style={S(5)} />
      <path d="M100 16 H112 V28" {...c} style={S(6)} />
    </Svg>
  );
}

const ART: Record<string, () => React.ReactNode> = {
  impression: Impression,
  leads: Leads,
  sell: Sell,
  growth: Growth,
};

export function LandingArt({ name }: { name: string }) {
  const Cmp = ART[name] ?? Impression;
  return <Cmp />;
}
