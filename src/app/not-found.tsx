import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada | GT Connections",
  description: "La página que buscas no existe o fue movida.",
  robots: { index: false, follow: true },
};

/**
 * Página 404 (auditoría 2026-10-04).
 * Usa los tokens de diseño del sitio (globals.css).
 */
export default function NotFound() {
  return (
    <main className="section pt-28">
      <div className="container-page flex min-h-[60svh] flex-col items-center justify-center text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-4 max-w-md text-lg text-ink-500">
          La página que buscas no existe o fue movida. Volvamos al inicio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link href="/contact-us" className="btn-outline">
            Contactarnos
          </Link>
        </div>
      </div>
    </main>
  );
}
