# Recipe Duplicate Report

## Method

Probable duplicates are identified by matching filename slug and normalized English title across `src/content/posts/` and `src/content/recipes/`. All twelve matches below are high confidence: their legacy and structured entries share the same source identity.

Do not delete either source. Legacy posts remain live while migration and URL consolidation are deferred.

| Recipe | Sources | Existing routes | Recommended canonical recipe | Recommended action | Redirect requirement | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| Aloo Posto | `posts/aloo-posto.md`; `recipes/aloo-posto.md` | `/posts/aloo-posto/`; `/recipes/aloo-posto/` | `/recipes/aloo-posto/` | Maintain structured entry; preserve legacy source. | None now; future 301 needs separate approval. | High |
| Chicken Kosha | `posts/chicken-kosha.md`; `recipes/chicken-kosha.md` | `/posts/chicken-kosha/`; `/recipes/chicken-kosha/` | `/recipes/chicken-kosha/` | Maintain structured entry; preserve legacy source. | None now; future 301 needs separate approval. | High |
| Kolkata Street Style Ghugni | `posts/ghugni.md`; `recipes/ghugni.md` | `/posts/ghugni/`; `/recipes/ghugni/` | `/recipes/ghugni/` | Maintain structured entry; preserve legacy source. | None now; future 301 needs separate approval. | High |
| Kolkata Chicken Biryani | `posts/kolkata-chicken-biryani.md`; `recipes/kolkata-chicken-biryani.md` | `/posts/kolkata-chicken-biryani/`; `/recipes/kolkata-chicken-biryani/` | `/recipes/kolkata-chicken-biryani/` | Preserve grouped ingredients/methods; preserve legacy source. | None now; future 301 needs separate approval. | High |
| Patla Maacher Jhol | `posts/maacher-jhol.md`; `recipes/maacher-jhol.md` | `/posts/maacher-jhol/`; `/recipes/maacher-jhol/` | `/recipes/maacher-jhol/` | Maintain structured entry; preserve legacy source. | None now; future 301 needs separate approval. | High |
| Mango Bhapa Doi | `posts/mango-bhapa-doi.md`; `recipes/mango-bhapa-doi.md` | `/posts/mango-bhapa-doi/`; `/recipes/mango-bhapa-doi/` | `/recipes/mango-bhapa-doi/` | Retain structured entry; review missing Bengali content and legacy image. | None now; future 301 needs separate approval. | High |
| Sorshe Ilish | `posts/sorshe-ilish.md`; `recipes/sorshe-ilish.md` | `/posts/sorshe-ilish/`; `/recipes/sorshe-ilish/` | `/recipes/sorshe-ilish/` | Maintain structured entry; preserve legacy source. | None now; future 301 needs separate approval. | High |
| Bengali Basanti Pulao | `posts/basanti-pulao.md`; `recipes/basanti-pulao.md` | `/posts/basanti-pulao/`; `/recipes/basanti-pulao/` | `/recipes/basanti-pulao/` | Migrated in Phase 6C; preserve both source files. | None now; future 301 and canonicalization need separate approval. | High |
| Ilish Bhapa | `posts/ilish-bhapa.md`; `recipes/ilish-bhapa.md` | `/posts/ilish-bhapa/`; `/recipes/ilish-bhapa/` | `/recipes/ilish-bhapa/` | Migrated in Phase 6C; preserve both source files. | None now; future 301 and canonicalization need separate approval. | High |
| Maach Bhaja | `posts/maach-bhaja.md`; `recipes/maach-bhaja.md` | `/posts/maach-bhaja/`; `/recipes/maach-bhaja/` | `/recipes/maach-bhaja/` | Migrated in Phase 6C; preserve both source files. | None now; future 301 and canonicalization need separate approval. | High |
| Kolkata Chicken Roll | `posts/kolkata-chicken-roll.md`; `recipes/kolkata-chicken-roll.md` | `/posts/kolkata-chicken-roll/`; `/recipes/kolkata-chicken-roll/` | `/recipes/kolkata-chicken-roll/` | Migrated in Phase 6C; preserve both source files. | None now; future 301 and canonicalization need separate approval. | High |
| Kolkata Egg Roll | `posts/kolkata-egg-roll.md`; `recipes/kolkata-egg-roll.md` | `/posts/kolkata-egg-roll/`; `/recipes/kolkata-egg-roll/` | `/recipes/kolkata-egg-roll/` | Migrated in Phase 6C; preserve both source files. | None now; future 301 and canonicalization need separate approval. | High |

## Follow-up

All legacy recipes now have structured counterparts. The legacy source files and `/posts/.../` routes remain live. Redirects, canonical consolidation, and legacy cleanup are deferred to the dedicated URL migration phase.
