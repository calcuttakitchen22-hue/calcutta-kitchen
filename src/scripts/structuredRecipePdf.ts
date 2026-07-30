import pdfMake from "pdfmake/build/pdfmake";
/* eslint-disable no-console */
import bengaliFontUrl from "@/assets/fonts/NotoSerifBengali-VariableFont_wdth,wght.ttf?url";
import futuraFontUrl from "@/assets/fonts/FUTURASTD-BOOK.OTF?url";
import boraxFontUrl from "@/assets/fonts/Borax-VF-Regular.ttf?url";
import logoUrl from "@/assets/images/calcutta-kitchen-logo.svg?url";
import watermarkUrl from "@/assets/images/pdf-watermark.png?url";

const MAROON = "#700D1D";
const ORANGE = "#F24E07";
const BODY = "#2B1818";

const PDF_FRACTION_FALLBACKS: Record<string, string> = {
  "¼": "1/4",
  "½": "1/2",
  "¾": "3/4",
  "⅓": "1/3",
  "⅔": "2/3",
  "⅛": "1/8",
  "⅜": "3/8",
  "⅝": "5/8",
  "⅞": "7/8",
};

function normalizePdfText(value: string): string {
  const mixed = value.replace(
    /(\d)\s*([¼½¾⅓⅔⅛⅜⅝⅞])/g,
    (_, whole: string, fraction: string) =>
      `${whole} ${PDF_FRACTION_FALLBACKS[fraction]}`
  );
  return mixed.replace(
    /[¼½¾⅓⅔⅛⅜⅝⅞]/g,
    fraction => PDF_FRACTION_FALLBACKS[fraction]
  );
}

function assertFractionFallbacks() {
  const cases: Record<string, string> = {
    "½ tsp": "1/2 tsp",
    "¾ cup": "3/4 cup",
    "1½ tsp": "1 1/2 tsp",
    "2¾ cups": "2 3/4 cups",
    "¼–½ tsp": "1/4–1/2 tsp",
  };
  Object.entries(cases).forEach(([input, expected]) => {
    if (normalizePdfText(input) !== expected) {
      throw new Error(`PDF fraction normalization failed for ${input}`);
    }
  });
}

assertFractionFallbacks();

export type StructuredRecipeInput = {
  title: string;
  titleBn?: string;
  description: string;
  about: string[];
  ingredients: {
    group?: string;
    quantity?: string;
    unit?: string;
    name: string;
    notes?: string;
  }[];
  ingredientsBn: string[];
  steps: { group?: string; instruction: string }[];
  stepsBn: string[];
  tips: string[];
  prepTime: number;
  cookTime: number;
  additionalTime?: number;
  servings: string;
  difficulty: string;
};

const ICONS = {
  web: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#700D1D" d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20m6.9 9h-3.06a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.9 11M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82A15.7 15.7 0 0 1 12 4.03M8.54 7.44A15.7 15.7 0 0 0 7.16 11H4.1a8.03 8.03 0 0 1 4.44-3.56M4.1 13h3.06c.08.66.14 1.32.26 2H4.1a8.03 8.03 0 0 1 0-2m4.44 3.56c.6 1.11 1.05 2.31 1.38 3.56A8.03 8.03 0 0 1 4.1 16zM12 19.97A15.7 15.7 0 0 1 10.09 16h3.82A15.7 15.7 0 0 1 12 19.97M14.84 15c.09-.66.16-1.34.16-2h3.9a8.03 8.03 0 0 1-4.06 2m.16-4a15.7 15.7 0 0 0-.16-2h3.06a8.03 8.03 0 0 1 0 2z"/></svg>',
  instagram:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#700D1D" d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6m5.25-3a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5"/></svg>',
  youtube:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#700D1D" d="M21.58 7.19a2.75 2.75 0 0 0-1.93-1.94C17.95 4.8 12 4.8 12 4.8s-5.95 0-7.65.45a2.75 2.75 0 0 0-1.93 1.94C2 8.9 2 12 2 12s0 3.1.42 4.81a2.75 2.75 0 0 0 1.93 1.94c1.7.45 7.65.45 7.65.45s5.95 0 7.65-.45a2.75 2.75 0 0 0 1.93-1.94C22 15.1 22 12 22 12s0-3.1-.42-4.81M10 15.3V8.7l5.2 3.3z"/></svg>',
} as const;

const WEBSITE_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#700D1D" stroke-width="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" fill="none" stroke="#700D1D" stroke-width="1.8" stroke-linecap="round"/></svg>';

function toBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
  }
  return btoa(binary);
}

async function loadAssets() {
  const [
    fontResponse,
    futuraResponse,
    boraxResponse,
    logoResponse,
    watermarkResponse,
  ] = await Promise.all([
    fetch(bengaliFontUrl),
    fetch(futuraFontUrl),
    fetch(boraxFontUrl),
    fetch(logoUrl),
    fetch(watermarkUrl),
  ]);
  if (
    !fontResponse.ok ||
    !futuraResponse.ok ||
    !boraxResponse.ok ||
    !logoResponse.ok ||
    !watermarkResponse.ok
  ) {
    throw new Error("Calcutta Kitchen PDF assets could not be loaded.");
  }
  const [fontBuffer, futuraBuffer, boraxBuffer, logoSvg, watermarkBuffer] =
    await Promise.all([
      fontResponse.arrayBuffer(),
      futuraResponse.arrayBuffer(),
      boraxResponse.arrayBuffer(),
      logoResponse.text(),
      watermarkResponse.arrayBuffer(),
    ]);
  return {
    font: toBase64(fontBuffer),
    futura: toBase64(futuraBuffer),
    borax: toBase64(boraxBuffer),
    logo: logoSvg,
    watermark: `data:image/png;base64,${toBase64(watermarkBuffer)}`,
  };
}

const text = (value: string, style?: string) => ({
  text: normalizePdfText(value),
  style,
});

function normalizeDocumentText(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeDocumentText);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      key === "text" && typeof child === "string"
        ? normalizePdfText(child)
        : normalizeDocumentText(child),
    ])
  );
}

function containsBengali(value: string): boolean {
  return /[\u0980-\u09FF]/u.test(value);
}

function headingStyle(
  value: string,
  englishStyle: string,
  bengaliStyle: string
): string {
  return containsBengali(value) ? bengaliStyle : englishStyle;
}

function markerRow(marker: string, value: string, style = "body") {
  return {
    table: {
      widths: [22, "*"],
      body: [
        [
          { text: marker, style: "marker" },
          { text: value, style },
        ],
      ],
    },
    layout: "noBorders",
    margin: [0, 0, 0, 7],
    dontBreakRows: true,
  };
}

function methodStepRow(number: number, instruction: string, style = "body") {
  return {
    table: {
      widths: [28, "*"],
      body: [
        [
          { svg: methodMarkerSvg(number), fit: [24, 24], margin: [0, 2, 0, 2] },
          { text: instruction, color: BODY, margin: [8, 3, 0, 3], style },
        ],
      ],
    },
    layout: "noBorders",
    unbreakable: true,
    dontBreakRows: true,
    margin: [0, 3, 0, 3],
  };
}

function methodMarkerSvg(number: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#F24E07"/><text x="12" y="16" text-anchor="middle" font-family="Futura, sans-serif" font-size="10" font-weight="700" fill="#F8F5E6">${number}</text></svg>`;
}

function groupedRows<T extends { group?: string }>(
  items: T[],
  render: (item: T) => Record<string, unknown> | null
) {
  const rows: Record<string, unknown>[] = [];
  items.forEach((item, index) => {
    if (item.group && item.group !== items[index - 1]?.group) {
      rows.push({
        text: item.group,
        style: headingStyle(item.group, "groupHeading", "groupHeadingBn"),
        keepWithNext: true,
        margin: [0, 8, 0, 4],
      });
    }
    const rendered = render(item);
    if (rendered) rows.push(rendered);
  });
  return rows;
}

function parseBengaliSteps(steps: string[]) {
  let currentGroup: string | undefined;
  return steps.reduce<{ group?: string; instruction: string }[]>(
    (result, step) => {
      if (step.startsWith("HEADING:")) {
        currentGroup = step.replace(/^HEADING:/, "");
        return result;
      }
      return [...result, { group: currentGroup, instruction: step }];
    },
    []
  );
}

export async function downloadStructuredRecipePdf(
  recipe: StructuredRecipeInput,
  slug: string,
  language: "en" | "bn"
) {
  console.log("[PDF] start", { slug, language });
  console.log("[PDF] waiting for fonts");
  if (typeof document !== "undefined" && document.fonts) {
    await document.fonts.ready;
  }
  console.log("[PDF] fonts ready");
  console.log("[PDF] loading assets");
  let assets;
  try {
    assets = await loadAssets();
  } catch (error) {
    console.error("[PDF] downloadStructuredRecipePdf failed:", error);
    throw error;
  }
  console.log("[PDF] assets loaded");
  console.log("[PDF] creating document definition");
  pdfMake.addVirtualFileSystem({
    "NotoSerifBengali.ttf": assets.font,
    "Futura.otf": assets.futura,
    "Borax-VF.ttf": assets.borax,
  });
  pdfMake.addFonts({
    "Borax VF": {
      normal: "Borax-VF.ttf",
      bold: "Borax-VF.ttf",
      italics: "Borax-VF.ttf",
      bolditalics: "Borax-VF.ttf",
    },
    Futura: {
      normal: "Futura.otf",
      bold: "Futura.otf",
      italics: "Futura.otf",
      bolditalics: "Futura.otf",
    },
    Bengali: {
      normal: "NotoSerifBengali.ttf",
      bold: "NotoSerifBengali.ttf",
      italics: "NotoSerifBengali.ttf",
      bolditalics: "NotoSerifBengali.ttf",
    },
  });

  const totalTime =
    recipe.prepTime + recipe.cookTime + (recipe.additionalTime ?? 0);
  const ingredients =
    language === "bn" && recipe.ingredientsBn.length > 0
      ? recipe.ingredientsBn.map(item => ({
          group: item.startsWith("HEADING:")
            ? item.replace(/^HEADING:/, "")
            : undefined,
          name: item.startsWith("HEADING:") ? "" : item,
        }))
      : recipe.ingredients;
  const steps: { group?: string; instruction: string }[] =
    language === "bn" && recipe.stepsBn.length > 0
      ? parseBengaliSteps(recipe.stepsBn)
      : recipe.steps.map(step => ({
          group: step.group,
          instruction: step.instruction,
        }));
  const font = language === "bn" ? "Bengali" : "Futura";
  const bodyStyle = language === "bn" ? "bodyBn" : "body";
  const ingredientRows =
    language === "bn" && recipe.ingredientsBn.length > 0
      ? groupedRows(ingredients, item =>
          item.name ? markerRow("•", item.name, bodyStyle) : null
        )
      : groupedRows(recipe.ingredients, item =>
          markerRow(
            "•",
            [item.quantity, item.unit, item.name, item.notes]
              .filter(Boolean)
              .join(" ")
          )
        );
  const methodContent: Record<string, unknown>[] = [];
  let previousGroup: string | undefined;
  steps.forEach((step, index) => {
    if (step.group && step.group !== previousGroup) {
      methodContent.push({
        text: step.group,
        style: headingStyle(step.group, "groupHeading", "groupHeadingBn"),
        keepWithNext: true,
        margin: [0, 8, 0, 4],
      });
      previousGroup = step.group;
    }
    methodContent.push(methodStepRow(index + 1, step.instruction, bodyStyle));
  });
  const generatedStepCount = methodContent.filter(
    item => "table" in item
  ).length;
  const groupHeadingStyle =
    language === "bn" ? "groupHeadingBn" : "groupHeading";
  const generatedGroupHeadingCount = methodContent.filter(
    item => item.style === groupHeadingStyle
  ).length;
  const missingInstructions = steps.filter(
    step =>
      !methodContent.some(
        item =>
          "table" in item && JSON.stringify(item).includes(step.instruction)
      )
  ).length;
  const duplicateInstructions =
    steps.length - new Set(steps.map(step => step.instruction)).size;
  const expectedGroupCount = new Set(
    steps.map(step => step.group).filter(Boolean)
  ).size;
  const validationFailed =
    generatedStepCount !== steps.length ||
    missingInstructions !== 0 ||
    generatedGroupHeadingCount !== expectedGroupCount ||
    duplicateInstructions !== 0 ||
    (slug === "kolkata-chicken-biryani" &&
      (generatedStepCount !== 24 || generatedGroupHeadingCount !== 3));
  if (validationFailed) {
    console.error("[PDF] Method mapping validation failed", {
      slug,
      language,
      sourceStepCount: steps.length,
      generatedInstructionCount: generatedStepCount,
      expectedGroupCount,
      generatedGroupHeadingCount,
      missingInstructions,
      duplicateInstructions,
      checks: {
        stepCount: generatedStepCount === steps.length,
        missingInstructions: missingInstructions === 0,
        groupCount: generatedGroupHeadingCount === expectedGroupCount,
        duplicateInstructions: duplicateInstructions === 0,
        kolkataBiryaniCounts:
          slug !== "kolkata-chicken-biryani" ||
          (generatedStepCount === 24 && generatedGroupHeadingCount === 3),
      },
    });
    throw new Error("Recipe PDF method mapping failed validation.");
  }
  const tipRows = recipe.tips.map(tip => markerRow("•", tip));

  const footerContactItem = (icon: string, label: string) => ({
    columns: [
      { width: 11, svg: icon, fit: [11, 11], margin: [0, 1, 0, 0] },
      {
        width: "auto",
        ...text(label, "footerText"),
        margin: [4, 0, 0, 0],
      },
    ],
    columnGap: 0,
    width: "auto",
  });

  const footer = (currentPage: number, pageCount: number) => ({
    margin: [40, 8, 40, 0],
    stack: [
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 0.6,
            lineColor: MAROON,
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            svg: assets.logo,
            fit: [50, 24],
            margin: [0, 5, 8, 0],
          },
          {
            width: "*",
            alignment: "center",
            table: {
              widths: ["auto", "auto", "auto"],
              body: [
                [
                  footerContactItem(WEBSITE_ICON, "calcuttakitchen.in"),
                  footerContactItem(ICONS.instagram, "@calcuttakitchen.in"),
                  footerContactItem(ICONS.youtube, "@calcutta.kitchen"),
                ],
              ],
            },
            layout: {
              hLineWidth: () => 0,
              vLineWidth: () => 0,
              paddingLeft: (index: number) => (index === 0 ? 0 : 8),
              paddingRight: (index: number) => (index === 2 ? 0 : 8),
              paddingTop: () => 0,
              paddingBottom: () => 0,
            },
            margin: [0, 10, 0, 0],
          },
          {
            width: 90,
            text: `Page ${currentPage} of ${pageCount}`,
            style: "footerText",
            alignment: "right",
            margin: [0, 10, 0, 0],
          },
        ],
        columnGap: 0,
      },
    ],
  });

  const documentDefinition = {
    pageSize: "A4",
    pageMargins: [40, 82, 40, 84],
    images: { watermark: assets.watermark },
    background: () => ({
      image: "watermark",
      width: 300,
      opacity: 0.08,
      absolutePosition: { x: 148, y: 270 },
    }),
    header: {
      margin: [40, 24, 40, 0],
      stack: [
        {
          columns: [
            { svg: assets.logo, width: 112 },
            {
              text: "রেসিপি নয়, রান্না শেখাই",
              style: "tagline",
              alignment: "right",
              margin: [0, 10, 0, 0],
            },
          ],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 10,
              x2: 515,
              y2: 10,
              lineWidth: 0.6,
              lineColor: MAROON,
            },
          ],
        },
      ],
    },
    footer,
    defaultStyle: { font, color: BODY, fontSize: 10, lineHeight: 1.3 },
    styles: {
      recipeTitle: {
        font: "Borax VF",
        fontSize: 24,
        color: MAROON,
        bold: false,
        margin: [0, 0, 0, 2],
      },
      recipeTitleBn: {
        font: "Bengali",
        fontSize: 16,
        color: ORANGE,
        bold: true,
        margin: [0, 0, 0, 12],
      },
      sectionHeading: {
        font: "Borax VF",
        fontSize: 18,
        color: MAROON,
        bold: false,
        margin: [0, 20, 0, 8],
        keepWithNext: true,
      },
      groupHeading: {
        font: "Borax VF",
        fontSize: 14,
        color: MAROON,
        bold: false,
      },
      sectionHeadingBn: {
        font: "Bengali",
        fontSize: 18,
        color: MAROON,
        bold: false,
        lineHeight: 1.25,
      },
      groupHeadingBn: {
        font: "Bengali",
        fontSize: 14,
        color: MAROON,
        bold: true,
        lineHeight: 1.25,
      },
      body: { font: "Futura", fontSize: 10, color: BODY, lineHeight: 1.35 },
      bodyBn: {
        font: "Bengali",
        fontSize: 10,
        color: BODY,
        lineHeight: 1.45,
      },
      marker: { fontSize: 10, color: ORANGE, bold: true, alignment: "center" },
      metadata: { font: "Futura", fontSize: 9, color: MAROON },
      footerText: { font: "Futura", fontSize: 8, color: MAROON },
      tagline: {
        font: "Bengali",
        fontSize: 13,
        color: MAROON,
        bold: true,
      },
    },
    content: [
      text(
        recipe.title,
        headingStyle(recipe.title, "recipeTitle", "recipeTitleBn")
      ),
      ...(recipe.titleBn ? [text(`(${recipe.titleBn})`, "recipeTitleBn")] : []),
      {
        columns: [
          text(`Prep ${recipe.prepTime} min`, "metadata"),
          text(`Cook ${recipe.cookTime} min`, "metadata"),
          text(`Total ${totalTime} min`, "metadata"),
          text(`Serves ${recipe.servings}`, "metadata"),
          text(`Difficulty ${recipe.difficulty}`, "metadata"),
        ],
      },
      {
        text: "About this recipe",
        style: headingStyle(
          "About this recipe",
          "sectionHeading",
          "sectionHeadingBn"
        ),
      },
      ...recipe.about.map(paragraph => text(paragraph, "body")),
      ...(() => {
        const heading = language === "bn" ? "উপকরণ" : "Ingredients";
        return [
          {
            text: heading,
            style: headingStyle(heading, "sectionHeading", "sectionHeadingBn"),
          },
        ];
      })(),
      ...ingredientRows,
      ...(() => {
        const heading = language === "bn" ? "রান্নার পদ্ধতি" : "Cooking method";
        return [
          {
            text: heading,
            style: headingStyle(heading, "sectionHeading", "sectionHeadingBn"),
          },
        ];
      })(),
      ...methodContent,
      ...(tipRows.length > 0
        ? [
            {
              text: "Chef's tips",
              style: headingStyle(
                "Chef's tips",
                "sectionHeading",
                "sectionHeadingBn"
              ),
            },
            ...tipRows,
          ]
        : []),
    ],
  };

  const normalizedDefinition = normalizeDocumentText(
    documentDefinition
  ) as typeof documentDefinition;

  console.log("[PDF] saving");
  try {
    pdfMake
      .createPdf(normalizedDefinition)
      .download(`${slug}-calcutta-kitchen.pdf`);
    console.log("[PDF] complete");
  } catch (error) {
    console.error("[PDF] downloadStructuredRecipePdf failed:", error);
    throw error;
  }
}
