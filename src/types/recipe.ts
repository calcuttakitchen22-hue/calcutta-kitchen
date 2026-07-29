import type { ImageMetadata } from "astro";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type RecipeIngredient = {
  quantity?: string;
  unit?: string;
  name: string;
  notes?: string;
};

export type RecipeEquipment = {
  name: string;
  toolSlug?: string;
};

export type RecipeStep = {
  title?: string;
  instruction: string;
  image?: string;
  imageAlt?: string;
  tip?: string;
};

export type RecipeFaq = {
  question: string;
  answer: string;
};

export type RecipeVideo = {
  url: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  uploadDate?: Date;
  duration?: string;
};

export type RecipeLayoutData = {
  title: string;
  titleBn?: string;
  description: string;
  about: string[];
  coverImage: ImageMetadata;
  coverImageAlt: string;
  publishDate: Date;
  updatedDate?: Date;
  prepTime: number;
  cookTime: number;
  additionalTime?: number;
  servings: string;
  difficulty: "easy" | "medium" | "hard";
  cuisine: string;
  meal: string[];
  affiliateProducts: string[];
  ingredientsBn: string[];
  stepsBn: string[];
  ingredients: RecipeIngredient[];
  equipment: RecipeEquipment[];
  steps: RecipeStep[];
  tips: string[];
  faq: RecipeFaq[];
  video?: RecipeVideo;
  seoTitle?: string;
  seoDescription?: string;
};
