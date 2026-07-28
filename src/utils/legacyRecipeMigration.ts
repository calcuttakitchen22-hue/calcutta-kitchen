export const legacyRecipeFieldMap = {
  title: "title",
  description: "description",
  featuredImage: "coverImage",
  pubDatetime: "publishDate",
  modDatetime: "updatedDate",
  youtube_url: "video.url",
  affiliate_products: "equipment[].toolSlug (manual review required)",
  tags: "tags (manual taxonomy review required)",
} as const;

export const legacyRecipeManualReviewFields = [
  "coverImageAlt",
  "prepTime",
  "cookTime",
  "additionalTime",
  "servings",
  "taxonomy",
  "ingredients",
  "steps",
  "tips",
  "faq",
  "video metadata",
  "Bengali translations",
] as const;

export function getLegacyRecipeMigrationChecklist(): readonly string[] {
  return legacyRecipeManualReviewFields;
}
