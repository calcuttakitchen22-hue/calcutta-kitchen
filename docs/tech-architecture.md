# Technical Architecture

## Purpose

This document defines the technical architecture of the Calcutta Kitchen website.

It ensures all contributors follow the same project structure, coding conventions, and implementation patterns.

The architecture prioritizes:

- Performance
- Scalability
- Maintainability
- SEO
- Accessibility
- Reusability

---

# Tech Stack

Framework

- Astro

Language

- TypeScript

Styling

- Tailwind CSS

Content

- Astro Content Collections
- Markdown (.md)

Images

- Astro Assets

Deployment

- Cloudflare Pages

Version Control

- Git

---

# Project Structure

src/

components/

layouts/

pages/

content/

recipes/

collections/

config/

styles/

utils/

assets/

public/

---

# Component Organization

Components should be grouped by purpose.

Example

components/

layout/

Navbar

Footer

Search

navigation/

Hero

CategoryGrid

RecipeGrid

cards/

RecipeCard

CollectionCard

VideoCard

ToolCard

common/

Button

Badge

Container

Section

Divider

EmptyState

SearchBar

Each component should have a single responsibility.

---

# Page Layouts

Use reusable layouts.

Examples

BaseLayout

RecipeLayout

CategoryLayout

CollectionLayout

StaticPageLayout

Avoid duplicate page structures.

---

# Content Collections

Recipes

Collections

Static Pages

Tools

Future:

Ingredients

Techniques

Guides

---

# Recipe Metadata

Each recipe should include:

slug

title

description

coverImage

prepTime

cookTime

totalTime

servings

difficulty

protein

meal

cuisine

type

series

tags

youtubeUrl

featured

relatedRecipes

draft

publishDate

author

---

# Collections

Collections are authored configuration entries with editorial metadata and
filters. Their pages and recipe membership are generated dynamically from those
filters; collections never duplicate recipes.

The collection schema defines filtering semantics and optional recipe display
order.

---

# Categories

Categories are generated dynamically.

Examples

Protein

Meal

Cuisine

Type

Series

Never create manual pages for each category.

Category dimensions are explicit: protein, meal, cuisine, type, and series.
Their allowed slugs, display labels, introductory copy, and related-category
links live in a shared taxonomy configuration.

---

# Routing

Recipes

/recipes/[slug]

Categories

/recipes/category/[dimension]/[slug]

Collections

/collections/[slug]

Tools

/tools/[slug]

About

/about

Work With Us

/work-with-us

Privacy Policy

/privacy-policy

Terms of Use

/terms-of-use

Search

/search

Legacy routes remain available until replacement routes, internal links,
canonical metadata, sitemap entries, and permanent redirects are verified.

---

# Homepage Configuration

Store homepage curation in one versioned configuration source under `src/config/`.
It contains ordered references to featured recipes, collections, videos, series,
and tools. It does not duplicate content from those collections.

---

# Images

Store optimized images.

Prefer:

WebP

AVIF

Responsive sizes

Every image must include:

Alt text

Width

Height

Lazy loading where appropriate

---

# Performance

Target Lighthouse

Performance

95+

Accessibility

100

Best Practices

100

SEO

100

---

# SEO

Every page should include:

Title

Description

Canonical URL

Open Graph

Twitter Cards

Structured Data

Breadcrumb Schema

Recipe Schema

FAQ Schema

XML Sitemap

Robots.txt

---

# Accessibility

Use semantic HTML.

Keyboard navigation.

Proper heading hierarchy.

Visible focus indicators.

Screen reader support.

Color contrast must meet WCAG AA.

---

# State Management

Prefer Astro islands.

Avoid unnecessary client-side JavaScript.

Hydrate only interactive components.

Default to server-rendered content.

---

# Search

Use a static, typed search index. Each indexed result identifies whether it is a
recipe, collection, category, or tool. Results rank recipes first, followed by
collections, categories, and tools. The search results page is `noindex`.

---

# Utility Functions

Reusable utilities should live in:

src/utils/

Examples

formatTime()

slugify()

readingTime()

groupRecipes()

relatedRecipes()

imageHelpers()

No duplicate utility functions.

`relatedRecipes()` uses manual recipe references only as overrides. Otherwise it
uses shared protein, cuisine, meal, type, series, and tags in that order, while
excluding the current recipe and duplicate results.

---

# Deployment

Version 1 uses Astro static output deployed to Cloudflare Pages. Cloudflare
redirects and headers are maintained in version-controlled `_redirects` and
`_headers` files. Environment variables are declared in Astro configuration and
configured in Cloudflare Pages; no secrets are committed to the repository.

---

# Naming Conventions

Components

PascalCase

RecipeCard.astro

Layouts

PascalCase

RecipeLayout.astro

Utilities

camelCase

formatTime.ts

Content Files

kebab-case

chicken-kosha.md

Images

kebab-case

chicken-kosha.webp

---

# Styling Rules

Do not use inline styles.

Prefer Tailwind utilities.

Avoid custom CSS unless necessary.

Keep styling consistent with the Design System.

---

# Error Handling

Every component should gracefully handle:

Missing image

Missing metadata

Missing video

Empty collections

No search results

Broken links

The website should never fail because optional content is missing.

---

# Code Quality

Write reusable code.

Avoid duplication.

Prefer composition over inheritance.

Keep components small and focused.

Document complex logic.

Avoid premature optimization.

---

# Future Scalability

The architecture should support:

1,000+ recipes

100+ collections

Multiple authors

Multiple languages

Recipe filtering

AI-powered search

User accounts (future)

Recipe ratings (future)

Without requiring major architectural changes.
