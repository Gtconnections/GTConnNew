import type { Metadata } from "next";
import PageRenderer from "@/components/PageRenderer";
import { getPage, getSiteConfig } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const SLUG = "news";

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage(SLUG), getSiteConfig()]);
  return buildMetadata({ page, slug: SLUG, site });
}

export default async function Page() {
  const [page, site] = await Promise.all([getPage(SLUG), getSiteConfig()]);
  return <PageRenderer page={page} site={site} />;
}
