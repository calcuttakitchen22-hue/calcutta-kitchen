# Recipe Duplicate Report

## Method

Probable duplicates are identified by matching filename slug and normalized English title across `src/content/posts/` and `src/content/recipes/`. All seven matches below are high confidence: their legacy and structured entries share the same source identity.

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

## Unmigrated recipes

These legacy posts have no structured counterpart and are migration candidates, not duplicates:

- Bengali Basanti Pulao
- Ilish Bhapa
- Kolkata Chicken Roll
- Kolkata Egg Roll
- Maach Bhaja

