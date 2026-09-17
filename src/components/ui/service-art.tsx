import type { CSSProperties } from "react";

/*
  Ilustraciones de línea "boceto" que se dibujan en bucle continuo
  (ver globals.css .gt-art). Cada trazo lleva data-draw, pathLength={1} y un --i
  para desfasar el dibujado (siempre hay movimiento).
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
    <svg viewBox="0 0 120 84" className="h-full w-full text-brand-600" aria-hidden>
      {children}
    </svg>
  );
}

function Web() {
  return (
    <Svg>
      <rect x="8" y="8" width="104" height="68" rx="7" {...c} style={S(0)} />
      <path d="M8 24 H112" {...c} style={S(1)} />
      <circle cx="16" cy="16" r="1.6" {...c} style={S(2)} />
      <circle cx="23" cy="16" r="1.6" {...c} style={S(2)} />
      <circle cx="30" cy="16" r="1.6" {...c} style={S(2)} />
      <rect x="14" y="30" width="26" height="38" rx="3" {...c} style={S(3)} />
      <path d="M48 34 H104" {...c} style={S(4)} />
      <path d="M48 44 H92" {...c} style={S(5)} />
      <path d="M50 68 H74 M54 68 V60 M62 68 V54 M70 68 V62" {...c} style={S(6)} />
      <path d="M95 51 L95 67 L99 63 L102 69 L104 68 L101 62 L106 62 Z" {...c} style={S(7)} />
    </Svg>
  );
}

function Ecommerce() {
  return (
    <Svg>
      <path d="M20 18 H30 L38 52 H84 L90 28 H36" {...c} style={S(0)} />
      <circle cx="44" cy="64" r="5" {...c} style={S(1)} />
      <circle cx="78" cy="64" r="5" {...c} style={S(1)} />
      <path d="M50 28 V48 M64 28 V48" {...c} style={S(2)} />
      <path d="M52 38 H78" {...c} style={S(3)} />
      <rect x="92" y="34" width="20" height="24" rx="2" {...c} style={S(4)} />
      <path d="M97 42 H107 M97 48 H105" {...c} style={S(5)} />
    </Svg>
  );
}

function App() {
  return (
    <Svg>
      <rect x="42" y="6" width="36" height="72" rx="8" {...c} style={S(0)} />
      <path d="M56 12 H64" {...c} style={S(1)} />
      <circle cx="68" cy="12" r="1" {...c} style={S(1)} />
      <path d="M50 24 H70" {...c} style={S(2)} />
      <path d="M50 33 H64" {...c} style={S(3)} />
      <path d="M50 60 H70 M54 60 V54 M60 60 V50 M66 60 V56" {...c} style={S(4)} />
      <circle cx="52" cy="70" r="1.4" {...c} style={S(5)} />
      <circle cx="60" cy="70" r="1.4" {...c} style={S(5)} />
      <circle cx="68" cy="70" r="1.4" {...c} style={S(5)} />
    </Svg>
  );
}

function Landing() {
  return (
    <Svg>
      <rect x="16" y="8" width="88" height="68" rx="5" {...c} style={S(0)} />
      <rect x="26" y="16" width="68" height="22" rx="3" {...c} style={S(1)} />
      <circle cx="40" cy="26" r="4" {...c} style={S(2)} />
      <path d="M30 34 L40 26 L50 34" {...c} style={S(2)} />
      <path d="M26 48 H84" {...c} style={S(3)} />
      <path d="M26 57 H66" {...c} style={S(4)} />
      <rect x="26" y="63" width="30" height="8" rx="3" {...c} style={S(5)} />
    </Svg>
  );
}

function Hosting() {
  return (
    <Svg>
      <path d="M34 26 q0 -12 13 -11 q4 -9 15 -5 q11 -2 11 9 q9 0 8 8" {...c} style={S(0)} />
      <rect x="22" y="40" width="52" height="14" rx="3" {...c} style={S(1)} />
      <rect x="22" y="58" width="52" height="14" rx="3" {...c} style={S(2)} />
      <path d="M56 28 V40" {...c} style={S(1)} />
      <circle cx="30" cy="47" r="1.9" {...c} style={S(3)} />
      <circle cx="30" cy="65" r="1.9" {...c} style={S(3)} />
      <path d="M62 47 H68 M62 65 H68" {...c} style={S(3)} />
      <path d="M92 34 L104 39 V49 C104 59 98 64 92 66 C86 64 80 59 80 49 V39 Z" {...c} style={S(4)} />
      <path d="M86 49 l4 4 8 -8" {...c} style={S(5)} />
    </Svg>
  );
}

function Domain() {
  return (
    <Svg>
      <circle cx="54" cy="44" r="28" {...c} style={S(0)} />
      <path d="M54 16 C40 28 40 60 54 72" {...c} style={S(1)} />
      <path d="M54 16 C68 28 68 60 54 72" {...c} style={S(1)} />
      <path d="M26 44 H82" {...c} style={S(2)} />
      <path d="M31 32 H77 M31 56 H77" {...c} style={S(3)} />
      <circle cx="82" cy="44" r="3" {...c} style={S(4)} />
      <path d="M98 26 C98 21 106 21 106 26 C106 31 102 36 102 36 C102 36 98 31 98 26 Z" {...c} style={S(5)} />
      <circle cx="102" cy="26" r="1.4" {...c} style={S(5)} />
    </Svg>
  );
}

const ART: Record<string, () => React.ReactNode> = {
  web: Web,
  ecommerce: Ecommerce,
  app: App,
  landing: Landing,
  hosting: Hosting,
  domain: Domain,
};

export function ServiceArt({ name }: { name: string }) {
  const Cmp = ART[name] ?? Web;
  return <Cmp />;
}
