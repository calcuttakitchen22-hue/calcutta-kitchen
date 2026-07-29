# Recipe Migration Validation

Canonical entries were compared with their same-slug legacy Markdown sources in `src/content/posts/`. Counts below are item-level comparisons; literal ingredient text retains authored quantities and order.

## Chicken Kosha

| Field | Legacy | Canonical | Status | Action |
|---|---:|---:|---|---|
| Title, description, times, servings, taxonomy, tags, video | Present | Present | Exact | None |
| Bengali title | 1 | 1 | Restored | `titleBn` |
| About | 1 paragraph | 1 paragraph | Restored | `about` |
| Ingredients | 21 | 21 | Restored | Ordered literal entries retain quantities |
| Steps | 16 | 16 | Restored | One source item per canonical step |
| Tips / FAQs | 5 / 4 | 5 / 4 | Restored | Preserved order |
| Bengali ingredients / steps | 21 / 16 | 21 / 16 | Restored | Authored arrays |
| Affiliate products | 3 | 3 | Exact | Valid product IDs |

## Sorshe Ilish

| Field | Legacy | Canonical | Status | Action |
|---|---:|---:|---|---|
| Title, description, times, servings, taxonomy, tags, video | Present | Present | Exact | None |
| Bengali title / About | 1 / 1 | 1 / 1 | Restored | Authored content |
| Ingredients / steps | 18 / 15 | 18 / 15 | Restored | Order preserved |
| Tips / FAQs | 6 / 5 | 6 / 5 | Restored | Order preserved |
| Bengali ingredients / steps | 23 / 15 | 23 / 15 | Restored | Ingredient headings retained in authored array |
| Affiliate products | 3 | 3 | Exact | Valid product IDs |

## Aloo Posto

| Field | Legacy | Canonical | Status | Action |
|---|---:|---:|---|---|
| Title, description, times, servings, taxonomy, tags, video | Present | Present | Exact | None |
| Bengali title / About | 1 / 1 | 1 / 1 | Restored | Authored content |
| Ingredients / steps | 8 / 11 | 8 / 11 | Restored | Order preserved |
| Tips / FAQs | 4 / 3 | 4 / 3 | Restored | Order preserved |
| Bengali ingredients / steps | Available / available | Available / available | Restored | Authored arrays |
| Affiliate products | 3 | 3 | Exact | Valid product IDs |

## Mango Bhapa Doi

| Field | Legacy | Canonical | Status | Action |
|---|---:|---:|---|---|
| Title, description, times, servings, taxonomy, tags, video | Available where authored | Present | Exact | None |
| Bengali title / ingredients / steps | Missing | Missing | Missing from source | English remains visible |
| About | Missing | Description fallback | Intentionally changed | Requires authored long-form source for restoration |
| Ingredients / steps | 6 / source method is unstructured | 6 / 5 | Requires manual review | Canonical preserves available authored recipe data |
| Tips / FAQs | Missing | 2 / 2 | Requires manual review | Not present in legacy source |
| Affiliate products | Missing | 0 | Missing from source | Equipment hidden |

## Maacher Jhol

| Field | Legacy | Canonical | Status | Action |
|---|---:|---:|---|---|
| Title, description, times, servings, taxonomy, tags, video | Present | Present | Exact | None |
| Bengali title / About | 1 / 1 | 1 / 1 | Restored | Authored content |
| Ingredients / steps | 11 / 14 | 11 / 14 | Restored | Order preserved |
| Tips / FAQs | 6 / 4 | 6 / 4 | Restored | Order preserved |
| Bengali ingredients / steps | Available / available | Available / available | Restored | Authored arrays |
| Affiliate products | 1 | 1 | Exact | Valid product ID |

## Ghugni

| Field | Legacy | Canonical | Status | Action |
|---|---:|---:|---|---|
| Title, description, times, servings, taxonomy, tags, video | Present | Present | Exact | None |
| Bengali title / About | 1 / 1 | 1 / 1 | Restored | Authored content |
| Ingredients / steps | 22 / 17 | 22 / 17 | Restored | Order preserved |
| Tips / FAQs | 4 / 4 | 4 / 4 | Restored | Order preserved |
| Bengali ingredients / steps | 27 / 17 | 27 / 17 | Restored | Ingredient headings retained in authored array |
| Affiliate products | 3 | 3 | Exact | Valid product IDs |
