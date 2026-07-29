import { z } from "astro/zod";
import { assertUniqueValues } from "@/utils/contentValidation";

const categorySchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  dimension: z.enum(["protein", "meal", "cuisine", "type", "series"]),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: z.string().min(1),
  bengaliLabel: z.string().min(1).optional(),
  icon: z.string().min(1),
  order: z.number().int().nonnegative(),
  featuredOnHomepage: z.boolean(),
});

const categoriesInput = [
  { id: "chicken", dimension: "protein", slug: "chicken", label: "Chicken", icon: "mdi:food-drumstick", order: 1, featuredOnHomepage: true },
  { id: "fish", dimension: "protein", slug: "fish", label: "Fish", icon: "mdi:fish", order: 2, featuredOnHomepage: true },
  { id: "mutton", dimension: "protein", slug: "mutton", label: "Mutton", icon: "mdi:food-steak", order: 3, featuredOnHomepage: true },
  { id: "vegetarian", dimension: "protein", slug: "vegetarian", label: "Vegetarian", icon: "mdi:leaf", order: 4, featuredOnHomepage: true },
  { id: "rice", dimension: "type", slug: "rice", label: "Rice", icon: "mdi:rice", order: 5, featuredOnHomepage: true },
  { id: "dinner", dimension: "meal", slug: "dinner", label: "Dinner", icon: "mdi:pot-steam", order: 6, featuredOnHomepage: false },
  { id: "snacks", dimension: "meal", slug: "snack", label: "Snacks", icon: "mdi:food-variant", order: 7, featuredOnHomepage: false },
  { id: "desserts", dimension: "meal", slug: "dessert", label: "Desserts", icon: "mdi:cupcake", order: 8, featuredOnHomepage: false },
  { id: "cook-like-a-lyadhkhor", dimension: "series", slug: "cook-like-a-lyadhkhor", label: "Cook Like a Lyadhkhor", icon: "mdi:chef-hat", order: 9, featuredOnHomepage: false },
  { id: "meals", dimension: "meal", slug: "meals", label: "Meals", icon: "mdi:silverware-fork-knife", order: 10, featuredOnHomepage: false },
  { id: "baking", dimension: "type", slug: "baking", label: "Baking", icon: "mdi:bread-slice", order: 11, featuredOnHomepage: false },
  { id: "italian", dimension: "cuisine", slug: "italian", label: "Italian", icon: "mdi:pasta", order: 12, featuredOnHomepage: false },
  { id: "continental", dimension: "cuisine", slug: "continental", label: "Continental", icon: "mdi:food", order: 13, featuredOnHomepage: false },
  { id: "sauces-dips", dimension: "type", slug: "sauce", label: "Sauces & Dips", icon: "mdi:bowl-mix", order: 14, featuredOnHomepage: false },
  { id: "chinese", dimension: "cuisine", slug: "chinese", label: "Chinese", icon: "mdi:noodles", order: 15, featuredOnHomepage: false },
  { id: "asian", dimension: "cuisine", slug: "asian", label: "Asian", icon: "mdi:food-takeout-box", order: 16, featuredOnHomepage: false },
  { id: "fusion", dimension: "cuisine", slug: "fusion", label: "Fusion", icon: "mdi:shaker", order: 17, featuredOnHomepage: false },
  { id: "beverages", dimension: "meal", slug: "beverage", label: "Beverages", icon: "mdi:cup", order: 18, featuredOnHomepage: false },
];

assertUniqueValues(categoriesInput.map(category => category.id), "homepage category IDs");
assertUniqueValues(categoriesInput.map(category => category.slug), "homepage category slugs");
assertUniqueValues(categoriesInput.map(category => String(category.order)), "homepage category display order");

export const categories = z.array(categorySchema).parse(categoriesInput).sort((left, right) => left.order - right.order);
export const homepageDiscoveryCategories = categories;
