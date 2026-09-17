import Hero from "@/components/sections/Hero";
import HeroKinetic from "@/components/sections/HeroKinetic";
import CardsGrid from "@/components/sections/CardsGrid";
import Steps from "@/components/sections/Steps";
import ProcessCards from "@/components/sections/ProcessCards";
import Reasons from "@/components/sections/Reasons";
import Pricing from "@/components/sections/Pricing";
import ProductList from "@/components/sections/ProductList";
import Callout from "@/components/sections/Callout";
import FeatureRows from "@/components/sections/FeatureRows";
import CardsVelocity from "@/components/sections/CardsVelocity";
import Perks from "@/components/sections/Perks";
import ContactSection from "@/components/sections/ContactSection";
import LogosMarquee from "@/components/sections/LogosMarquee";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import { Intro, MissionVision } from "@/components/sections/TextBlocks";
import JsonLd from "@/components/JsonLd";
import { pageJsonLd } from "@/lib/seo";
import type { PageContent, SiteConfig } from "@/lib/types";

/**
 * Compone las secciones de una página según lo que declare su JSON.
 * Para rehacer una sección con 21st.dev, sustituye aquí el componente
 * correspondiente por el nuevo, sin tocar el contenido.
 */
export default function PageRenderer({
  page,
  site,
}: {
  page: PageContent;
  site: SiteConfig;
}) {
  return (
    <>
      <JsonLd schema={pageJsonLd(page, page.slug, site)} />
      {page.hero &&
        (page.hero.kinetic ? (
          <HeroKinetic hero={page.hero} site={site} />
        ) : (
          <Hero hero={page.hero} site={site} />
        ))}
      {page.logos && <LogosMarquee logos={page.logos} />}
      {page.intro && <Intro intro={page.intro} />}
      {page.features && <FeatureRows features={page.features} />}
      {page.perks && <Perks perks={page.perks} />}
      {page.contact && <ContactSection contact={page.contact} site={site} />}
      {page.services && <ServicesGrid services={page.services} />}
      {/* CTA destacado colocado temprano cuando early=true */}
      {page.callout?.early && <Callout callout={page.callout} />}
      {page.cards &&
        (page.cards.variant === "velocity" ? (
          <CardsVelocity cards={page.cards} />
        ) : (
          <CardsGrid cards={page.cards} />
        ))}
      {page.steps &&
        (page.steps.variant === "cards" ? (
          <ProcessCards steps={page.steps} />
        ) : (
          <Steps steps={page.steps} />
        ))}
      {page.reasons && <Reasons reasons={page.reasons} />}
      {page.pricing && <Pricing pricing={page.pricing} />}
      {page.productList && <ProductList productList={page.productList} />}
      {page.testimonials && <Testimonials testimonials={page.testimonials} />}
      {(page.mission || page.vision) && (
        <MissionVision mission={page.mission} vision={page.vision} />
      )}
      {page.faq && <Faq faq={page.faq} />}
      {page.callout && !page.callout.early && <Callout callout={page.callout} />}
      {/* Stats (ecualizador) al final: intercambiado con el CTA */}
      {page.stats && <Stats stats={page.stats} />}
    </>
  );
}
