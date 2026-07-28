	import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";
import { taxonomySlugs } from "@/config/taxonomy";

export const BLOG_PATH = "src/content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
	  title_bn: z.string().optional(),
	  ingredients_bn: z.array(z.string()).optional(),
	  method_bn: z.array(z.string()).optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
	  featuredImage: image().optional(),
	  affiliate_products: z.array(z.string()).optional(),
	  youtube_url: z.string().optional(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      ingredients_bn_raw: z.array(z.string()).optional(),
      method_bn_raw: z.array(z.string()).optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string(),
    description: z.string().min(1).max(160),
    draft: z.boolean().default(false),
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const seoSchema = {
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
};

const ingredientSchema = z.object({
  quantity: z.string().optional(),
  unit: z.string().optional(),
  name: z.string().min(1),
  notes: z.string().optional(),
});

const equipmentSchema = z.object({
  name: z.string().min(1),
  toolSlug: slugSchema.optional(),
});

const stepSchema = z
  .object({
    title: z.string().min(1).optional(),
    instruction: z.string().min(1),
    image: z.string().optional(),
    imageAlt: z.string().min(1).optional(),
    tip: z.string().min(1).optional(),
  })
  .refine(step => !step.image || Boolean(step.imageAlt), {
    message: "A step image requires imageAlt text.",
    path: ["imageAlt"],
  });

const videoSchema = z.object({
  url: z.url(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  thumbnail: z.url().optional(),
  uploadDate: z.date().optional(),
  duration: z.string().optional(),
});

const recipes = defineCollection({
  // The flat loader keeps filename-derived recipe IDs unique and canonical.
  loader: glob({ pattern: "*.md", base: "./src/content/recipes" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1).max(160),
      coverImage: image(),
      coverImageAlt: z.string().min(1),
      publishDate: z.date(),
      updatedDate: z.date().optional(),
      draft: z.boolean().default(false),
      prepTime: z.number().int().nonnegative(),
      cookTime: z.number().int().nonnegative(),
      additionalTime: z.number().int().nonnegative().optional(),
      servings: z.string().min(1),
      difficulty: z.enum(["easy", "medium", "hard"]),
      protein: z.array(z.enum(taxonomySlugs.protein)).min(1),
      meal: z.array(z.enum(taxonomySlugs.meal)).min(1),
      cuisine: z.enum(taxonomySlugs.cuisine),
      type: z.array(z.enum(taxonomySlugs.type)).min(1),
      series: z.enum(taxonomySlugs.series).optional(),
      tags: z.array(z.string().min(1)).min(1),
      ingredients: z.array(ingredientSchema).min(1),
      equipment: z.array(equipmentSchema).default([]),
      steps: z.array(stepSchema).min(1),
      tips: z.array(z.string().min(1)).default([]),
      faq: z
        .array(
          z.object({
            question: z.string().min(1),
            answer: z.string().min(1),
          })
        )
        .default([]),
      video: videoSchema.optional(),
      relatedRecipes: z.array(slugSchema).default([]),
      author: z.string().default(config.site.author),
      ...seoSchema,
    }),
});

const collectionFiltersSchema = z
  .object({
    protein: z.array(z.enum(taxonomySlugs.protein)).optional(),
    meal: z.array(z.enum(taxonomySlugs.meal)).optional(),
    cuisine: z.array(z.enum(taxonomySlugs.cuisine)).optional(),
    type: z.array(z.enum(taxonomySlugs.type)).optional(),
    tags: z.array(z.string().min(1)).optional(),
    series: z.array(z.enum(taxonomySlugs.series)).optional(),
    difficulty: z.array(z.enum(["easy", "medium", "hard"])).optional(),
  })
  .refine(
    filters => Object.values(filters).some(values => values && values.length > 0),
    "A collection requires at least one filter."
  );

const recipeCollections = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/collections" }),
  schema: ({ image }) =>
    z.object({
      slug: slugSchema,
      title: z.string().min(1),
      description: z.string().min(1).max(160),
      coverImage: image(),
      coverImageAlt: z.string().min(1),
      intro: z.string().min(1),
      filters: collectionFiltersSchema,
      featured: z.boolean().default(false),
      featuredOrder: z.number().int().nonnegative().optional(),
      recipeOrder: z.array(slugSchema).default([]),
      ...seoSchema,
    }),
});

const tools = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/tools" }),
  schema: ({ image }) =>
    z.object({
      slug: slugSchema,
      title: z.string().min(1),
      description: z.string().min(1).max(160),
      image: image(),
      imageAlt: z.string().min(1),
      affiliateLink: z.url().optional(),
      pros: z.array(z.string().min(1)).default([]),
      cons: z.array(z.string().min(1)).default([]),
      relatedRecipes: z.array(slugSchema).default([]),
      ...seoSchema,
    }),
});

const series = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/series" }),
  schema: ({ image }) =>
    z.object({
      slug: z.enum(taxonomySlugs.series),
      title: z.string().min(1),
      description: z.string().min(1).max(160),
      coverImage: image(),
      coverImageAlt: z.string().min(1),
      intro: z.string().min(1),
      featured: z.boolean().default(false),
      ...seoSchema,
    }),
});

export const collections = { posts, pages, recipes, collections: recipeCollections, tools, series };
