# Calcutta Kitchen Content Model

## Purpose

This document defines the data structure for every content type used by the Calcutta Kitchen website.

It serves as the single source of truth for:

- Astro Content Collections
- Markdown frontmatter
- Page generation
- Search
- SEO
- Related content
- Future CMS integrations

Every content type must follow this specification.

---

# Content Types

Version 1 supports:

- Recipe
- Collection
- Tool
- Static Page

Homepage configuration is versioned site configuration, not a content collection.

Future versions may include:

- Ingredient
- Technique
- Guide
- Series
- Author

---

# Recipe

A recipe is the primary content type.

Each recipe represents one complete dish.

Required Fields

slug

Unique URL slug.

Example

chicken-kosha

---

title

Recipe name.

Example

Chicken Kosha

---

description

Short summary.

Maximum 160 characters.

Used for:

- Meta description
- Cards
- Social sharing
- Search results

---

coverImage

Primary image.

---

coverImageAlt

Descriptive alt text.

---

prepTime

Minutes.

Example

20

---

cookTime

Minutes.

Example

45

---

totalTime

Automatically calculated.

---

servings

Example

4

---

difficulty

Allowed values

easy

medium

hard

---

protein

Allowed values

chicken

fish

mutton

vegetarian

egg

seafood

---

meal

Allowed values

breakfast

lunch

dinner

snack

dessert

beverage

---

cuisine

Allowed values

bengali

indian

italian

chinese

asian

continental

fusion

---

type

Examples

rice

curry

bread

baking

sauce

sweet

---

series

Optional.

Example

Cook Like a Lyadhkhor

---

featured

Boolean.

Controls homepage.

---

youtubeUrl

Optional.

---

tags

Array of keywords.

Example

chicken

bengali

spicy

comfort-food

---

publishDate

ISO format.

---

updatedDate

Optional.

---

draft

Boolean.

Default false.

---

author

Default

Calcutta Kitchen

---

ingredients

Array

Each ingredient contains

quantity

unit

name

notes

Example

- quantity: 500
  unit: g
  name: Chicken

---

equipment

Array

Example

Pressure Cooker

OTG

Kadai

---

steps

Ordered array.

Each step contains

title

instruction

optional image

optional tip

---

tips

Array

Optional.

---

faq

Array

Each FAQ contains

question

answer

---

relatedRecipes

Optional array.

Use only as an editorial override. If absent, generate recommendations by shared
protein, cuisine, meal, type, series, then tags. Exclude the current recipe and
duplicates, and return four to six recipes.

---

nutrition

Future.

---

# Collection

Collections group recipes.

Each collection is an authored configuration entry. Its landing page is generated
from the entry's metadata and its membership is generated from recipe metadata;
collections never duplicate recipe content.

Fields

slug

title

description

coverImage

coverImageAlt

featured

featuredOrder

intro

filters

recipeOrder

seoTitle

seoDescription

---

Filters

May include

protein

meal

cuisine

tags

series

difficulty

All populated filter dimensions must match. Multiple values within one dimension
are alternatives. A collection must define at least one filter. `recipeOrder`
may promote matching recipes without adding recipes that do not match the
filters.

---

# Homepage Configuration

Homepage curation lives in one versioned configuration source. It stores ordered
references for featured recipes, featured collections, videos, series, and tools.

Recipe, collection, series, and tool data remains in its own collection; the
homepage configuration only controls selection and display order.

---

# Tool

Kitchen equipment.

Fields

slug

title

description

image

affiliateLink

pros

cons

relatedRecipes

---

# Static Page

Examples

About

Work With Us

Privacy Policy

Terms

Fields

slug

title

description

content

seoTitle

seoDescription

Canonical Version 1 routes:

- About: `/about`
- Work With Us: `/work-with-us`
- Privacy Policy: `/privacy-policy`
- Terms of Use: `/terms-of-use`

---

# Relationships

Recipe

↓

Categories

↓

Collections

↓

Series

↓

Tools

Relationships should be generated from metadata.

Avoid manually maintaining links whenever possible.

---

# Validation Rules

Every recipe must include:

✓ title

✓ slug

✓ description

✓ cover image

✓ alt text

✓ prep time

✓ cook time

✓ servings

✓ difficulty

✓ cuisine

✓ meal

✓ ingredients

✓ method

✓ tags

Recipes missing required fields should fail validation.

---

# Future Compatibility

The content model should support:

- Multiple authors
- Multiple languages
- Ratings
- Comments
- Nutrition
- AI search
- Voice assistants
- External CMS

without changing the existing schema.
