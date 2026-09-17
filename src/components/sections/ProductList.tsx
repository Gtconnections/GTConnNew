import type { PageContent } from "@/lib/types";

export default function ProductList({
  productList,
}: {
  productList: NonNullable<PageContent["productList"]>;
}) {
  return (
    <section className="section">
      <div className="container-page">
        {productList.title && (
          <h2 className="gt-rise mb-8 text-center text-3xl font-bold text-ink-900 sm:text-4xl">
            {productList.title}
          </h2>
        )}
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {productList.items.map((item, i) => (
            <div
              key={item}
              className="gt-rise rounded-xl border border-slate-200 bg-white px-4 py-5 text-center text-sm font-medium text-ink-700 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:text-brand-700 hover:shadow-md"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
