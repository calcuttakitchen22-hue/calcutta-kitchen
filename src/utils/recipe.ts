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

type RecipeRecommendationCandidate = {
  id: string;
  data: {
    protein: string[];
    cuisine: string;
    meal: string[];
    series?: string;
    publishDate: Date;
  };
};

export function getRelatedRecipes<T extends RecipeRecommendationCandidate>(
  currentRecipe: T,
  recipes: T[],
  limit = 6
): T[] {
  const sharesValue = (left: string[], right: string[]) => left.some(value => right.includes(value));

  return recipes
    .filter(recipe => recipe.id !== currentRecipe.id)
    .sort((left, right) => {
      const leftRank = [
        Number(sharesValue(left.data.protein, currentRecipe.data.protein)),
        Number(left.data.cuisine === currentRecipe.data.cuisine),
        Number(sharesValue(left.data.meal, currentRecipe.data.meal)),
        Number(Boolean(left.data.series && left.data.series === currentRecipe.data.series)),
        left.data.publishDate.getTime(),
      ];
      const rightRank = [
        Number(sharesValue(right.data.protein, currentRecipe.data.protein)),
        Number(right.data.cuisine === currentRecipe.data.cuisine),
        Number(sharesValue(right.data.meal, currentRecipe.data.meal)),
        Number(Boolean(right.data.series && right.data.series === currentRecipe.data.series)),
        right.data.publishDate.getTime(),
      ];

      for (let index = 0; index < leftRank.length; index += 1) {
        if (leftRank[index] !== rightRank[index]) return rightRank[index] - leftRank[index];
      }

      return 0;
    })
    .slice(0, limit);
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
