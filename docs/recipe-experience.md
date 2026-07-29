# Calcutta Kitchen Recipe Experience Specification

Version: 1.0

Status: Approved

---

# Purpose

The Recipe Page is the most important page on the website.

Every other page—including Home, Categories, Collections, Search, Google Search, Pinterest, and social media—ultimately brings visitors here.

Therefore, this page should optimize for:

- Cooking experience
- Readability
- Mobile-first usage
- Educational storytelling
- SEO
- Affiliate opportunities
- User engagement

The recipe page is **not** a blog article.

It is a premium cooking experience.

---

# Core Philosophy

The experience should feel:

- Premium
- Editorial
- Warm
- Minimal
- Authentic Bengali
- Easy to cook from
- Fast

Brand Promise:

> রেসিপি নয়, রান্না শেখাই

This philosophy should influence every section.

Never shorten educational content merely to reduce page length.

Knowledge is part of the product.

---

# Design Principles

1. Mobile First

Over 90% of users arrive from mobile.

Every interaction must be optimized for one-handed use.

---

2. Reduce Cognitive Load

Do not overwhelm users.

Break long content into sections.

Provide whitespace.

Use cards where appropriate.

---

3. Preserve Information

Never truncate:

- About Recipe
- Chef's Tips
- Cooking Method
- FAQs

Long-form educational content is intentional.

---

4. Function Before Decoration

Interactive features should improve cooking.

Avoid decorative UI that adds friction.

---

# Page Structure

Breadcrumb

↓

Hero

↓

Recipe Actions

↓

About Recipe

↓

Ingredients + Equipment

↓

Method

↓

Chef's Tips

↓

FAQ

↓

Related Recipes

↓

Footer

---

# Hero

Display:

Recipe Image

Recipe Title

English Name

(Bengali Name)

Description

Recipe Metadata

Prep Time

Cook Time

Servings

Difficulty

Cuisine

Category

Protein

Meal

Tags

---

Example

Chicken Kosha

(চিকেন কষা)

The Bengali title should always appear beside the English title.

Never remove Bengali names.

Use Noto Serif Bengali.

---

# Recipe Actions

Restore:

Download Recipe

Translate to বাংলা

Translate to English

Print Recipe

Share Recipe (optional)

These actions should appear together as a toolbar.

---

# About Recipe

Display the complete recipe introduction.

Never truncate.

Editorial storytelling is encouraged.

---

# Ingredients

Restore ingredient checklist.

Every ingredient:

☐ Checkbox

Buttons:

✓ Check All

Clear All

Checkbox state should persist while the page is open.

---

# Equipment

Show as responsive product cards.

Each card contains:

Product Image

Product Name

Affiliate Button

Example

Iron Kadai

View Product →

Affiliate links should open in a new tab.

---

# Method

Restore every cooking step.

Never summarize.

Render each step as an individual card.

Example

Step 1

...

----------------

Step 2

...

----------------

Step 3

...

This improves readability during cooking.

---

# Chef's Tips

Restore every tip.

Never shorten.

Tips differentiate Calcutta Kitchen from ordinary recipe sites.

---

# FAQ

Display every FAQ.

Maintain Recipe + FAQ Schema.

---

# Related Recipes

Display 3–6 recipes.

Priority:

1. Same Protein

2. Same Cuisine

3. Same Meal

4. Same Series

Fallback:

Latest Recipes.

Never show the current recipe.

---

# Mobile Experience

Requirements:

Large tap targets

Comfortable spacing

Readable typography

Sticky actions (future)

Minimal scrolling friction

---

# Desktop Experience

Ingredients and equipment should remain visually associated.

Long method should remain comfortable to read.

---

# Typography

English:

Inter

Bengali:

Noto Serif Bengali

Section headings:

Medium

Body:

Regular

Do not overuse bold text.

---

# Colors

Use design tokens only.

Do not hardcode colors.

---

# Accessibility

Keyboard accessible

Semantic headings

Accessible checkboxes

Proper focus states

ARIA labels where appropriate

---

# SEO

Maintain:

Recipe Schema

FAQ Schema

Breadcrumb Schema

Canonical URLs

Open Graph

Twitter Cards

---

# Performance

Lazy-load below-the-fold images.

Optimize hero image.

Avoid layout shifts.

---

# Future Enhancements (Not in this phase)

Cook Mode

Ingredient Scaling

Shopping List

Voice-guided Cooking

Timers

Favorites

Recipe Notes

Recently Viewed

Nutrition Facts

Comments

Ratings

Save Recipe
