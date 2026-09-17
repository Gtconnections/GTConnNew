"use client";

import { useState } from "react";
import type { PageContent } from "@/lib/types";

export default function Faq({ faq }: { faq: NonNullable<PageContent["faq"]> }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">FAQ</p>
          {faq.title && (
            <h2 className="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">{faq.title}</h2>
          )}
          {faq.subtitle && <p className="mt-4 text-lg text-ink-500">{faq.subtitle}</p>}
        </div>

        <div className="mt-10 space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-slate-200 bg-white transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-ink-900">{item.q}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500">{item.a}</p>
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
