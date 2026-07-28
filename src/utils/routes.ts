export type CategoryDimension = "protein" | "meal" | "cuisine" | "type" | "series";

function normalizeSlug(slug: string): string {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

export function getRecipeRoute(slug: string): string {
  return `/recipes/${normalizeSlug(slug)}`;
}

export function getCollectionRoute(slug: string): string {
  return `/collections/${normalizeSlug(slug)}`;
}

export function getToolRoute(slug: string): string {
  return `/tools/${normalizeSlug(slug)}`;
}

export function getCategoryRoute(
  dimension: CategoryDimension,
  slug: string
): string {
  return `/recipes/category/${dimension}/${normalizeSlug(slug)}`;
}
