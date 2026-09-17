// Capa de acceso al contenido.
//
// HOY: lee JSON estático desde /src/content. El sitio es casi estático, así que
// esto se resuelve en build (SSG) sin coste.
//
// MAÑANA (si hace falta back office en vivo): reemplaza el cuerpo de estas
// funciones por consultas a Supabase (createClient(...).from('pages')...).
// Como ya son async y devuelven los mismos tipos, los componentes de las
// páginas no cambian nada.

import type { PageContent, SiteConfig } from "@/lib/types";

import site from "@/content/site.json";
import home from "@/content/pages/home.json";
import about from "@/content/pages/about.json";
import webDevelopment from "@/content/pages/web-development.json";
import appDevelopment from "@/content/pages/app-development.json";
import landingPages from "@/content/pages/landing-pages.json";
import influencers from "@/content/pages/influencers.json";
import reseller from "@/content/pages/reseller-program.json";
import news from "@/content/pages/news.json";
import contact from "@/content/pages/contact.json";

const PAGES: Record<string, unknown> = {
  home,
  "about-us": about,
  "web-development": webDevelopment,
  "app-development": appDevelopment,
  "landing-pages": landingPages,
  influencers,
  "reseller-program": reseller,
  news,
  "contact-us": contact,
};

export async function getSiteConfig(): Promise<SiteConfig> {
  return site as SiteConfig;
}

export async function getPage(slug: string): Promise<PageContent> {
  const data = PAGES[slug];
  if (!data) {
    throw new Error(`Contenido no encontrado para la página: ${slug}`);
  }
  return data as PageContent;
}
