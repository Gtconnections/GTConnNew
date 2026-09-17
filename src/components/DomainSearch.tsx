"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/types";

/**
 * Buscador de dominios del Reseller Program de GoDaddy.
 * UX: input con lupa integrada; al enfocar crece y se resalta con un glow de
 * marca; el botón "Search" irrumpe cuando el usuario empieza a escribir.
 * Envía el dominio al storefront/secureserver con el pl_id de la cuenta.
 * Config en /src/content/site.json -> godaddy.domainSearch.
 */
export default function DomainSearch({ site }: { site: SiteConfig }) {
  const { action, method, queryParam, hiddenFields, placeholder, buttonLabel } =
    site.godaddy.domainSearch;

  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const hasText = value.trim().length > 0;

  return (
    <form action={action} method={method} target="_blank" className="mx-auto w-full max-w-2xl">
      {Object.entries(hiddenFields).map(([name, val]) => (
        <input key={name} type="hidden" name={name} value={val} />
      ))}

      <div
        className={`group relative transition-transform duration-500 ease-out ${
          focused ? "scale-[1.03]" : "scale-[0.93]"
        }`}
      >
        {/* Glow de marca detrás del pill (aparece al enfocar) */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -inset-1 rounded-[26px] bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 blur-xl transition-opacity duration-500 ${
            focused ? "opacity-60" : "opacity-0"
          }`}
        />

        {/* Pill */}
        <div
          className={`relative flex items-center gap-2 rounded-3xl border-2 bg-white pl-4 pr-2 transition-all duration-500 ease-out ${
            focused
              ? "border-brand-500 py-2.5 shadow-2xl shadow-brand-500/25 ring-4 ring-brand-200/70"
              : "border-slate-400 py-1.5 shadow-md shadow-slate-900/10"
          }`}
        >
          {/* Lupa */}
          <svg
            className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
              focused ? "text-brand-600" : "text-slate-400"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>

          <input
            type="search"
            name={queryParam}
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder ?? "Find your perfect domain name"}
            className="w-full flex-1 bg-transparent py-2 text-base text-ink-900 outline-none placeholder:text-slate-400 [appearance:textfield] [&::-webkit-search-cancel-button]:hidden"
          />

          {/* Botón que irrumpe al escribir */}
          <button
            type="submit"
            tabIndex={hasText ? 0 : -1}
            aria-hidden={!hasText}
            className={`flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-2xl bg-brand-600 font-semibold text-white transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:bg-brand-700 ${
              hasText
                ? "max-w-[180px] translate-x-0 scale-100 px-5 py-3 opacity-100"
                : "pointer-events-none max-w-0 translate-x-3 scale-90 px-0 py-3 opacity-0"
            }`}
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            {buttonLabel ?? "Search"}
          </button>
        </div>
      </div>
    </form>
  );
}
