import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
site: {
  url: "https://calcuttakitchen.in/",
  title: "Calcutta Kitchen",
  description:
    "Authentic Bengali recipes, modern comfort food, desserts and kitchen stories.",
  author: "Calcutta Kitchen",
  profile: "https://calcuttakitchen.in",
  ogImage: "default-og.jpg",
  lang: "en",
  timezone: "Asia/Kolkata",
  dir: "ltr",
},
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,	
    },
    search: "pagefind",
  },
socials: [
  {
    name: "youtube",
    url: "https://www.youtube.com/@calcutta.kitchen/",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/calcuttakitchen.in/",
  },
  {
    name: "facebook",
    url: "https://www.facebook.com/calcuttakitchen22/",
  },
],	
});