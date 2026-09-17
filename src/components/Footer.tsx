"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import SmartLink from "@/components/SmartLink";
import type { SiteConfig } from "@/lib/types";

/* Iconos de marca (lucide ya no incluye logos de marcas) */
function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Footer con revelado animado (blur + desplazamiento) al entrar en viewport,
 * adaptado del componente de 21st.dev a la marca (tema oscuro). Los enlaces
 * vienen de site.footer.columns; el bloque de marca añade contacto y redes.
 */
export default function Footer({ site }: { site: SiteConfig }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-900 text-slate-300">
      {/* Luz radial superior (glow del fondo) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(45%_160px_at_50%_0%,rgba(51,133,252,0.22),transparent)]" />
      {/* Línea de brillo superior */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/50 blur" />

      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Bloque de marca + contacto */}
          <AnimatedContainer className="space-y-5 lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="GT Connections" className="h-8 w-auto" />

            <div className="space-y-2 pt-1">
              {site.contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  <Phone className="size-4 text-brand-400" />
                  {phone}
                </a>
              ))}
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2.5 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-brand-400" />
                {site.contact.email}
              </a>
            </div>

            <div className="flex gap-3 pt-1">
              <SmartLink
                href={site.socials.facebook}
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-brand-500 hover:text-white"
              >
                <Facebook className="size-4" />
              </SmartLink>
              <SmartLink
                href={site.socials.instagram}
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-brand-500 hover:text-white"
              >
                <Instagram className="size-4" />
              </SmartLink>
            </div>
          </AnimatedContainer>

          {/* Columnas de enlaces */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {site.footer.columns.map((col, i) => (
              <AnimatedContainer key={col.title} delay={0.1 + i * 0.08}>
                <p className="text-sm font-semibold text-white">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink
                        href={link.href}
                        external={link.external}
                        className="text-sm text-slate-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} GT Connections. All rights reserved.</p>
          <p>You are in the ideal place to start your Digital Business.</p>
        </div>
      </div>
    </footer>
  );
}

type AnimatedProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
