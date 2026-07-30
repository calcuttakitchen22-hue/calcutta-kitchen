/* eslint-disable no-console -- This command-line audit reports warnings to its caller. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const structuredRecipesDirectory = path.join(
  projectRoot,
  "src/content/recipes"
);
const legacyPostsDirectory = path.join(projectRoot, "src/content/posts");
const collectionsDirectory = path.join(projectRoot, "src/content/collections");
const inventoryPath = path.join(projectRoot, "data/recipe-inventory.csv");
const homepagePath = path.join(projectRoot, "src/config/homepage.ts");
const taxonomyPath = path.join(projectRoot, "src/config/taxonomy.ts");
const categoriesPath = path.join(projectRoot, "src/config/categories.ts");

const columns = [
  "recipe_id",
  "recipe_name",
  "bengali_name",
  "source_type",
  "source_path",
  "source_url",
  "existing_slug",
  "target_slug",
  "current_route",
  "target_route",
  "structured_recipe_exists",
  "legacy_post_exists",
  "duplicate_group",
  "migration_status",
  "content_status",
  "image_status",
  "english_status",
  "bengali_status",
  "taxonomy_status",
  "seo_status",
  "review_status",
  "publish_status",
  "protein",
  "meal",
  "cuisine",
  "type",
  "series",
  "difficulty",
  "time_bucket",
  "dietary",
  "occasion",
  "collection_candidates",
  "featured_homepage",
  "notes",
];

const manualColumns = new Set([
  "recipe_id",
  "migration_status",
  "content_status",
  "image_status",
  "english_status",
  "bengali_status",
  "taxonomy_status",
  "seo_status",
  "review_status",
  "dietary",
  "occasion",
  "notes",
]);

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function fileSlug(fileName) {
  return path.basename(fileName, path.extname(fileName));
}

function cleanScalar(value = "") {
  return value
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\"/g, '"');
}

function frontmatterBlock(filePath) {
  const match = readFile(filePath).match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`Missing frontmatter: ${filePath}`);
  return match[1];
}

function topLevelBlock(frontmatter, key) {
  const lines = frontmatter.split(/\r?\n/);
  const start = lines.findIndex(line =>
    new RegExp(`^${key}:`).test(line)
  );
  if (start === -1) return "";

  const end = lines.findIndex(
    (line, index) =>
      index > start && /^[A-Za-z][A-Za-z0-9]*:/.test(line)
  );
  const block = lines.slice(start, end === -1 ? undefined : end);
  block[0] = block[0].replace(new RegExp(`^${key}:[ \\t]*`), "");
  return block.join("\n");
}

function topLevelValue(frontmatter, key) {
  return cleanScalar(topLevelBlock(frontmatter, key).split(/\r?\n/)[0]);
}

function topLevelList(frontmatter, key) {
  return topLevelBlock(frontmatter, key)
    .split(/\r?\n/)
    .flatMap(line => {
      const match = line.match(/^\s{2}-\s+(.+)$/);
      return match ? [cleanScalar(match[1])] : [];
    });
}

function readRecipeFile(filePath, source) {
  const frontmatter = frontmatterBlock(filePath);
  const draft = topLevelValue(frontmatter, "draft") === "true";
  const title = topLevelValue(frontmatter, source === "legacy" ? "title" : "title");
  const bengaliTitle = topLevelValue(
    frontmatter,
    source === "legacy" ? "title_bn" : "titleBn"
  );
  const coverImage = topLevelValue(
    frontmatter,
    source === "legacy" ? "featuredImage" : "coverImage"
  );

  return {
    source,
    filePath,
    relativePath: path.relative(projectRoot, filePath).replaceAll("\\", "/"),
    slug: fileSlug(filePath),
    title,
    bengaliTitle,
    draft,
    coverImage,
    protein: source === "structured" ? topLevelList(frontmatter, "protein") : [],
    meal: source === "structured" ? topLevelList(frontmatter, "meal") : [],
    cuisine: source === "structured" ? topLevelValue(frontmatter, "cuisine") : "",
    type: source === "structured" ? topLevelList(frontmatter, "type") : [],
    series: source === "structured" ? topLevelValue(frontmatter, "series") : "",
    difficulty:
      source === "structured" ? topLevelValue(frontmatter, "difficulty") : "",
    prepTime:
      source === "structured" ? Number(topLevelValue(frontmatter, "prepTime")) : NaN,
    cookTime:
      source === "structured" ? Number(topLevelValue(frontmatter, "cookTime")) : NaN,
    additionalTime:
      source === "structured"
        ? Number(topLevelValue(frontmatter, "additionalTime") || 0)
        : NaN,
    hasSeo:
      source === "structured"
        ? Boolean(
            topLevelValue(frontmatter, "seoTitle") &&
              topLevelValue(frontmatter, "seoDescription")
          )
        : Boolean(topLevelValue(frontmatter, "description")),
  };
}

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function listMarkdownFiles(directory) {
  return fs
    .readdirSync(directory)
    .filter(file => file.endsWith(".md"))
    .sort()
    .map(file => path.join(directory, file));
}

function extractQuotedArray(source, key) {
  const match = source.match(
    new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\]`, "m")
  );
  return match ? [...match[1].matchAll(/"([^"]+)"/g)].map(item => item[1]) : [];
}

function readTaxonomy() {
  const source = readFile(taxonomyPath);
  return Object.fromEntries(
    ["protein", "meal", "cuisine", "type", "series"].map(dimension => [
      dimension,
      extractQuotedArray(source, dimension),
    ])
  );
}

function readHomepageFeaturedRecipes() {
  return extractQuotedArray(readFile(homepagePath), "featuredRecipes");
}

function readCategories() {
  const source = readFile(categoriesPath);
  const categoryPattern =
    /\{\s*id:\s*"([^"]+)",\s*dimension:\s*"([^"]+)",\s*slug:\s*"([^"]+)",[\s\S]*?featuredOnHomepage:\s*(true|false)\s*\}/g;

  return [...source.matchAll(categoryPattern)].map(match => ({
    id: match[1],
    dimension: match[2],
    slug: match[3],
    featuredOnHomepage: match[4] === "true",
  }));
}

function readCollections() {
  return listMarkdownFiles(collectionsDirectory).map(filePath => {
    const frontmatter = frontmatterBlock(filePath);
    const filters = {};
    const filtersBlock = topLevelBlock(frontmatter, "filters");
    let dimension = "";

    for (const line of filtersBlock.split(/\r?\n/)) {
      const dimensionMatch = line.match(/^\s{2}([A-Za-z][A-Za-z0-9]*):\s*$/);
      if (dimensionMatch) {
        dimension = dimensionMatch[1];
        filters[dimension] = [];
        continue;
      }
      const valueMatch = line.match(/^\s{4}-\s+(.+)$/);
      if (dimension && valueMatch) {
        filters[dimension].push(cleanScalar(valueMatch[1]));
      }
    }

    return {
      slug: topLevelValue(frontmatter, "slug"),
      recipeOrder: topLevelList(frontmatter, "recipeOrder"),
      filters,
    };
  });
}

function matchesCollection(recipe, collection) {
  if (collection.recipeOrder.includes(recipe.slug)) return true;

  return Object.entries(collection.filters).every(([dimension, values]) => {
    if (!values.length) return true;
    const recipeValues = Array.isArray(recipe[dimension])
      ? recipe[dimension]
      : [recipe[dimension]].filter(Boolean);
    return values.some(value => recipeValues.includes(value));
  });
}

function timeBucket(recipe) {
  if (!Number.isFinite(recipe.prepTime) || !Number.isFinite(recipe.cookTime)) {
    return "unknown";
  }

  const total = recipe.prepTime + recipe.cookTime + (recipe.additionalTime || 0);
  if (total <= 15) return "under-15-minutes";
  if (total <= 30) return "under-30-minutes";
  if (total <= 60) return "under-60-minutes";
  return "over-60-minutes";
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '"') {
      if (quoted && source[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && source[index + 1] === "\n") index += 1;
      row.push(value);
      if (row.some(cell => cell.length > 0)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    rows.push(row);
  }

  const [headers = [], ...records] = rows;
  return records.map(record =>
    Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ""]))
  );
}

function existingInventory() {
  if (!fs.existsSync(inventoryPath)) return new Map();
  return new Map(
    parseCsv(readFile(inventoryPath)).map(row => [row.target_slug || row.existing_slug, row])
  );
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(rows) {
  const contents = [
    columns.join(","),
    ...rows.map(row => columns.map(column => csvCell(row[column])).join(",")),
  ].join("\n");
  fs.mkdirSync(path.dirname(inventoryPath), { recursive: true });
  fs.writeFileSync(inventoryPath, `${contents}\n`);
}

function warn(message) {
  console.warn(`[recipe-inventory] ${message}`);
}

const structuredRecipes = listMarkdownFiles(structuredRecipesDirectory).map(file =>
  readRecipeFile(file, "structured")
);
const legacyPosts = listMarkdownFiles(legacyPostsDirectory).map(file =>
  readRecipeFile(file, "legacy")
);
const taxonomy = readTaxonomy();
const homepageFeaturedRecipes = readHomepageFeaturedRecipes();
const categories = readCategories();
const collections = readCollections();
const existingRows = existingInventory();

const structuredBySlug = new Map(structuredRecipes.map(recipe => [recipe.slug, recipe]));
const structuredByTitle = new Map(
  structuredRecipes.map(recipe => [normalizeTitle(recipe.title), recipe])
);
const inventoryEntries = structuredRecipes.map(recipe => ({ structured: recipe }));

for (const legacy of legacyPosts) {
  const structured =
    structuredBySlug.get(legacy.slug) ??
    structuredByTitle.get(normalizeTitle(legacy.title));
  const existing = structured
    ? inventoryEntries.find(entry => entry.structured === structured)
    : undefined;
  if (existing) {
    existing.legacy = legacy;
  } else {
    inventoryEntries.push({ legacy });
  }
}

inventoryEntries.sort((left, right) => {
  const leftSlug = left.structured?.slug ?? left.legacy?.slug ?? "";
  const rightSlug = right.structured?.slug ?? right.legacy?.slug ?? "";
  return leftSlug.localeCompare(rightSlug);
});

const rows = inventoryEntries.map(entry => {
  const structured = entry.structured;
  const legacy = entry.legacy;
  const targetSlug = structured?.slug ?? legacy?.slug ?? "";
  const existingRow = existingRows.get(targetSlug);
  const collectionCandidates = structured
    ? collections
        .filter(collection => matchesCollection(structured, collection))
        .map(collection => collection.slug)
    : [];
  const defaults = {
    recipe_id: `ck-${targetSlug}`,
    recipe_name: structured?.title ?? legacy?.title ?? "",
    bengali_name: structured?.bengaliTitle ?? legacy?.bengaliTitle ?? "",
    source_type: [
      structured && "structured-recipe",
      legacy && "legacy-post",
    ]
      .filter(Boolean)
      .join("|"),
    source_path: [structured?.relativePath, legacy?.relativePath]
      .filter(Boolean)
      .join("|"),
    source_url: "",
    existing_slug: legacy?.slug ?? "",
    target_slug: targetSlug,
    current_route: [
      structured && `/recipes/${structured.slug}/`,
      legacy && `/posts/${legacy.slug}/`,
    ]
      .filter(Boolean)
      .join("|"),
    target_route: `/recipes/${targetSlug}/`,
    structured_recipe_exists: structured ? "yes" : "no",
    legacy_post_exists: legacy ? "yes" : "no",
    duplicate_group: structured && legacy ? `legacy-structured:${targetSlug}` : "",
    migration_status: structured ? "migrated" : "ready-to-migrate",
    content_status: structured ? "complete" : "needs-review",
    image_status: structured?.coverImage || legacy?.coverImage ? "yes" : "no",
    english_status: structured || legacy ? "complete" : "unknown",
    bengali_status:
      structured?.bengaliTitle || legacy?.bengaliTitle ? "complete" : "missing",
    taxonomy_status: structured ? "complete" : "unknown",
    seo_status: structured?.hasSeo ? "complete" : legacy?.hasSeo ? "partial" : "unknown",
    review_status: "unknown",
    publish_status: structured && legacy ? "both" : structured ? "structured" : "legacy-only",
    protein: structured?.protein.join("|") ?? "",
    meal: structured?.meal.join("|") ?? "",
    cuisine: structured?.cuisine ?? "",
    type: structured?.type.join("|") ?? "",
    series: structured?.series ?? "",
    difficulty: structured?.difficulty ?? "unknown",
    time_bucket: structured ? timeBucket(structured) : "unknown",
    dietary: "unknown",
    occasion: "unknown",
    collection_candidates: collectionCandidates.join("|"),
    featured_homepage: homepageFeaturedRecipes.includes(targetSlug) ? "yes" : "no",
    notes: "",
  };

  if (!existingRow) return defaults;

  const preserved = Object.fromEntries(
    [...manualColumns]
      .filter(column => existingRow[column])
      .map(column => [column, existingRow[column]])
  );
  return {
    ...defaults,
    ...preserved,
  };
});

for (const recipe of structuredRecipes) {
  for (const dimension of ["protein", "meal", "type"]) {
    for (const value of recipe[dimension]) {
      if (!taxonomy[dimension].includes(value)) {
        warn(`${recipe.relativePath}: invalid ${dimension} value \"${value}\".`);
      }
      if (value.includes(" ") || value !== value.toLowerCase()) {
        warn(`${recipe.relativePath}: non-canonical ${dimension} value \"${value}\".`);
      }
    }
  }

  for (const dimension of ["cuisine", "series"]) {
    if (recipe[dimension] && !taxonomy[dimension].includes(recipe[dimension])) {
      warn(`${recipe.relativePath}: invalid ${dimension} value \"${recipe[dimension]}\".`);
    }
    if (
      recipe[dimension] &&
      (recipe[dimension].includes(" ") ||
        recipe[dimension] !== recipe[dimension].toLowerCase())
    ) {
      warn(
        `${recipe.relativePath}: non-canonical ${dimension} value \"${recipe[dimension]}\".`
      );
    }
  }

  if (!recipe.protein.length || !recipe.meal.length || !recipe.type.length) {
    warn(`${recipe.relativePath}: one or more taxonomy arrays are empty.`);
  }
  if (!recipe.bengaliTitle) {
    warn(`${recipe.relativePath}: missing Bengali title.`);
  }
  if (!recipe.coverImage) {
    warn(`${recipe.relativePath}: missing cover image.`);
  } else if (!fs.existsSync(path.resolve(path.dirname(recipe.filePath), recipe.coverImage))) {
    warn(`${recipe.relativePath}: cover image does not resolve: ${recipe.coverImage}.`);
  }
}

for (const post of legacyPosts) {
  const hasStructuredMatch =
    structuredBySlug.has(post.slug) ||
    structuredByTitle.has(normalizeTitle(post.title));
  if (!hasStructuredMatch) {
    warn(`${post.relativePath}: legacy post has no structured recipe.`);
  }
  if (!post.bengaliTitle) {
    warn(`${post.relativePath}: missing Bengali title.`);
  }
  if (!post.coverImage) {
    warn(`${post.relativePath}: missing featured image.`);
  }
}

for (const slug of homepageFeaturedRecipes) {
  if (!structuredBySlug.has(slug)) {
    warn(`homepage featured recipe \"${slug}\" does not exist in src/content/recipes.`);
  }
}

for (const [dimension, values] of Object.entries(taxonomy)) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) {
    warn(`taxonomy ${dimension} has duplicate values: ${[...new Set(duplicates)].join(", ")}.`);
  }
}

for (const property of ["id", "slug"]) {
  const values = categories.map(category => category[property]);
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) {
    warn(`category ${property}s are duplicated: ${[...new Set(duplicates)].join(", ")}.`);
  }
}

for (const category of categories.filter(category => category.featuredOnHomepage)) {
  const values = taxonomy[category.dimension] ?? [];
  if (!values.includes(category.slug)) {
    warn(`homepage category \"${category.id}\" has unknown ${category.dimension} slug \"${category.slug}\".`);
    continue;
  }
  const hasMatch = structuredRecipes.some(recipe => {
    const value = recipe[category.dimension];
    return Array.isArray(value) ? value.includes(category.slug) : value === category.slug;
  });
  if (!hasMatch) {
    warn(`featured homepage category \"${category.id}\" has no matching structured recipe.`);
  }
}

for (const collection of collections) {
  const duplicateReferences = collection.recipeOrder.filter(
    (slug, index) => collection.recipeOrder.indexOf(slug) !== index
  );
  if (duplicateReferences.length) {
    warn(
      `collection \"${collection.slug}\" has duplicate recipe references: ${[
        ...new Set(duplicateReferences),
      ].join(", ")}.`
    );
  }
  for (const slug of collection.recipeOrder) {
    if (!structuredBySlug.has(slug)) {
      warn(`collection \"${collection.slug}\" references missing recipe \"${slug}\".`);
    }
  }
  for (const [dimension, values] of Object.entries(collection.filters)) {
    if (!(dimension in taxonomy)) continue;
    for (const value of values) {
      if (!taxonomy[dimension].includes(value)) {
        warn(
          `collection \"${collection.slug}\" has invalid ${dimension} filter \"${value}\".`
        );
      }
    }
  }
}

const sourceSlugCounts = new Map();
for (const recipe of [...structuredRecipes, ...legacyPosts]) {
  sourceSlugCounts.set(recipe.slug, (sourceSlugCounts.get(recipe.slug) ?? 0) + 1);
}
for (const [slug, count] of sourceSlugCounts) {
  if (count > 1) warn(`duplicate source slug \"${slug}\" appears ${count} times.`);
}

const titleCounts = new Map();
for (const recipe of [...structuredRecipes, ...legacyPosts]) {
  const key = normalizeTitle(recipe.title);
  titleCounts.set(key, (titleCounts.get(key) ?? 0) + 1);
}
for (const [title, count] of titleCounts) {
  if (count > 1) warn(`duplicate recipe title \"${title}\" appears ${count} times.`);
}

writeCsv(rows);
console.log(
  `[recipe-inventory] wrote ${rows.length} recipe rows (${structuredRecipes.length} structured, ${legacyPosts.length} legacy).`
);
