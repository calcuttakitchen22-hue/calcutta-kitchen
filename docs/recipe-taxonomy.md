# Recipe Taxonomy Contract

## Purpose

Taxonomy describes what a recipe is. Curated collections describe why recipes are presented together. Taxonomy is normalized metadata for filtering, categories, breadcrumbs, and recommendations; collections are authored editorial objects such as Sunday Specials, Durga Puja Recipes, Beginner Friendly, Bengali Comfort Food, and Under 30 Minutes.

Do not use collection names as recipe taxonomy values. Recipes may appear in many collections without duplicating recipe content.

## Cardinality

| Field | Cardinality | Contract |
| --- | --- | --- |
| `protein` | Array | A recipe may have more than one primary protein. `vegetarian` remains the current convention for recipes without animal protein. |
| `meal` | Array | A recipe may suit lunch and dinner, or breakfast and snack. |
| `cuisine` | Single | Choose the primary culinary tradition. |
| `type` | Array | Describes dish form, such as curry, rice, or sauce. |
| `difficulty` | Single | One primary skill/complexity assessment. |
| `timeBucket` | Single, derived | Calculate from total time including additional/resting time; do not duplicate in frontmatter. |
| `dietary` | Array, future/manual | Apply only after a full ingredient review. |
| `occasion` | Array, future/manual | Reserve for broad event contexts only. |
| `series` | Single | One series per recipe in Version 1. |
| Collection membership | Reverse references | Collections own explicit ordered membership; recipes do not keep a second collection array. |

## Active canonical values

The current schema implements protein, meal, cuisine, type, difficulty, and series. Bengali labels are shown as `—` where no reviewed label is authored in the repository. Values with no current example remain allowed but should not be assigned without editorial review.

### Protein

| Order | Slug | Label | Bengali | Definition | Current example | Homepage |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `chicken` | Chicken | — | Chicken is the primary protein. | Chicken Kosha; Kolkata Chicken Biryani | Yes |
| 2 | `fish` | Fish | — | Fin fish is the primary protein. | Sorshe Ilish; Patla Maacher Jhol | Yes |
| 3 | `mutton` | Mutton | — | Goat or mutton is the primary protein. | — | No |
| 4 | `egg` | Egg | — | Egg is central to the dish. | — | No |
| 5 | `vegetarian` | Vegetarian | — | No animal protein in the current primary-protein model. | Aloo Posto; Ghugni | Yes |
| 6 | `seafood` | Seafood | — | Seafood other than a recipe classified primarily as fish. | — | No |

`prawn` is not an active value because no reviewed structured prawn recipe is present. Add it only with the first approved prawn migration.

### Meal

| Order | Slug | Label | Bengali | Definition | Current example | Homepage |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `breakfast` | Breakfast | — | Primarily a breakfast dish. | — | No |
| 2 | `lunch` | Lunch | — | Suitable for a midday meal. | Chicken Kosha; Maacher Jhol | No |
| 3 | `dinner` | Dinner | — | Suitable for an evening meal. | Chicken Kosha; Sorshe Ilish | No |
| 4 | `snack` | Snacks | — | Snack, tea-time dish, or street-food serving. | Ghugni | No |
| 5 | `dessert` | Desserts | — | Sweet-course serving. | Mango Bhapa Doi | No |
| 6 | `beverage` | Beverages | — | Drink or beverage. | — | No |

The slug is `snack`, not `snacks`. `meals` is not a recipe value; it was an invalid aggregate category.

### Cuisine

| Order | Slug | Label | Bengali | Definition | Current example | Homepage |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `bengali` | Bengali | — | Bengali culinary tradition. | All current structured recipes | No |
| 2 | `indian` | Indian | — | Indian recipe not better classified as Bengali. | — | No |
| 3 | `italian` | Italian | — | Italian culinary tradition. | — | No |
| 4 | `chinese` | Chinese | — | Chinese or Indo-Chinese cooking. | — | No |
| 5 | `asian` | Asian | — | Asian cooking not more specifically classified above. | — | No |
| 6 | `continental` | Continental | — | Western/continental home cooking. | — | No |
| 7 | `fusion` | Fusion | — | Deliberate combination of traditions. | — | No |

`kolkata` is not a cuisine. Use `bengali` for culinary tradition; retain Kolkata-specific context in the title, description, tags, or a collection.

### Type

| Order | Slug | Label | Bengali | Definition | Current example | Homepage |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `curry` | Curry | — | Sauced, gravy, or masala-based dish. | Chicken Kosha; Sorshe Ilish | No |
| 2 | `rice` | Rice | — | Rice-led dish. | Kolkata Chicken Biryani | Yes |
| 3 | `bread` | Bread | — | Bread or flatbread-led dish. | — | No |
| 4 | `baking` | Baking | — | Primarily oven-baked dish. | — | No |
| 5 | `sauce` | Sauces & Dips | — | Sauce, dip, accompaniment, or condiment. | — | No |
| 6 | `sweet` | Sweets | — | Sweet dish form. | Mango Bhapa Doi | No |

Snack, dessert, and beverage are meal contexts, not duplicate types. Fried, steamed, and grilled remain migration-review candidates, not active values.

### Difficulty and derived time bucket

| Dimension | Order | Slug | Label | Bengali | Definition | Current example | Homepage |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| Difficulty | 1 | `easy` | Easy | — | Basic technique and coordination. | Aloo Posto; Mango Bhapa Doi | No |
| Difficulty | 2 | `medium` | Medium | — | Several steps or timing-sensitive technique. | Chicken Kosha; Sorshe Ilish | No |
| Difficulty | 3 | `hard` | Advanced | — | Multi-component or technically demanding recipe. | Kolkata Chicken Biryani | No |
| Time | 1 | `under-15-minutes` | Under 15 minutes | — | Total time ≤15 minutes. | — | No |
| Time | 2 | `under-30-minutes` | Under 30 minutes | — | Total time 16–30 minutes. | Aloo Posto | No |
| Time | 3 | `under-60-minutes` | Under 60 minutes | — | Total time 31–60 minutes. | Maacher Jhol; Sorshe Ilish | No |
| Time | 4 | `over-60-minutes` | Over 60 minutes | — | Total time >60 minutes. | Chicken Kosha; Kolkata Chicken Biryani | No |

The stored difficulty slug remains `hard` for compatibility. Do not introduce a duplicate `advanced` slug.

### Future dietary, occasion, and series vocabulary

| Dimension | Order | Slug | Label | Bengali | Definition | Current example | Homepage |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| Dietary | 1 | `vegetarian` | Vegetarian | — | Manual ingredient review required. | — | No |
| Dietary | 2 | `vegan` | Vegan | — | Manual ingredient review required. | — | No |
| Dietary | 3 | `eggless` | Eggless | — | Manual ingredient review required. | — | No |
| Dietary | 4 | `gluten-free` | Gluten-free | — | Manual ingredient and cross-contact review required. | — | No |
| Dietary | 5 | `dairy-free` | Dairy-free | — | Manual ingredient review required. | — | No |
| Occasion | 1 | `festive` | Festive | — | Broad celebration context. | — | No |
| Occasion | 2 | `party` | Party | — | Hosted-gathering context. | — | No |
| Series | 1 | `cook-like-a-lyadhkhor` | Cook Like a Lyadhkhor | — | Signature Calcutta Kitchen series. | — | No |

Do not infer a dietary claim from `protein: vegetarian`; dairy or egg may still be present. Weekday, weekend, Sunday special, Durga Puja, and tiffin should be collections, not occasion attributes, to avoid overlapping systems.

## Category route contract

The future canonical route is dimension-aware:

```text
/categories/[dimension]/[slug]/
```

Examples: `/categories/protein/chicken/`, `/categories/meal/dinner/`, and `/categories/type/rice/`. This avoids route collisions and makes the filter clear to users and search engines.

Current flat routes remain valid until Phase 6F. Then use 301 aliases:

| Flat route | Canonical route |
| --- | --- |
| `/categories/chicken/` | `/categories/protein/chicken/` |
| `/categories/fish/` | `/categories/protein/fish/` |
| `/categories/mutton/` | `/categories/protein/mutton/` |
| `/categories/vegetarian/` | `/categories/protein/vegetarian/` |
| `/categories/rice/` | `/categories/type/rice/` |
| `/categories/dinner/` | `/categories/meal/dinner/` |
| `/categories/snack/` | `/categories/meal/snack/` |
| `/categories/dessert/` | `/categories/meal/dessert/` |
| `/categories/beverage/` | `/categories/meal/beverage/` |
| `/categories/baking/` | `/categories/type/baking/` |
| `/categories/sauce/` | `/categories/type/sauce/` |
| `/categories/italian/` | `/categories/cuisine/italian/` |
| `/categories/continental/` | `/categories/cuisine/continental/` |
| `/categories/chinese/` | `/categories/cuisine/chinese/` |
| `/categories/asian/` | `/categories/cuisine/asian/` |
| `/categories/fusion/` | `/categories/cuisine/fusion/` |
| `/categories/cook-like-a-lyadhkhor/` | `/categories/series/cook-like-a-lyadhkhor/` |

The obsolete `/categories/meals/` route has no one-to-one taxonomy destination; it is retained as a minimal 301 Astro compatibility redirect to `/recipes/`.

## Collection membership contract

**Decision: Option A.** Collections explicitly own a unique ordered `recipeSlugs` list. That order is display order. A recipe can be in multiple collections, but legacy posts cannot be members of a final collection; they must first become structured recipes.

Validation must reject duplicate and missing references. The current `filters`/`recipeOrder` model stays unchanged during Phase 6B. In a later schema migration, filters may remain candidate-generation hints, but rendered membership must come only from `recipeSlugs`.

## Proposed schema changes

Do not apply these during Phase 6B:

1. Add optional manual `dietary` and `occasion` arrays.
2. Keep `timeBucket` derived, not stored.
3. Add required, unique, ordered `recipeSlugs` to collection entries.
4. Update related-recipe ranking to honour editorial overrides and shared type.
