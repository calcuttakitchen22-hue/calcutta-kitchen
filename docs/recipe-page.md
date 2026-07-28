# Recipe Page Specification

## Purpose

The recipe page is the primary content template of Calcutta Kitchen.

Its purpose is to help users successfully cook a recipe while encouraging them to discover more related recipes and watch the accompanying YouTube video.

Every recipe page should provide a consistent experience regardless of recipe type.

---

# User Goals

A visitor should be able to:

- Understand what the recipe is.
- Decide whether they want to cook it.
- View ingredients quickly.
- Follow the cooking steps easily.
- Watch the YouTube video if needed.
- Save or print the recipe.
- Discover similar recipes.

---

# Page Structure

1. Breadcrumb
2. Recipe Hero
3. Recipe Overview
4. Quick Information
5. Jump To Section
6. Ingredients
7. Equipment
8. Cooking Method
9. Pro Tips
10. Frequently Asked Questions
11. Nutrition (Future)
12. Recipe Video
13. Related Recipes
14. Comments (Future)

---

# Breadcrumb

Purpose:

Help users understand where they are.

Example:

Home

>

Recipes

>

Chicken

>

Chicken Kosha

---

# Recipe Hero

Display:

- Large featured image
- Recipe title
- Short introduction
- Rating (Future)
- Preparation time
- Cooking time
- Total time
- Servings
- Difficulty

Primary Buttons:

- Jump to Recipe
- Print Recipe
- Watch Video

---

# Recipe Overview

A short introduction explaining:

- What the dish is
- Why it is popular
- When it is commonly served
- Why users will enjoy this recipe

Keep it concise.

---

# Quick Information

Display as compact information cards.

Include:

- Prep Time
- Cook Time
- Total Time
- Servings
- Difficulty
- Cuisine
- Meal Type

---

# Jump To Section

Provide quick navigation to:

- Ingredients
- Equipment
- Method
- Tips
- FAQ
- Video

Sticky on desktop.

---

# Ingredients

Display ingredients in a clear checklist.

Each ingredient includes:

- Quantity
- Unit
- Ingredient name
- Notes (optional)

Example:

500 g Chicken

2 Onions

1 tsp Turmeric Powder

---

# Equipment

Display only equipment actually required.

Examples:

- Pressure Cooker
- Kadai
- Mixer Grinder
- OTG

Each item may optionally link to the Tools We Use page.

---

# Cooking Method

Present as numbered steps.

Each step should include:

- Instruction
- Optional image
- Helpful note (if required)

Avoid long paragraphs.

One action per step.

---

# Pro Tips

Highlight practical cooking advice.

Examples:

- Ingredient substitutions
- Common mistakes
- Storage tips
- Serving suggestions

Display as a highlighted callout section.

---

# Frequently Asked Questions

Answer common questions.

Examples:

- Can I make this ahead?
- Can I freeze it?
- Can I use boneless chicken?
- How long will it last?

Use structured FAQ markup for SEO.

---

# Nutrition

Version 1:

Hidden.

Future:

Display estimated nutrition per serving.

---

# Recipe Video

Embed the corresponding YouTube video.

Display:

- Thumbnail
- Embedded player
- Watch on YouTube button

If no video exists, hide this section.

---

# Related Recipes

Purpose:

Increase recipe discovery.

Display 4–6 related recipes based on:

- Same protein
- Same cuisine
- Same meal type
- Same collection

Avoid showing duplicate recommendations.

---

# Comments

Version 1:

Disabled.

Future:

Reader comments and ratings.

---

# Mobile Experience

Requirements:

- Mobile-first layout
- Sticky Jump to Recipe button
- Large touch targets
- Readable typography
- Optimized images
- Fast loading

---

# Accessibility

Requirements:

- Semantic HTML
- Proper heading hierarchy
- Alt text for every image
- Keyboard navigation
- High color contrast
- Screen-reader friendly recipe structure

---

# SEO

Every recipe page should include:

- Unique title
- Meta description
- Canonical URL
- Open Graph tags
- Twitter Cards
- Recipe Schema
- FAQ Schema
- Breadcrumb Schema

---

# Performance

Target:

- Lighthouse Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Images should use modern formats and lazy loading where appropriate.

---

# Success Criteria

A successful recipe page should enable users to:

- Decide whether to cook the recipe within 30 seconds.
- Follow the recipe without confusion.
- Watch the video if additional guidance is needed.
- Discover at least one additional recipe before leaving the page.