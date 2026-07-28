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

export type CardImage = {
  src: string;
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
  navigation: NavigationItem[];
  footerNavigation: FooterNavigationGroup[];
  socialLinks: SocialLink[];
};
