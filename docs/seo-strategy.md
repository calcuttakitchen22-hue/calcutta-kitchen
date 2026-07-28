# Calcutta Kitchen SEO Strategy

## Purpose

This document defines the Search Engine Optimization (SEO) strategy for the Calcutta Kitchen website.

The goal is to build a long-term, evergreen source of organic traffic by making every recipe, category, and collection easily discoverable through search engines.

SEO decisions should prioritize long-term growth over short-term ranking tactics.

---

# SEO Goals

Primary Goals

- Increase organic traffic
- Improve recipe discoverability
- Increase pages per session
- Increase returning visitors
- Drive traffic to YouTube
- Become an authority on Bengali and Indian home cooking

Success Metrics

- Organic Sessions
- Indexed Pages
- Click Through Rate (CTR)
- Average Position
- Impressions
- Rich Results
- Recipe Rich Snippets
- Internal Click Depth
- Time on Page

---

# SEO Philosophy

The website is a structured recipe library, not a blog.

Content should be organized around user intent rather than publishing date.

Every page should answer a specific search query.

Avoid creating pages that exist only for SEO.

Every page must provide genuine value to users.

---

# URL Structure

URLs should be:

- Short
- Descriptive
- Permanent
- Human readable

Examples

Good

/recipes/chicken-kosha

/recipes/aloo-posto

/collections/comfort-food

/tools/otg

Avoid

/recipe?id=123

/recipes/2026/07/chicken-kosha

/recipes/category/chicken/chicken-kosha

Recipe URLs should never change after publication.

Category URLs use an explicit taxonomy dimension:

- `/recipes/category/protein/chicken`
- `/recipes/category/meal/dinner`
- `/recipes/category/cuisine/bengali`
- `/recipes/category/type/rice`
- `/recipes/category/series/cook-like-a-lyadhkhor`

---

# Slug Rules

Use lowercase.

Use hyphens.

No dates.

No IDs.

No stop words unless necessary.

Examples

Good

chicken-kosha

bhapa-doi

beguni

Bad

Chicken_Kosha

recipe-001

my-best-ever-chicken-kosha-recipe

---

# Page Titles

Each page requires a unique title.

Recommended format

Recipe

Chicken Kosha Recipe | Calcutta Kitchen

Collection

Comfort Food Recipes | Calcutta Kitchen

Category

Chicken Recipes | Calcutta Kitchen

Static Pages

About | Calcutta Kitchen

Keep titles under 60 characters whenever possible.

---

# Meta Descriptions

Every page requires a unique description.

Target length

140–160 characters.

Describe the value of the page.

Avoid keyword stuffing.

Example

Learn how to make authentic Bengali Chicken Kosha with step-by-step instructions, cooking tips, and a detailed recipe video.

---

# Heading Structure

Use only one H1 per page.

Recommended hierarchy

H1

Recipe Title

H2

About

Ingredients

Method

Tips

FAQ

Related Recipes

H3

Subsections

Never skip heading levels.

---

# Recipe Schema

Every recipe page should implement Schema.org Recipe markup.

Include:

- Name
- Description
- Image
- Author
- Date Published
- Prep Time
- Cook Time
- Total Time
- Recipe Yield
- Ingredients
- Instructions
- Cuisine
- Category
- Keywords
- Nutrition (when available)
- Video (if available)

Required for Google Recipe Rich Results.

---

# FAQ Schema

Every recipe FAQ should generate structured FAQ schema.

Only include questions that appear visibly on the page.

Do not create hidden FAQ content.

---

# Breadcrumb Schema

Every page should include Breadcrumb schema.

Example

Home

Recipes

Chicken

Chicken Kosha

---

# Organization Schema

The website should expose Organization schema.

Include

- Brand Name
- Logo
- Website
- Social Profiles

---

# WebSite Schema

Include:

- SearchAction
- Website URL
- Website Name

Supports Google's sitelinks search box.

---

# Open Graph

Every page should include:

og:title

og:description

og:image

og:url

og:type

Use recipe images whenever possible.

---

# Twitter Cards

Use:

summary_large_image

Include:

Title

Description

Featured Image

---

# Canonical URLs

Every page requires a canonical URL.

Never create duplicate canonicals.

Canonical should always point to the preferred version.

---

# Robots

Allow indexing of:

Recipes

Categories

Collections

Tools

About

Block:

Admin

Drafts

Temporary pages

Test pages

---

# XML Sitemap

Automatically generate.

Include

Recipes

Categories

Collections

Tools

Static Pages

Exclude

Drafts

404

Private pages

---

# Internal Linking

Every recipe should link to:

Related recipes

Its category

Relevant collections

Equipment used

Related cooking series

Internal links should feel natural.

Avoid excessive linking.

---

# Categories

Categories are landing pages.

Examples

Chicken Recipes

Fish Recipes

Dinner Recipes

Desserts

Italian Recipes

Every category page should:

- Have unique introductory content
- Display recipes
- Link to related categories
- Link to collections

---

# Collections

Collections target broader search intent.

Examples

Comfort Food

Beginner Recipes

30 Minute Meals

Summer Recipes

Collections should include:

Unique introduction

Relevant recipes

Internal links

Related collections

---

# Content Freshness

Do not republish recipes simply to update dates.

Instead:

Improve:

Images

Instructions

Tips

FAQ

Internal links

Schema

Descriptions

Google values updated quality over artificial freshness.

---

# Image SEO

Every image requires:

Descriptive filename

Example

chicken-kosha.webp

Not

IMG_1234.jpg

Every image requires:

- Alt text
- Width
- Height
- Responsive sizes
- Compression

Use WebP or AVIF where supported.

---

# Video SEO

Embed the matching YouTube video.

Include:

Title

Description

Thumbnail

VideoObject Schema (future)

---

# Search Intent

Write for users, not keywords.

Examples

Good

How to make Chicken Kosha

Traditional Bengali Bhapa Doi

Easy Beguni Recipe

Avoid

Best Chicken Kosha Recipe Ever 2026

---

# Duplicate Content

Avoid duplicate pages.

Collections should reuse recipe metadata.

Categories should not duplicate recipe introductions.

Canonical URLs should prevent duplication.

---

# Pagination

Large categories should paginate.

Every paginated page should include:

Previous

Next

Canonical

Proper navigation

---

# Search

Internal search pages should be marked as noindex.

Search results should not appear in Google.

Search must rank recipes ahead of collections, categories, and tools. Its static
index must label each result with its content type so that this ranking is
deterministic and the interface can communicate the result type clearly.

---

# 404 Pages

404 pages should:

Explain the error.

Suggest popular recipes.

Provide search.

Provide links to categories.

Never leave users at a dead end.

---

# Core Web Vitals

Target

Largest Contentful Paint (LCP)

< 2.5 seconds

Interaction to Next Paint (INP)

< 200ms

Cumulative Layout Shift (CLS)

< 0.1

---

# Performance Strategy

Use Astro's static generation whenever possible.

Minimize JavaScript.

Optimize fonts.

Lazy-load below-the-fold images.

Compress assets.

Avoid unnecessary client-side hydration.

---

# Accessibility

SEO and accessibility work together.

Every page must support:

Semantic HTML

Proper headings

Alt text

Keyboard navigation

Visible focus states

Screen readers

---

# Analytics

Track

Organic Traffic

Landing Pages

Search Queries

CTR

Recipe Performance

Internal Search

Exit Pages

Top Categories

Top Collections

YouTube Clicks

---

# Future SEO Roadmap

Phase 1

Recipe Schema

FAQ Schema

Breadcrumbs

Categories

Collections

Image SEO

Phase 2

Video Schema

Ingredient Pages

Technique Pages

Food Dictionary

Kitchen Science

Phase 3

AI-powered Internal Search

Personalized Recommendations

Voice Search Optimization

Recipe Filters

---

# Definition of Done

A page is SEO-complete only if it includes:

✓ Unique Title

✓ Unique Meta Description

✓ Canonical URL

✓ Open Graph Tags

✓ Twitter Card

✓ Structured Data

✓ Breadcrumbs

✓ Optimized Images

✓ Internal Links

✓ Accessible HTML

✓ Mobile-Friendly Layout

✓ Fast Performance

✓ Included in XML Sitemap

If any item is missing, the page is not considered SEO-ready.
