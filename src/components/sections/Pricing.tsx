"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { CheckCheck, Zap } from "lucide-react";
import SmartLink from "@/components/SmartLink";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import type { PageContent } from "@/lib/types";

/** Interruptor entre planes con píldora animada (marca). */
function PlanSwitch({
  labels,
  selected,
  onSelect,
}: {
  labels: string[];
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative z-10 grid w-full grid-cols-2 rounded-full border border-slate-200 bg-slate-50 p-1">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(i)}
          className={`relative z-10 h-12 rounded-full px-3 text-sm font-semibold transition-colors sm:h-14 ${
            selected === i ? "text-white" : "text-ink-500 hover:text-ink-900"
          }`}
        >
          {selected === i && (
            <motion.span
              layoutId="plan-switch-pill"
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-t from-brand-700 via-brand-600 to-brand-500 shadow-md shadow-brand-600/40"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">{label}</span>
        </button>
      ))}
    </div>
  );
}

export default function Pricing({ pricing }: { pricing: NonNullable<PageContent["pricing"]> }) {
  const [selected, setSelected] = useState(() => {
    const hi = pricing.plans.findIndex((p) => p.highlighted);
    return hi >= 0 ? hi : 0;
  });
  const plan = pricing.plans[selected];
  const priceValue = parseFloat(plan.price.replace(/[^0-9.]/g, "")) || 0;

  return (
    <section id="pricing" className="section relative overflow-hidden">
      {/* Degradado radial de marca al fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #ffffff 40%, rgba(29,102,241,0.16) 100%)",
        }}
      />

      <div className="container-page relative z-10">
        {/* Encabezado */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="gt-rise mb-3 flex items-center justify-center gap-2">
            <Zap className="size-5 fill-brand-500 text-brand-500" />
            <span className="font-semibold text-brand-600">Reseller program</span>
          </div>
          <h2 className="text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.12}
              staggerFrom="first"
              reverse
              containerClassName="justify-center"
              transition={{ type: "spring", stiffness: 250, damping: 40, delay: 0.2 }}
            >
              {pricing.title ?? "Choose your reseller plan"}
            </VerticalCutReveal>
          </h2>
          <p className="gt-rise mt-4 text-lg text-ink-500" style={{ animationDelay: "120ms" }}>
            Start your own storefront, set your prices and profit.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Qué incluye */}
          <div>
            <h3 className="gt-rise text-2xl font-semibold text-ink-900">What&apos;s inside</h3>
            <p className="gt-rise mt-1 text-sm text-ink-500" style={{ animationDelay: "80ms" }}>
              {plan.audience}
            </p>
            <div className="mt-6 space-y-4">
              {plan.features.map((feature, i) => (
                <div
                  key={feature}
                  className="gt-rise flex items-center gap-3"
                  style={{ animationDelay: `${120 + i * 60}ms` }}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-md shadow-brand-500/40">
                    <CheckCheck className="size-4" />
                  </span>
                  <span className="text-ink-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selector + precio + CTA */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:p-8">
            <h4 className="mb-1 font-semibold text-ink-900">Choose your plan</h4>
            <p className="mb-3 text-sm text-ink-500">Switch to compare Basic and Pro.</p>
            <PlanSwitch
              labels={pricing.plans.map((p) => p.name)}
              selected={selected}
              onSelect={setSelected}
            />

            {plan.highlighted && (
              <span className="mt-5 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                Most popular
              </span>
            )}

            <div className="mt-5 flex items-end gap-1">
              <span className="text-5xl font-bold text-ink-900">$</span>
              <NumberFlow
                value={priceValue}
                format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                className="text-5xl font-bold text-ink-900"
              />
              {plan.period && <span className="pb-1 text-lg text-ink-500">{plan.period}</span>}
            </div>

            {plan.cta && (
              <SmartLink
                href={plan.cta.href}
                external={plan.cta.external}
                className="gt-cta-pulse mt-6 flex h-14 w-full items-center justify-center rounded-full border-4 border-brand-600 bg-gradient-to-t from-brand-700 via-brand-600 to-brand-500 text-lg font-semibold text-white shadow-sm shadow-brand-600/40 transition-transform hover:scale-[1.02]"
              >
                {plan.cta.label}
              </SmartLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
