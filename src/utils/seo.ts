import type { PageMetadata, SiteConfiguration } from "@/types/site";

export type ResolvedSeoMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  image?: string;
  noindex: boolean;
};

export function createCanonicalUrl(pathname: string, siteUrl: string): string {
  return new URL(pathname, siteUrl).href;
}

export function createSeoMetadata(
  metadata: PageMetadata | undefined,
  site: Pick<SiteConfiguration, "name" | "url" | "description">
): ResolvedSeoMetadata {
  const pageTitle = metadata?.title?.trim();

  return {
    title: pageTitle ? `${pageTitle} | ${site.name}` : site.name,
    description: metadata?.description?.trim() || site.description,
    canonicalUrl: createCanonicalUrl(metadata?.canonicalPath || "/", site.url),
    image: metadata?.image,
    noindex: metadata?.noindex ?? false,
  };
}

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
