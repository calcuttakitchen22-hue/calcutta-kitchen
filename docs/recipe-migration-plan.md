# Recipe Migration Plan

## Purpose

This plan prepares Calcutta Kitchen to migrate recipe material from legacy
AstroPaper posts, existing recipe entries, social platforms, and editorial notes
without changing existing URLs or weakening the current recipe experience.

## Current inventory snapshot

| Source | Count | Notes |
| --- | ---: | --- |
| Legacy posts in `src/content/posts/` | 12 | Continue serving from `/posts/...`. |
| Structured recipes in `src/content/recipes/` | 7 | Serve from `/recipes/[filename]/`. |
| Legacy-to-structured duplicates already present | 7 | Aloo Posto, Chicken Kosha, Ghugni, Kolkata Chicken Biryani, Maacher Jhol, Mango Bhapa Doi, and Sorshe Ilish. |
| Legacy-only recipes | 5 | Basanti Pulao, Ilish Bhapa, Kolkata Chicken Roll, Kolkata Egg Roll, and Maach Bhaja. |

The structured recipe filename is the canonical identifier. For example,
`src/content/recipes/chicken-kosha.md` produces `/recipes/chicken-kosha/`.
Do not add a second frontmatter slug for a recipe.

## Source inventory strategy

Create one spreadsheet-compatible master inventory before editing any recipe
content. Each row represents a single dish, not a source document. Add every
source reference to that row:

- Existing structured recipes under `src/content/recipes/`.
- Legacy posts under `src/content/posts/`.
- Previous-site URLs and exported Markdown.
- Instagram post URLs and relevant caption/comment URLs.
- YouTube video URLs and description captures.
- Manually written notes, with author and date where known.

The inventory is the migration control record. Markdown remains the published
source of truth; the inventory must not become a second content store.

## Spreadsheet-compatible inventory columns

| Field | Purpose |
| --- | --- |
| `recipe_id` | Immutable internal identifier, e.g. `ck-rec-0001`. |
| `recipe_name` | Current English display title. |
| `bengali_name` | Bengali display title, if reviewed. |
| `current_source` | Primary source type: `structured-recipe`, `legacy-post`, `instagram`, `youtube`, `notes`, or `previous-site`. |
| `source_url` | Source URL or repository-relative path. Multiple sources may be semicolon-separated. |
| `existing_slug` | Existing legacy post filename/slug, if any. |
| `target_slug` | Intended structured recipe filename, without `.md`. |
| `current_status` | One of the status definitions below. |
| `content_complete` | `yes`, `partial`, or `no`. |
| `image_available` | `yes`, `needs-export`, `needs-license-review`, or `no`. |
| `english_complete` | `yes`, `partial`, or `no`. |
| `bengali_complete` | `yes`, `partial`, or `no`. |
| `taxonomy_complete` | `yes`, `partial`, or `no`. |
| `seo_complete` | `yes`, `partial`, or `no`. |
| `reviewed` | Reviewer name and review date, or blank. |
| `published` | `legacy-only`, `structured`, `both`, or `not-published`. |
| `notes` | Gaps, conflicts, attribution, and publishing notes. |

Recommended supplementary columns are `legacy_url`, `youtube_url`,
`instagram_url`, `image_path`, `source_updated_at`, `duplicate_of`,
`migration_batch`, and `qa_build_passed`.

## Duplicate detection

Use a two-stage process:

1. Detect candidates mechanically by normalized English title, Bengali title,
   legacy filename, target filename, YouTube video ID, and source URL.
2. Confirm candidates editorially by comparing the dish, ingredients, method,
   image, and publication intent.

Never automatically merge records solely because titles are similar. Recipes
with regional or method variations should receive separate `recipe_id` values
and clearly differentiated target slugs.

For a candidate that matches an existing structured entry, retain the legacy
post as a source record and mark the inventory row `both`; do not create a
second structured entry.

## Migration workflow

1. Add or update the inventory row and assign a batch.
2. Choose the primary source and record all secondary sources.
3. Verify title, Bengali title, description, dates, image rights, and video URL.
4. Map the source into the existing `recipes` schema in `src/content.config.ts`.
5. Preserve authored ingredient and method groupings. Recipes such as Kolkata
   Chicken Biryani require grouped ingredients and grouped steps.
6. Add English and Bengali content independently; do not generate a Bengali
   translation merely to satisfy a field.
7. Apply taxonomy values from the registry, then review related recipes and
   affiliate product IDs.
8. Validate local content, route output, schema, accessibility, and SEO.
9. Mark the inventory row `ready-for-review`; publish only after editorial
   approval.

Legacy posts and `/posts/...` routes remain untouched throughout migration.

## Content review workflow

Each recipe requires separate content and technical review:

- **Editorial:** quantities, sequence, timing, substitutions, yield, tips, FAQ,
  terminology, and title accuracy.
- **Bilingual:** Bengali title, ingredients, headings, and method are complete
  and preserve group boundaries.
- **Taxonomy:** metadata accurately reflects discovery intent without adding
  speculative categories.
- **Technical:** image imports resolve, affiliate IDs exist, recipe schema and
  FAQ schema remain valid, and the canonical recipe URL is stable.

Use a four-eye review for recipes sourced from captions, comments, or informal
notes because those sources frequently omit timing, yield, and method detail.

## Image migration workflow

1. Prefer a local source image under `src/assets/recipes/` with a descriptive
   filename.
2. Record provenance and rights in the inventory before import.
3. Provide a specific `coverImageAlt`; do not reuse the title as alt text.
4. Import images through the recipe frontmatter so Astro can optimize them.
5. Inspect desktop and mobile crops before publication.
6. Retain the original source asset until the migrated page is approved.

For hero replacements, prepare a 16:9 source at least 1920 × 1080. Astro can
derive responsive versions from that source.

## English and Bengali handling

English content is required by the current schema. Bengali fields are optional,
but a recipe advertised as translatable should not be published with partial
Bengali instructions.

- Use `titleBn`, `ingredientsBn`, and `stepsBn` only after human editorial
  review.
- Preserve `HEADING:` records in Bengali ingredient and step arrays where a
  source recipe has groups.
- Keep English and Bengali methods aligned in count and order where both are
  present; this is required by the structured PDF workflow.
- Keep mixed-language culinary terms where they are the established authored
  wording rather than forcing unnatural translations.

## SEO and URL preservation

- The structured recipe URL is `/recipes/[filename]/`.
- Existing `/posts/[...slug]/` routes must continue to resolve during migration.
- Do not rename a published structured filename.
- Keep unique title, description, cover image, canonical path, Recipe JSON-LD,
  FAQ JSON-LD, and breadcrumb JSON-LD intact.
- Record legacy and target URLs in the inventory. Redirect decisions require a
  separate approved migration because the current project intentionally keeps
  both routes available.

## Publication checklist

- [ ] Target filename is unique and matches the approved target slug.
- [ ] Required schema fields validate.
- [ ] English title, description, about, ingredients, steps, tips, and FAQ are reviewed.
- [ ] Bengali content is complete or intentionally absent.
- [ ] Ingredient and method groupings are preserved.
- [ ] Cover image, alt text, and rights are confirmed.
- [ ] Taxonomy values come from the registry.
- [ ] Affiliate product IDs resolve, if present.
- [ ] Video URL and thumbnail resolve, if present.
- [ ] SEO metadata is unique and within length guidance.
- [ ] `/recipes/[slug]/` renders correctly on mobile and desktop.
- [ ] Legacy route behavior is unchanged.
- [ ] Astro validation and production build pass.

## Status definitions

| Status | Meaning |
| --- | --- |
| `discovered` | Source identified, not yet assessed. |
| `inventory-complete` | Sources and duplicate decision recorded. |
| `needs-content` | One or more core recipe sections are missing. |
| `in-migration` | Structured entry is being authored. |
| `ready-for-review` | Content and metadata are complete, awaiting review. |
| `needs-revision` | Reviewer identified a content, taxonomy, image, or SEO issue. |
| `approved` | Editorial and technical review complete. |
| `published` | Structured route is live and validated. |
| `deferred` | Intentionally postponed with a reason. |

## Recommended batch size

Migrate **three recipes per batch**. This is small enough to review bilingual
content, images, taxonomy, schema, and route output carefully, while still
allowing the five legacy-only recipes to be completed in two focused batches.
Recipes with extensive grouped content, such as biryani, should be their own
batch or paired only with a simple recipe.

## Recommended migration batches

### Batch 1 — Legacy posts with complete source material

**Recipes:** Bengali Basanti Pulao, Ilish Bhapa, Kolkata Chicken Roll, Kolkata
Egg Roll, and Maach Bhaja.

**Entry criteria:** Legacy Markdown, a valid source image, English content,
Bengali content, and a YouTube URL are available. The inventory must have a
duplicate decision and approved target slug.

**Exit criteria:** Each recipe validates in the structured collection, renders
at `/recipes/[slug]/`, preserves source method/ingredient groups, and leaves
the matching `/posts/[slug]/` route unchanged.

**Manual review:** Taxonomy, time, difficulty, translated groups, equipment
products, image rights/crop, and SEO metadata.

**Risks:** Legacy posts do not carry the complete structured taxonomy or timing
model. Roll/recipe variants may need an editorial duplicate decision before
publication.

**Suggested batch size:** Three recipes, then two recipes.

### Batch 2 — Complete Instagram or YouTube source material

**Entry criteria:** Source caption/description is captured in the inventory,
with a stable source URL, image rights, and enough detail to author a complete
method rather than infer one.

**Exit criteria:** Full structured recipe, reviewed taxonomy, and separate
English/Bengali completeness decisions.

**Manual review:** Reconstruct missing quantities, timings, and yields from an
authoritative source; do not treat comments as canonical without confirmation.

**Risks:** Captions and descriptions commonly omit critical method detail.

**Suggested batch size:** Three recipes.

### Batch 3 — Partial recipes requiring editorial review

**Entry criteria:** Dish identity and one reliable source exist, but essential
content is incomplete or contradictory.

**Exit criteria:** Missing facts are authored and reviewed; no unresolved
instruction or measurement remains.

**Manual review:** Recipe testing or explicit creator confirmation.

**Risks:** Publishing an untested reconstruction damages trust and SEO quality.

**Suggested batch size:** One to two recipes.

### Batch 4 — Recipes missing images or bilingual content

**Entry criteria:** Recipe content is complete but image, rights, Bengali copy,
or another publication requirement is missing.

**Exit criteria:** Every required publication asset and language decision is
recorded; a recipe is either fully ready or explicitly deferred.

**Manual review:** Translation fidelity, image provenance, mobile crop, and alt
text.

**Risks:** Partial translations and unverified images should not be presented as
complete recipe experiences.

**Suggested batch size:** Two recipes.
