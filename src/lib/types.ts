// Tipos del contenido del sitio.
// El contenido hoy vive en /src/content/*.json. Si mañana se mueve a Supabase,
// solo cambia la implementación de /src/lib/content.ts; estos tipos y los
// componentes que los consumen no cambian.

export interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SiteConfig {
  brand: { name: string; logoText: string; tagline: string };
  contact: { phones: string[]; email: string };
  socials: { facebook: string; instagram: string };
  external: Record<string, string>;
  seo?: {
    url?: string;
    siteName?: string;
    locale?: string;
    description?: string;
    ogImage?: string;
    twitter?: string;
    foundingDate?: string;
    areaServed?: string[];
  };
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  godaddy: {
    plid: string;
    domainSearch: {
      action: string;
      method: "get" | "post";
      queryParam: string;
      placeholder?: string;
      buttonLabel?: string;
      hiddenFields: Record<string, string>;
    };
  };
  nav: NavItem[];
  footer: { columns: FooterColumn[] };
}

export interface Cta {
  label: string;
  href: string;
  external?: boolean;
}

export interface Card {
  title: string;
  text: string;
  cta?: Cta;
  icon?: string;
  label?: string;
}

export interface Step {
  title: string;
  text: string;
  benefits?: string[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  text: string;
  href?: string;
  external?: boolean;
  highlight?: boolean;
}

export interface StatItem {
  value?: string; // texto fijo (p.ej. "GoDaddy") si no es numérico
  to?: number; // objetivo del conteo (count-up)
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  location?: string;
  rating: number;
  review: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

// Estructura genérica y flexible por página.
// Cada página declara solo las secciones que usa.
export interface PageContent {
  slug: string;
  seo: {
    title: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    type?: "website" | "article";
    noindex?: boolean;
    datePublished?: string;
  };
  hero?: {
    eyebrow?: string;
    title: string;
    titleHighlight?: string;
    subtitle?: string;
    ctas?: Cta[];
    showDomainSearch?: boolean;
    kinetic?: boolean;
    trust?: { rating?: number; text: string };
  };
  intro?: { title?: string; text: string; cta?: Cta; icon?: string };
  features?: {
    title?: string;
    subtitle?: string;
    items: { title: string; text: string; icon: string; cta?: Cta }[];
  };
  perks?: { icon?: string; title?: string; text?: string; items?: string[]; ctas?: Cta[] };
  contact?: {
    title?: string;
    text?: string;
    hours?: string;
    subjects?: string[];
    emailTo?: string;
  };
  logos?: { title?: string; items: string[] };
  services?: { title?: string; subtitle?: string; items: ServiceItem[] };
  stats?: { title?: string; items: StatItem[] };
  testimonials?: { title?: string; subtitle?: string; items: TestimonialItem[] };
  faq?: { title?: string; subtitle?: string; items: FaqItem[] };
  cards?: { title?: string; subtitle?: string; eyebrow?: string; variant?: "velocity"; items: Card[] };
  steps?: { title?: string; variant?: "cards"; items: Step[] };
  reasons?: { title?: string; items: string[] };
  pricing?: {
    title?: string;
    plans: {
      name: string;
      price: string;
      period?: string;
      audience?: string;
      features: string[];
      cta?: Cta;
      highlighted?: boolean;
    }[];
  };
  productList?: { title?: string; items: string[] };
  mission?: { title?: string; text: string };
  vision?: { title?: string; text: string };
  callout?: { title: string; text?: string; ctas?: Cta[]; early?: boolean };
}
