import type { PageContent } from "@/lib/types";

export default function Reasons({ reasons }: { reasons: NonNullable<PageContent["reasons"]> }) {
  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        {reasons.title && (
          <h2 className="gt-rise mb-8 text-center text-3xl font-bold text-ink-900 sm:text-4xl">
            {reasons.title}
          </h2>
        )}
        <ul className="space-y-3">
          {reasons.items.map((item, i) => (
            <li
              key={item}
              className="gt-rise group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="pt-0.5 text-sm text-ink-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
