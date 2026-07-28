import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, extname, join, relative } from "node:path";

const CONTENT_ROOT = join(process.cwd(), "src", "content");
const COLLECTIONS = ["recipes", "collections", "tools", "series", "pages"];

function getMarkdownFiles(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) return getMarkdownFiles(entryPath);
    return [".md", ".mdx"].includes(extname(entry.name)) ? [entryPath] : [];
  });
}

function getFrontmatterTitle(filePath) {
  const contents = readFileSync(filePath, "utf8");
  const frontmatter = contents.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const title = frontmatter?.[1].match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];

  if (!title) {
    throw new Error(`Missing frontmatter title in ${relative(CONTENT_ROOT, filePath)}.`);
  }

  return title.trim().toLowerCase();
}

function assertUnique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);

  if (duplicates.length > 0) {
    throw new Error(`Duplicate ${label}: ${[...new Set(duplicates)].join(", ")}.`);
  }
}

for (const collection of COLLECTIONS) {
  const directory = join(CONTENT_ROOT, collection);
  const files = getMarkdownFiles(directory);
  const titles = files.map(getFrontmatterTitle);

  assertUnique(titles, `${collection} titles`);

  if (collection === "recipes") {
    const relativePaths = files.map(filePath => relative(directory, filePath));
    const filenames = files.map(filePath => basename(filePath, extname(filePath)));

    if (relativePaths.some(filePath => filePath.includes("/") || filePath.includes("\\"))) {
      throw new Error("Recipe files must remain flat so their filenames are canonical identifiers.");
    }

    assertUnique(filenames, "recipe filenames");
  }
}
