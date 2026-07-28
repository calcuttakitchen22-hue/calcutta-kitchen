# Migration Baseline — Phase 0

**Recorded:** 2026-07-28  
**Scope:** Inventory and migration safeguards only. This document does not change application behaviour, routes, content, schemas, or dependencies.

## Current application baseline

- Framework: Astro 6 with TypeScript and Tailwind CSS.
- Current content collection: `posts` loaded from `src/content/posts`.
- Current recipe-like entries: 12 Markdown files in `src/content/posts`.
- Current recipe assets: 11 files in `src/assets/recipes`.
- Current public recipe route: `/posts/[...slug]`.
- Current discovery routes: `/`, `/posts`, `/tags`, `/archives`, and `/search`.
- Current static routes: `/about`, `/kitchen-tools`, and `/work-with-us`.

## Existing route inventory

| Current route | Current responsibility | Migration handling |
| --- | --- | --- |
| `/` | Blog-derived homepage with featured and recent posts | Preserve until the new discovery homepage is ready. |
| `/posts/[...slug]` | Individual recipe-like post | Keep reachable until canonical recipe routes and permanent redirects are verified. |
| `/posts/[...page]` | Paginated post list | Preserve during transition; retire only after replacement recipe browsing is available. |
| `/tags` and `/tags/[tag]/[...page]` | Tag browsing | Do not redirect until the taxonomy/category replacement is defined and verified. |
| `/archives` | Date-based archive | Preserve until a deliberate deprecation decision is approved. |
| `/search` | Pagefind search | Preserve while its recipe/category/collection indexing replacement is built. |
| `/kitchen-tools` | Hardcoded product directory | Preserve until the Tool collection and replacement routes are ready. |
| `/about` and `/work-with-us` | Static brand pages | Preserve; later work may migrate their templates without changing their URLs. |

## Migration safeguards

1. Do not delete or rename current content, assets, routes, or configuration in an earlier phase.
2. Introduce replacement routes alongside existing routes first.
3. Add permanent redirects only after canonical URLs, generated pages, sitemap entries, and internal links are verified.
4. Keep the existing Astro content collection readable until migrated recipe content passes schema validation.
5. Preserve current canonical, Open Graph, robots, sitemap, and search behaviour until replacements have equivalent coverage.
6. Treat `/posts/*`, `/tags/*`, `/archives/*`, and `/kitchen-tools` as legacy paths requiring an explicit transition decision; Phase 0 makes no routing changes.
7. Re-run build, TypeScript checks, linting, and route verification after every later phase.

## Verification record

- `npm.cmd run astro -- check` completed with 0 errors. It reported 12 existing hints, primarily unused imports/variables and one deprecated `frameborder` attribute.
- `npm.cmd run build` completed successfully after the build script was made cross-platform. Astro generated 56 static pages, and Pagefind indexed them.

## Baseline limitations already known

- The build reports a missing runtime asset reference for `/media-kit/watermark.png`.
- The current implementation remains AstroPaper/blog-oriented; this baseline intentionally does not correct that alignment gap.
