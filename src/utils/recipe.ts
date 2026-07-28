export type RecipeDuration = {
  prepTime: number;
  cookTime: number;
  additionalTime?: number;
};

export function getTotalRecipeTime({
  prepTime,
  cookTime,
  additionalTime = 0,
}: RecipeDuration): number {
  return prepTime + cookTime + additionalTime;
}

export function getRecipeSlug(recipeId: string): string {
  return recipeId.replace(/\.md$/, "");
}

export function getYouTubeThumbnailUrl(url: string): string | undefined {
  try {
    const parsedUrl = new URL(url);
    let videoId: string | undefined;

    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
    }

    if (parsedUrl.hostname.endsWith("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v") ?? undefined;
    }

    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined;
  } catch {
    return undefined;
  }
}
