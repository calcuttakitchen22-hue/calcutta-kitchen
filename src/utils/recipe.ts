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
