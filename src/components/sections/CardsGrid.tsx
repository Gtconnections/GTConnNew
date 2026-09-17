import SmartLink from "@/components/SmartLink";
import type { PageContent } from "@/lib/types";

export default function CardsGrid({ cards }: { cards: NonNullable<PageContent["cards"]> }) {
  const count = cards.items.length;
  const cols = count >= 4 ? "lg:grid-cols-4" : count === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section className="section">
      <div className="container-page">
        {cards.title && (
          <h2 className="gt-rise mb-10 text-center text-3xl font-bold text-ink-900 sm:text-4xl">
            {cards.title}
          </h2>
        )}
        <div className={`grid gap-6 sm:grid-cols-2 ${cols}`}>
          {cards.items.map((card, i) => (
            <div
              key={card.title}
              className="gt-rise group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {/* Acento superior en hover */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-700 transition-transform duration-300 group-hover:scale-x-100" />
              <h3 className="text-lg font-semibold text-ink-900">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{card.text}</p>
              {card.cta && (
                <SmartLink
                  href={card.cta.href}
                  external={card.cta.external}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  {card.cta.label}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </SmartLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
