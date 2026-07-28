import { z } from "astro/zod";
import { assertUniqueValues } from "@/utils/contentValidation";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const homepageCurationSchema = z.object({
  featuredRecipes: z.array(slugSchema).length(6),
  featuredCollections: z.array(slugSchema),
  featuredSeries: z.array(slugSchema),
  featuredVideos: z.array(
    z.object({
      title: z.string().min(1),
      url: z.url(),
    })
  ),
  featuredTools: z.array(slugSchema),
});

const homepageCurationInput = {
  featuredRecipes: [
    "chicken-kosha",
    "aloo-posto",
    "mango-bhapa-doi",
    "maacher-jhol",
    "ghugni",
    "sorshe-ilish",
  ],
  featuredCollections: ["weeknight-dinners"],
  featuredSeries: ["cook-like-a-lyadhkhor"],
  featuredVideos: [],
  featuredTools: [],
};

const homepageCategoryConfigurationSchema = z.object({
  discoveryItems: z.array(
    z.object({
      label: z.string().min(1),
      language: z.literal("bn").optional(),
      href: z.string().startsWith("/").optional(),
    })
  ).min(1),
  browse: z.object({
    heading: z.string().min(1),
    language: z.literal("bn").optional(),
    categories: z.array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        dimension: z.enum(["protein", "meal", "cuisine", "type"]),
      })
    ).min(1),
  }),
});

const homepageCategoryConfigurationInput = {
  discoveryItems: [
    { label: "মাছ", language: "bn" as const },
    { label: "Kitchen Tools", href: "/kitchen-tools/" },
    { label: "মাংস", language: "bn" as const },
    { label: "নিরামিষ", language: "bn" as const },
    { label: "ভাত ও পোলাও", language: "bn" as const },
    { label: "মিষ্টি", language: "bn" as const },
  ],
  browse: {
    heading: "রান্না খুঁজুন",
    language: "bn" as const,
    categories: [
      { dimension: "protein" as const, title: "By Protein", description: "Find recipes by your main ingredient." },
      { dimension: "meal" as const, title: "By Meal", description: "Browse ideas for lunch, dinner, snacks, and desserts." },
      { dimension: "cuisine" as const, title: "By Cuisine", description: "Explore Bengali cooking and more comfort-food traditions." },
      { dimension: "type" as const, title: "By Type", description: "Discover curries, sweets, rice dishes, and more." },
    ],
  },
};

assertUniqueValues(homepageCurationInput.featuredRecipes, "featured recipe filenames");
assertUniqueValues(homepageCurationInput.featuredCollections, "featured collection slugs");
assertUniqueValues(homepageCurationInput.featuredSeries, "featured series slugs");
assertUniqueValues(homepageCurationInput.featuredTools, "featured tool slugs");

export const homepageCuration = homepageCurationSchema.parse(homepageCurationInput);
export const homepageCategoryConfiguration = homepageCategoryConfigurationSchema.parse(homepageCategoryConfigurationInput);
