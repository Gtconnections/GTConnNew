import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/content";
import { SITE_URL, organizationSchema, websiteSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  const siteName = site.seo?.siteName ?? site.brand.name;
  const description = site.seo?.description ?? "";
  const ogImage = site.seo?.ogImage ?? "/og.png";
  const locale = site.seo?.locale ?? "en_US";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteName} | Web, Apps, Hosting & Domains`,
      template: `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName,
      title: `${siteName} | Web, Apps, Hosting & Domains`,
      description,
      locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | Web, Apps, Hosting & Domains`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    // El favicon y los iconos los generan automáticamente los archivos
    // src/app/favicon.ico, src/app/icon.svg y src/app/apple-icon.png (marca GT).
    manifest: "/manifest.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: "#1d66f1",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getSiteConfig();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <JsonLd schema={[organizationSchema(site), websiteSchema(site)]} />
        <Header brandText={site.brand.logoText} nav={site.nav} />
        <main className="flex-1">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
