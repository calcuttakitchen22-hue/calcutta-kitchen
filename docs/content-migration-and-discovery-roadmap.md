# Content Migration and Discovery Roadmap

## Recommended order

Complete the phases in the order below. The order protects the completed
homepage and recipe experience by settling source records and taxonomy before
new discovery pages or migrations are introduced.

## Phase 6A audit baseline

### Homepage hero

- **Renderer:** `src/components/home/HomeHero.astro`, invoked by `src/pages/index.astro`.
- **Current image source:** the first resolved recipe in
  `homepageCuration.featuredRecipes`. Today this is `chicken-kosha`, whose
  frontmatter imports `../../assets/recipes/chicken-kosha.png`, resolving to
  `src/assets/recipes/chicken-kosha.png`.
- **Image handling:** `HomeHero` uses Astro's `<Image>` component with widths
  of 640, 960, 1440, and 1920 and `sizes="100vw"`; it is optimized at build
  time.
- **Current image dimensions:** 1920 × 1080, 16:9.
- **Responsive behavior:** desktop and mobile use the same source image and
  `object-cover`; there is no separate mobile asset or art direction.
- **Replacement guidance:** supply a 16:9 image at least 1920 × 1080, with the
  subject safely visible through a full-bleed crop. A future mobile-specific
  crop would require an explicit, separately approved art-direction change.

### Featured recipes

- **Renderer:** the Featured Recipes block in `src/pages/index.astro`, using
  `src/components/cards/RecipeCard.astro`.
- **Selection and order:** `src/config/homepage.ts` contains the explicit,
  validated `featuredRecipes` list. Its schema requires exactly six values;
  array order is display order.
- **Current list:** Chicken Kosha, Aloo Posto, Mango Bhapa Doi, Maacher Jhol,
  Ghugni, and Sorshe Ilish.
- **Not used for homepage curation:** legacy post `featured: true` values and
  an unordered recipe `featured` flag. The structured recipe schema does not
  define a `featured` field.
- **Update procedure:** edit only `homepageCuration.featuredRecipes` in
  `src/config/homepage.ts`, keeping six unique structured recipe filenames.
  This is the recommended long-term system. Add a future cross-reference
  validation so a syntactically valid but missing recipe filename cannot reduce
  the displayed count silently.

### Structured recipe model

The `recipes` collection is defined in `src/content.config.ts`; it loads only
flat `*.md` files in `src/content/recipes/`. The filename is the canonical
identifier and `src/utils/recipe.ts#getRecipeSlug()` derives the URL from that
filename. There is no recipe frontmatter `slug` field.

| Field group | Required input | Optional/defaulted input | Current consumers |
| --- | --- | --- | --- |
| Identity and copy | `title`, `description`, `about` | `titleBn` | Recipe hero, overview, cards, metadata, PDF. |
| Image and publication | `coverImage`, `coverImageAlt`, `publishDate`, `prepTime`, `cookTime`, `servings`, `difficulty`, `draft` default | `updatedDate`, `additionalTime`, `author` default | Hero, facts, recipe JSON-LD, cards. Total time is derived. |
| Taxonomy | `protein[]`, `meal[]`, `cuisine`, `type[]`, `tags[]` | `series` | Category matching and related-recipe ranking. |
| Recipe body | `ingredients[]`, `steps[]` | `ingredientsBn[]`, `stepsBn[]`, `equipment[]`, `tips[]`, `faq[]` | Ingredients, methods, bilingual view, PDF, tips, FAQ schema. |
| Discovery and commerce | — | `video`, `affiliateProducts[]`, `relatedRecipes[]`, `seoTitle`, `seoDescription` | Video, product-card equipment section, page metadata. |

`steps` may include `group`, `title`, `instruction`, `image`, `imageAlt`, and
`tip`; a step image requires an alt value. Ingredients may include `group`,
`quantity`, `unit`, `name`, and `notes`.

Current observations:

- All seven structured recipes use the required core model. Only Kolkata
  Chicken Biryani currently uses authored ingredient and method groups.
- Mango Bhapa Doi intentionally has no Bengali title, ingredients, steps, or
  video. Other structured recipes have Bengali title and body arrays.
- `additionalTime` is present only where needed; `updatedDate` is not currently
  authored in any structured recipe.
- `equipment` is validated but does not currently render as equipment cards;
  the recipe page resolves cards from `affiliateProducts` instead.
- `relatedRecipes` is validated but unused: `getRelatedRecipes()` currently
  ranks by shared protein, cuisine, meal, series, then publish date. It does
  not yet apply editorial overrides or recipe `type` values.
- The `author` field defaults in content, but Recipe JSON-LD currently uses the
  literal `Calcutta Kitchen` rather than the entry value.

### Taxonomy and collections

The current collection supports multiple `protein`, `meal`, and `type` values;
`cuisine` and `series` are single values. It has no `occasion`, cooking-time,
dietary, or direct collection-membership field. A recipe can therefore already
belong to multiple categories through the three array fields.

`src/config/taxonomy.ts` is the validated value registry. It owns `protein`,
`meal`, `cuisine`, `type`, and `series` slugs, labels, intro copy, and related
links. `src/config/categories.ts` is a separate homepage/category-route
registry with ordering, icons, and `featuredOnHomepage` flags.

The current category implementation has two migration concerns:

- `src/pages/categories/[slug].astro` uses flat `/categories/[slug]/` routes,
  whereas the documentation specifies dimension-aware recipe category routes.
- `homepageDiscoveryCategories` currently exports all categories, and the
  homepage maps all of them without checking `featuredOnHomepage`. The registry
  also contains `Meals` with slug `meals`, which is not a valid `meal` taxonomy
  value and cannot match a recipe.

Collections are authored entries with filters in `src/content/collections/`.
The schema supports `protein`, `meal`, `cuisine`, `type`, `tags`, `series`, and
`difficulty`; all populated dimensions must match, while multiple values in one
dimension are alternatives. The only current collection is Weeknight Dinners.
There is an index page but no collection detail route yet.

Recommended scalable model: retain taxonomy attributes as normalized recipe
metadata (`protein`, `meal`, `cuisine`, `type`, `difficulty`, and future dietary
attributes). Derive time buckets from duration rather than storing duplicated
time taxonomy. Keep occasions and editorial themes as curated collection
filters/content, not additional duplicate recipe fields. Collections should
remain authored landing pages with filters, introductory copy, and optional
promotion order.

### About and Kitchen Tools

- **About route and source:** `src/pages/about.astro` renders
  `src/content/pages/about.md` through the legacy `Layout`, `Header`, `Main`,
  and `Footer` components.
- **Historical About content:** Git commit `820b0a9` contains the same one
  paragraph now present. No earlier, richer About source was found in tracked
  source history, archived components, content files, or documentation. The
  sitemap specifies the intended subjects: story, team, FAQ, and contact.
- **Kitchen Tools route and source:** `/kitchen-tools/` is rendered by
  `src/pages/kitchen-tools.astro`, grouped from `src/data/products.ts` and
  displayed with `src/components/ProductCard.astro`.
- **Tool fields:** `id`, `name`, `type`, `category`, `description`,
  `whyWeUseIt`, `affiliateUrl`, `imageUrl`, `displayOrder`, and `featured`.
  Images are remote Amazon URLs; affiliate links open from the product-card
  component. `ProductCardSmall.astro` is reused by recipe equipment cards.
- **Retained legacy content:** the current page, product data, and both product
  card components are the useful legacy source. There is no populated
  `src/content/tools/` collection; it is currently empty.

### Search

- **Inputs:** `src/components/common/SearchInput.astro` is used by the homepage
  hero and mobile navigation. The search route is `src/pages/search.astro`.
- **Index generation:** `npm run build` runs Pagefind after Astro builds `dist`,
  then copies `dist/pagefind` into `public/pagefind`.
- **Rendering:** the search page loads `@pagefind/default-ui` client-side on
  idle. `?q=` is updated with `history.replaceState`, restored on load, and
  cleared when the query is cleared.
- **Indexed content:** Pagefind indexes rendered HTML bodies. It therefore
  includes published recipe pages, legacy posts, category pages, the collection
  index, Kitchen Tools, About, and other built static pages. It has no typed
  recipe/collection/tool records, no deterministic type ranking, and no result
  grouping. Bengali text is indexable only when it is present in rendered HTML;
  current recipe language sections render in the DOM, so it can enter the
  index, but this is not explicitly tested or classified.
- **Limitations:** no category/collection/tool result labels, no recipe-first
  ordering, no custom empty/no-result experience beyond Pagefind defaults, no
  responsive result design owned by Calcutta Kitchen, and the search page is
  not currently marked `noindex` despite the documented SEO requirement.

## Phase 6A — Content and code audit

**Goal:** Establish the current source of truth for homepage curation, recipes,
taxonomy, About, Kitchen Tools, and search.

**Files affected:**

- `docs/recipe-migration-plan.md`
- `docs/content-migration-and-discovery-roadmap.md`

**Dependencies:** None.

**Risk:** Low.

**Acceptance criteria:** Audit findings are documented; no production UI, route,
schema, or recipe changes are made.

## Phase 6B — Recipe inventory and taxonomy finalization

**Goal:** Create the master inventory and resolve taxonomy contracts before
migrating content.

**Likely files affected:**

- A reviewed inventory CSV or spreadsheet outside the published content tree.
- `src/config/taxonomy.ts`
- `src/config/categories.ts`
- `src/content.config.ts` only if an approved taxonomy field is required.
- `docs/content-model.md` and related architecture documents, if contracts change.

**Dependencies:** Phase 6A.

**Risk:** Medium. Taxonomy changes affect categories, collections, related
recipes, validation, and future URLs.

**Acceptance criteria:** Every taxonomy value has one owner; attributes and
curated collections are distinct; all inventory rows have an approved target
slug and duplicate decision.

## Phase 6C — About page restoration

**Goal:** Restore a complete, editorial About page without changing `/about`.

**Likely files affected:**

- `src/content/pages/about.md`
- `src/pages/about.astro` or a reusable static-page layout, if separately approved.

**Dependencies:** Phase 6A; approved brand story and team/contact content.

**Risk:** Low. The route and content collection already exist.

**Acceptance criteria:** The page has reviewed brand content, one H1, complete
metadata, accessible structure, and no route change.

## Phase 6D — Kitchen Tools redesign

**Goal:** Rebuild only the Kitchen Tools presentation with the current design
system while retaining current product data and affiliate behavior.

**Likely files affected:**

- `src/pages/kitchen-tools.astro`
- `src/components/ProductCard.astro`
- `src/components/ProductCardSmall.astro`, if shared improvements are needed.
- `src/data/products.ts`
- Possibly new reusable presentation components under `src/components/`.

**Dependencies:** Phase 6A; retained product inventory; approved affiliate
disclosure treatment.

**Risk:** Medium. Product data uses remote images and outbound affiliate links,
so link safety, image failures, and disclosure content need regression checks.

**Acceptance criteria:** `/kitchen-tools/` remains stable; product order and
links are preserved; the redesigned page uses current tokens and is responsive.

## Phase 6E — Recipe migration

**Goal:** Migrate legacy-only recipes in reviewed batches into the structured
recipes collection while preserving legacy posts and URLs.

**Likely files affected:**

- `src/content/recipes/*.md`
- `src/assets/recipes/*`
- The inventory record outside production content.
- `src/config/homepage.ts` only when an approved curated slot changes.

**Dependencies:** Phases 6A and 6B.

**Risk:** High. This phase affects published content quality, structured data,
translation fidelity, images, and duplicate routes.

**Acceptance criteria:** Each batch passes schema validation and build; every
recipe preserves method and ingredient groupings; `/recipes/[slug]/` works;
legacy `/posts/[slug]/` remains intact; SEO output is checked.

## Phase 6F — Category and collection pages

**Goal:** Align discovery routes and landing pages with the finalized taxonomy
and collection model.

**Likely files affected:**

- `src/pages/categories/[slug].astro`
- New dimension-aware category routes, if approved.
- `src/pages/collections/index.astro`
- New collection detail route(s), if approved.
- `src/config/categories.ts`
- `src/config/taxonomy.ts`
- `src/content/collections/*.md`
- `src/utils/recipe.ts`

**Dependencies:** Phase 6B, with enough migrated recipes from Phase 6E to make
landing pages useful.

**Risk:** High. Current routes use a flat `/categories/[slug]/` model, while the
documented architecture specifies dimension-aware category routes. Resolve the
URL contract before implementation.

**Acceptance criteria:** Category and collection pages have unique metadata,
valid filters, useful empty states, internal links, and no duplicate content or
broken existing links.

## Phase 6G — Search results redesign

**Goal:** Make internal search present and rank recipes, collections, categories,
tools, and selected static pages as distinct result types.

**Likely files affected:**

- `src/pages/search.astro`
- Build/index configuration or a small static search-index utility.
- Search input components only if needed for consistent behavior.
- Metadata rules for the noindex search page.

**Dependencies:** Phases 6B, 6D, 6E, and 6F. Search result types should not be
designed around content that has not yet been finalized.

**Risk:** Medium. Pagefind currently indexes rendered HTML, not typed content
records; grouping and deterministic ranking will require a deliberate design.

**Acceptance criteria:** `?q=` behavior is preserved; empty and no-result states
are useful; recipe results rank first; result types are clear; the page remains
noindex and mobile-friendly.
