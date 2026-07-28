import type { ImageMetadata } from "astro";

export type NavigationItem = {
  label: string;
  href: string;
};

export type FooterNavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteLogo = {
  src: ImageMetadata;
  alt: string;
  width: number;
  height: number;
};

export type PageMetadata = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  noindex?: boolean;
};

export type SiteConfiguration = {
  name: string;
  url: string;
  description: string;
  logo?: SiteLogo;
  navigation: NavigationItem[];
  footerNavigation: FooterNavigationGroup[];
  socialLinks: SocialLink[];
};
