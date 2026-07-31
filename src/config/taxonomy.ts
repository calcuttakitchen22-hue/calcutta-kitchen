import { z } from "astro/zod";
import { assertUniqueValues } from "@/utils/contentValidation";

export const taxonomySlugs = {
  protein: ["chicken", "fish", "mutton", "vegetarian", "egg", "seafood"],
  meal: ["breakfast", "lunch", "dinner", "snack", "dessert", "beverage"],
  cuisine: ["bengali", "indian", "italian", "chinese", "asian", "continental", "fusion"],
  type: ["rice", "curry", "bread", "baking", "sauce", "sweet", "fried", "steamed"],
  series: ["cook-like-a-lyadhkhor"],
} as const;

const taxonomyValueSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: z.string().min(1),
  bengaliLabel: z.string().min(1).optional(),
  intro: z.string().min(1),
  related: z.array(z.string()).default([]),
});

const taxonomyRegistrySchema = z.object({
  protein: z.array(taxonomyValueSchema),
  meal: z.array(taxonomyValueSchema),
  cuisine: z.array(taxonomyValueSchema),
  type: z.array(taxonomyValueSchema),
  series: z.array(taxonomyValueSchema),
});

const taxonomyRegistryInput = {
  protein: [
    { slug: "chicken", label: "Chicken", intro: "Weeknight chicken recipes with dependable home-cooking methods.", related: ["fish", "mutton"] },
    { slug: "fish", label: "Fish", intro: "Bengali and Indian fish recipes for everyday and festive meals.", related: ["seafood", "chicken"] },
    { slug: "mutton", label: "Mutton", intro: "Slow-cooked mutton recipes for special meals and celebrations.", related: ["chicken"] },
    { slug: "vegetarian", label: "Vegetarian", intro: "Vegetarian recipes rooted in practical home cooking.", related: ["egg", "rice"] },
    { slug: "egg", label: "Egg", intro: "Quick and comforting egg recipes for everyday meals.", related: ["vegetarian", "chicken"] },
    { slug: "seafood", label: "Seafood", intro: "Seafood recipes with clear, home-kitchen techniques.", related: ["fish"] },
  ],
  meal: [
    { slug: "breakfast", label: "Breakfast", intro: "Simple breakfast recipes for a confident start to the day.", related: ["snack"] },
    { slug: "lunch", label: "Lunch", intro: "Lunch recipes for family tables, workdays, and weekends.", related: ["dinner", "rice"] },
    { slug: "dinner", label: "Dinner", intro: "Comforting dinner recipes that fit real home kitchens.", related: ["lunch", "curry"] },
    { slug: "snack", label: "Snacks", intro: "Crowd-pleasing snacks and street-food favourites.", related: ["breakfast"] },
    { slug: "dessert", label: "Desserts", intro: "Desserts for celebrations and everyday sweet cravings.", related: ["sweet", "baking"] },
    { slug: "beverage", label: "Beverages", intro: "Refreshing and warming drinks for every season.", related: [] },
  ],
  cuisine: [
    { slug: "bengali", label: "Bengali", intro: "Traditional Bengali cooking made practical for home cooks.", related: ["indian"] },
    { slug: "indian", label: "Indian", intro: "Approachable Indian comfort food and regional classics.", related: ["bengali", "fusion"] },
    { slug: "italian", label: "Italian", intro: "Italian-inspired comfort food for everyday cooking.", related: ["continental"] },
    { slug: "chinese", label: "Chinese", intro: "Indo-Chinese favourites and high-heat comfort food.", related: ["asian"] },
    { slug: "asian", label: "Asian", intro: "Asian-inspired recipes with clear techniques and practical ingredients.", related: ["chinese"] },
    { slug: "continental", label: "Continental", intro: "Continental comfort food for modern home kitchens.", related: ["italian"] },
    { slug: "fusion", label: "Fusion", intro: "Modern recipes that combine familiar flavours thoughtfully.", related: ["indian"] },
  ],
  type: [
    { slug: "rice", label: "Rice", intro: "Rice dishes for everyday meals and festive tables.", related: ["curry"] },
    { slug: "curry", label: "Curry", intro: "Comforting curries with practical step-by-step methods.", related: ["rice"] },
    { slug: "bread", label: "Bread", intro: "Flatbreads and baked breads for home cooks.", related: ["baking"] },
    { slug: "baking", label: "Baking", intro: "Reliable baking recipes with tested home-kitchen guidance.", related: ["sweet", "bread"] },
    { slug: "sauce", label: "Sauces & Dips", intro: "Sauces, dips, and accompaniments that add flavour to meals.", related: [] },
    { slug: "sweet", label: "Sweets", intro: "Indian and global sweets for celebrations and sharing.", related: ["dessert"] },
    { slug: "fried", label: "Fried", bengaliLabel: "\u09ad\u09be\u099c\u09be", intro: "Recipes where frying is the primary cooking technique or defining preparation method.", related: ["fish"] },
    { slug: "steamed", label: "Steamed", bengaliLabel: "\u09ad\u09be\u09aa\u09be", intro: "Recipes where steaming is the primary cooking technique or defining preparation method.", related: ["fish"] },
  ],
  series: [
    { slug: "cook-like-a-lyadhkhor", label: "Cook Like a Lyadhkhor", intro: "A signature series for relaxed, confident home cooking.", related: [] },
  ],
};

for (const [dimension, values] of Object.entries(taxonomyRegistryInput)) {
  assertUniqueValues(values.map(value => value.slug), `${dimension} taxonomy slugs`);
  assertUniqueValues(
    values.map(value => value.label.trim().toLowerCase()),
    `${dimension} taxonomy labels`
  );
}

export const taxonomyRegistry = taxonomyRegistrySchema.parse(taxonomyRegistryInput);
