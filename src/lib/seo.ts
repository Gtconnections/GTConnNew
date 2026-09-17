// Utilidades de SEO: metadata por página (canonical, Open Graph, Twitter) y
// datos estructurados JSON-LD (Organization, WebSite, Service, FAQ, Breadcrumb).
// La URL base sale de NEXT_PUBLIC_SITE_URL o, si no, de site.json / el dominio.

import type { Metadata } from "next";
import type { PageContent, SiteConfig } from "@/lib/types";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gtconnections.com"
).replace(/\/+$/, "");

const DEFAULT_OG = "/og.png";

/** Rutas del sitio (para sitemap y navegación canónica). */
export const ROUTES: { slug: string; path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { slug: "home", path: "/", changeFrequency: "weekly", priority: 1 },
  { slug: "web-development", path: "/web-development", changeFrequency: "monthly", priority: 0.9 },
  { slug: "app-development", path: "/app-development", changeFrequency: "monthly", priority: 0.9 },
  { slug: "landing-pages", path: "/landing-pages", changeFrequency: "monthly", priority: 0.9 },
  { slug: "reseller-program", path: "/reseller-program", changeFrequency: "monthly", priority: 0.9 },
  { slug: "influencers", path: "/influencers", changeFrequency: "monthly", priority: 0.7 },
  { slug: "about-us", path: "/about-us", changeFrequency: "yearly", priority: 0.6 },
  { slug: "news", path: "/news", changeFrequency: "weekly", priority: 0.6 },
  { slug: "contact-us", path: "/contact-us", changeFrequency: "yearly", priority: 0.7 },
];

/** Servicios (para el schema Service) — slug → tipo de servicio + nombre corto. */
const SERVICES: Record<string, { serviceType: string; name: string }> = {
  "web-development": { serviceType: "Web Development", name: "Web Development" },
  "app-development": { serviceType: "Mobile App Development", name: "Mobile App Development" },
  "landing-pages": { serviceType: "Landing Page Design", name: "Landing Pages" },
  "reseller-program": { serviceType: "Reseller Program", name: "Domain & Hosting Reseller Program" },
  influencers: { serviceType: "Influencer Marketing", name: "Influencer Marketing" },
};

const BREADCRUMB_LABELS: Record<string, string> = {
  "about-us": "About Us",
  "web-development": "Web Development",
  "app-development": "Mobile App Development",
  "landing-pages": "Landing Pages",
  influencers: "Influencers",
  "reseller-program": "Reseller Program",
  news: "News",
  "contact-us": "Contact Us",
};

export function pathForSlug(slug: string): string {
  return slug === "home" ? "/" : `/${slug}`;
}

function abs(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return SITE_URL + (pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`);
}

/** Metadata Next completa para una página. */
export function buildMetadata({
  page,
  slug,
  site,
}: {
  page: PageContent;
  slug: string;
  site: SiteConfig;
}): Metadata {
  const path = pathForSlug(slug);
  const url = abs(path);
  const title = page.seo.title;
  const description = page.seo.description ?? site.seo?.description ?? "";
  const ogImage = abs(page.seo.ogImage ?? site.seo?.ogImage ?? DEFAULT_OG);
  const siteName = site.seo?.siteName ?? site.brand.name;
  const locale = site.seo?.locale ?? "en_US";

  return {
    title: { absolute: title },
    description,
    keywords: page.seo.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: page.seo.type ?? "website",
      url,
      title,
      description,
      siteName,
      locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: page.seo.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
  };
}

/* ─────────── JSON-LD ─────────── */

type Schema = Record<string, unknown>;

export function organizationSchema(site: SiteConfig): Schema {
  const sameAs = [site.socials.facebook, site.socials.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: site.brand.name,
    url: SITE_URL,
    logo: abs("/logo.png"),
    image: abs(site.seo?.ogImage ?? DEFAULT_OG),
    description: site.seo?.description,
    email: site.contact.email,
    telephone: site.contact.phones[0],
    ...(site.seo?.foundingDate ? { foundingDate: site.seo.foundingDate } : {}),
    ...(site.address
      ? {
          address: {
            "@type": "PostalAddress",
            ...(site.address.streetAddress ? { streetAddress: site.address.streetAddress } : {}),
            addressLocality: site.address.addressLocality,
            addressRegion: site.address.addressRegion,
            ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
            addressCountry: site.address.addressCountry,
          },
        }
      : {}),
    contactPoint: site.contact.phones.map((tel) => ({
      "@type": "ContactPoint",
      telephone: tel,
      email: site.contact.email,
      contactType: "customer service",
      areaServed: site.seo?.areaServed ?? ["US"],
      availableLanguage: ["English", "Spanish"],
    })),
    sameAs,
  };
}

export function websiteSchema(site: SiteConfig): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.seo?.siteName ?? site.brand.name,
    description: site.seo?.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

function webPageSchema(page: PageContent, slug: string): Schema {
  const path = pathForSlug(slug);
  return {
    "@context": "https://schema.org",
    "@type": slug === "contact-us" ? "ContactPage" : slug === "about-us" ? "AboutPage" : "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name: page.seo.title,
    description: page.seo.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en",
  };
}

function serviceSchema(page: PageContent, slug: string, site: SiteConfig): Schema | null {
  const svc = SERVICES[slug];
  if (!svc) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    serviceType: svc.serviceType,
    description: page.seo.description,
    url: abs(pathForSlug(slug)),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: (site.seo?.areaServed ?? ["US"]).map((a) => ({ "@type": "Place", name: a })),
  };
}

function faqSchema(page: PageContent): Schema | null {
  if (!page.faq?.items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

function breadcrumbSchema(page: PageContent, slug: string): Schema | null {
  if (slug === "home") return null;
  const label = BREADCRUMB_LABELS[slug] ?? page.seo.title;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: label, item: abs(pathForSlug(slug)) },
    ],
  };
}

/** Todos los schemas específicos de una página (Organization/WebSite van en layout). */
export function pageJsonLd(page: PageContent, slug: string, site: SiteConfig): Schema[] {
  return [
    webPageSchema(page, slug),
    serviceSchema(page, slug, site),
    faqSchema(page),
    breadcrumbSchema(page, slug),
  ].filter(Boolean) as Schema[];
}
