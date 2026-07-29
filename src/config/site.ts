import type { SiteConfiguration } from "@/types/site";
import logo from "@/assets/images/calcutta-kitchen-logo.svg";

export const siteConfig: SiteConfiguration = {
  name: "Calcutta Kitchen",
  url: "https://calcuttakitchen.in",
  description:
    "Authentic Bengali recipes, modern comfort food, desserts and kitchen stories.",
  logo: {
    src: logo,
    alt: "Calcutta Kitchen",
    width: 148,
    height: 60,
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/recipes" },
    { label: "Collections", href: "/collections" },
    { label: "Kitchen Tools", href: "/kitchen-tools/" },
    { label: "Work With Us", href: "/work-with-us" },
    { label: "About Us", href: "/about" },
  ],
  footerNavigation: [
    {
      label: "Explore",
      items: [
        { label: "Recipes", href: "/recipes" },
        { label: "Collections", href: "/collections" },
        { label: "Kitchen Tools", href: "/kitchen-tools/" },
      ],
    },
    {
      label: "Calcutta Kitchen",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Work With Us", href: "/work-with-us" },
      ],
    },
  ],
  socialLinks: [
    { label: "YouTube", href: "https://www.youtube.com/@calcutta.kitchen/", platform: "youtube" },
    { label: "Instagram", href: "https://www.instagram.com/calcuttakitchen.in/", platform: "instagram" },
    { label: "Facebook", href: "https://www.facebook.com/calcuttakitchen22/", platform: "facebook" },
  ],
};
