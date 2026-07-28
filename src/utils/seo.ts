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
  const titleIncludesSiteName = pageTitle?.toLowerCase().endsWith(`| ${site.name}`.toLowerCase());

  return {
    title: pageTitle ? (titleIncludesSiteName ? pageTitle : `${pageTitle} | ${site.name}`) : site.name,
    description: metadata?.description?.trim() || site.description,
    canonicalUrl: createCanonicalUrl(metadata?.canonicalPath || "/", site.url),
    image: metadata?.image,
    noindex: metadata?.noindex ?? false,
  };
}

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

type RecipeJsonLdInput = {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  publishDate: Date;
  updatedDate?: Date;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: string;
  ingredients: string[];
  steps: string[];
  author: string;
};

type FaqJsonLdItem = {
  question: string;
  answer: string;
};

type BreadcrumbJsonLdItem = {
  name: string;
  url: string;
};

function toIsoDuration(minutes: number): string {
  return `PT${minutes}M`;
}

export function createRecipeJsonLd(input: RecipeJsonLdInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: input.title,
    description: input.description,
    url: input.canonicalUrl,
    image: input.imageUrl,
    datePublished: input.publishDate.toISOString(),
    ...(input.updatedDate && { dateModified: input.updatedDate.toISOString() }),
    prepTime: toIsoDuration(input.prepTime),
    cookTime: toIsoDuration(input.cookTime),
    totalTime: toIsoDuration(input.totalTime),
    recipeYield: input.servings,
    recipeIngredient: input.ingredients,
    recipeInstructions: input.steps.map((text, position) => ({
      "@type": "HowToStep",
      position: position + 1,
      text,
    })),
    author: {
      "@type": "Organization",
      name: input.author,
    },
  };
}

export function createFaqJsonLd(items: FaqJsonLdItem[]): Record<string, unknown> | undefined {
  if (items.length === 0) {
    return undefined;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbJsonLdItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, position) => ({
      "@type": "ListItem",
      position: position + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
