import type { PageContent } from "@/lib/types";

export default function Steps({ steps }: { steps: NonNullable<PageContent["steps"]> }) {
  return (
    <section className="section bg-slate-50">
      <div className="container-page">
        {steps.title && (
          <h2 className="gt-rise mb-12 text-center text-3xl font-bold text-ink-900 sm:text-4xl">
            {steps.title}
          </h2>
        )}
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.items.map((step, i) => (
            <li
              key={step.title}
              className="gt-rise group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-700 transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                <span
                  className="gt-ring absolute inset-0 rounded-full ring-2 ring-brand-400/50"
                  style={{ ["--rd" as string]: `${i * 0.3}s` }}
                />
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
