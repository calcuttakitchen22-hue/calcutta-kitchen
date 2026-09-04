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
  featuredInstagram: z.array(
    z.object({
      title: z.string().min(1),
      url: z.url(),
      thumbnail: z.url(),
    })
  ),
  featuredTools: z.array(slugSchema),
});

const homepageCurationInput = {
  featuredRecipes: [
    "kolkata-mutton-biryani",
    "chicken-momo",
    "kolkata-chicken-biryani",
    "mutton-kosha",
    "kolkata-chicken-roll",
    "basanti-pulao",
  ],
  featuredCollections: ["weeknight-dinners"],
  featuredSeries: ["cook-like-a-lyadhkhor"],
  featuredVideos: [],
  featuredInstagram: [],
  featuredTools: [],
};

assertUniqueValues(homepageCurationInput.featuredRecipes, "featured recipe filenames");
assertUniqueValues(homepageCurationInput.featuredCollections, "featured collection slugs");
assertUniqueValues(homepageCurationInput.featuredSeries, "featured series slugs");
assertUniqueValues(homepageCurationInput.featuredTools, "featured tool slugs");

export const homepageCuration = homepageCurationSchema.parse(homepageCurationInput);
