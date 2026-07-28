# Homepage Specification

## Purpose

The homepage is the primary entry point to Calcutta Kitchen.

Its purpose is to help users quickly discover recipes and encourage them to continue exploring the website.

The homepage should feel like a premium cooking brand—not a blog or news website.

The homepage should prioritize recipe discovery over chronological content.

---

# User Goals

A visitor should be able to:

- Search for a recipe immediately.
- Browse recipes by category.
- Discover featured recipes.
- Explore curated collections.
- Watch cooking videos.
- Learn about Calcutta Kitchen.
- Navigate anywhere within three clicks.

---

# Page Structure

1. Navigation
2. Hero Section
3. Search
4. Featured Recipes
5. Browse Recipes
6. Collections
7. Latest YouTube Videos
8. Cook Like a Lyadhkhor
9. Tools We Use
10. Work With Us
11. Footer

---

# Navigation

Purpose:

Provide access to every major section of the website.

Menu:

- Home
- Recipes
- Collections
- Tools We Use
- Work With Us
- About Us

Search icon should always be visible.

Navigation remains sticky while scrolling.

---

# Hero Section

Purpose:

Introduce the brand and immediately communicate what the website offers.

Content:

Headline:

Traditional Bengali Cooking.
Modern Comfort Food.

Subheading:

Explore authentic Bengali recipes, practical kitchen techniques, and everyday comfort food made simple.

Primary CTA:

Browse Recipes

Secondary CTA:

Watch on YouTube

Background:

Large, high-quality food photography with a subtle overlay to maintain text readability.

---

# Search Section

Purpose:

Enable visitors to find recipes immediately.

Requirements:

- Large search input
- Prominent placement
- Autocomplete support (future)
- Keyboard accessible
- Visible on desktop and mobile

Placeholder:

Search recipes...

---

# Featured Recipes

Purpose:

Highlight evergreen recipes.

Do NOT display the latest recipes automatically.

Selection and display order come from the versioned homepage configuration, not
from page-specific recipe data or an unordered boolean flag.

This section should be manually curated.

Display:

6 recipe cards

Each card includes:

- Featured image
- Recipe title
- Cook time
- Difficulty
- Short description

Example recipes:

- Chicken Kosha
- Basanti Pulao
- Aloo Posto
- Bhapa Doi
- Maacher Jhol
- Ghugni

---

# Browse Recipes

Purpose:

Help users navigate the recipe library.

Display four category cards:

- By Protein
- By Meal
- By Cuisine
- By Type

Each card links to a dedicated category landing page.

---

# Collections

Purpose:

Promote curated recipe collections.

Display six featured collections.

Examples:

- Comfort Food
- Beginner Recipes
- Festive Recipes
- Under 30 Minutes
- Chicken Recipes
- Summer Specials

Include a "View All Collections" button.

---

# Latest YouTube Videos

Purpose:

Connect the website with the YouTube channel.

Display:

- Recent uploads
- Thumbnail
- Title
- Duration

Include:

View Channel button.

---

# Cook Like a Lyadhkhor

Purpose:

Highlight the signature recipe series.

Display:

- Cover image
- Series description
- Featured episodes
- Explore Series button

---

# Tools We Use

Purpose:

Recommend kitchen equipment used in recipes.

Display:

Equipment cards with:

- Image
- Product name
- Short description

Future:

Affiliate links.

---

# Work With Us

Purpose:

Business inquiries and collaborations.

Display:

Headline

Let's Cook Something Amazing Together

Buttons:

- Brand Collaborations
- Contact Us

---

# Footer

Include:

Logo

Navigation

Recipe Categories

Collections

Social Media

Newsletter Signup (future)

Copyright

Privacy Policy

Terms of Use

---

# Mobile Experience

The homepage must be designed mobile-first.

Requirements:

- Fully responsive
- Touch-friendly controls
- Collapsible navigation
- Optimized images
- Fast loading
- No horizontal scrolling

---

# Accessibility

The homepage must meet WCAG AA standards.

Requirements:

- Proper heading hierarchy
- Keyboard navigation
- Alt text for images
- Sufficient color contrast
- Visible focus states

---

# Performance

Target:

- Lighthouse Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Core Web Vitals should remain within Google's recommended thresholds.

---

# Success Criteria

A successful homepage should enable visitors to:

- Understand the brand within 5 seconds.
- Find a recipe within 15 seconds.
- Discover additional recipes through categories and collections.
- Transition to YouTube when appropriate.
- Continue exploring without relying on chronological content.
