import watermark from "@/assets/images/pdf-watermark.png";
import logo from "@/assets/images/calcutta-kitchen-logo.svg";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const BRAND_MAROON = [112, 13, 29] as const;
const CONTENT_LEFT = 12;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_TOP = 29;
const CONTENT_WIDTH = 186;
const CONTENT_HEIGHT = 249;
const MDI_ICON_PATHS = {
  web: "M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2",
  instagram:
    "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3",
  youtube:
    "m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73",
} as const;

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

function drawFooterIcon(
  context: CanvasRenderingContext2D,
  path: string,
  x: number,
  y: number,
  size: number
): void {
  context.save();
  context.fillStyle = `rgb(${BRAND_MAROON.join(" ")})`;
  context.translate(x, y);
  context.scale(size / 24, size / 24);
  context.fill(new Path2D(path));
  context.restore();
}

function drawFooter(
  context: CanvasRenderingContext2D,
  pixelsPerMillimetre: number,
  logoImage: HTMLImageElement,
  pageNumber: number
): void {
  const baseline = 288 * pixelsPerMillimetre;
  const iconSize = 3.6 * pixelsPerMillimetre;
  const logoHeight = 5.4 * pixelsPerMillimetre;
  const logoWidth =
    logoHeight * (logoImage.naturalWidth / logoImage.naturalHeight);
  context.fillStyle = `rgb(${BRAND_MAROON.join(" ")})`;
  context.font = `${2.65 * pixelsPerMillimetre}px sans-serif`;
  context.textBaseline = "middle";
  const iconGap = 1.5 * pixelsPerMillimetre;
  const groupGap = 4 * pixelsPerMillimetre;
  const webText = "calcuttakitchen.in";
  const socialText = "@calcuttakitchen.in";
  const totalWidth =
    iconSize +
    iconGap +
    context.measureText(webText).width +
    groupGap +
    iconSize +
    iconGap +
    context.measureText(socialText).width +
    groupGap +
    iconSize +
    iconGap +
    context.measureText(socialText).width;
  let x = (PAGE_WIDTH * pixelsPerMillimetre - totalWidth) / 2;

  context.drawImage(
    logoImage,
    CONTENT_LEFT * pixelsPerMillimetre,
    baseline - logoHeight * 0.76,
    logoWidth,
    logoHeight
  );
  drawFooterIcon(
    context,
    MDI_ICON_PATHS.web,
    x,
    baseline - iconSize / 2,
    iconSize
  );
  x += iconSize + iconGap;
  context.fillText(webText, x, baseline);
  x += context.measureText(webText).width + groupGap;
  drawFooterIcon(
    context,
    MDI_ICON_PATHS.instagram,
    x,
    baseline - iconSize / 2,
    iconSize
  );
  x += iconSize + iconGap;
  context.fillText(socialText, x, baseline);
  x += context.measureText(socialText).width + groupGap;
  drawFooterIcon(
    context,
    MDI_ICON_PATHS.youtube,
    x,
    baseline - iconSize / 2,
    iconSize
  );
  x += iconSize + iconGap;
  context.fillText(socialText, x, baseline);

  context.textAlign = "right";
  context.fillText(
    String(pageNumber),
    (CONTENT_LEFT + CONTENT_WIDTH) * pixelsPerMillimetre,
    baseline
  );
  context.textBaseline = "alphabetic";
}

function getPageBreakOffsets(
  recipeElement: HTMLElement,
  scale: number
): number[] {
  const sourceTop = recipeElement.getBoundingClientRect().top;
  return [
    ...recipeElement.querySelectorAll<HTMLElement>("[data-pdf-block], h1, h2"),
  ]
    .map(element =>
      Math.round((element.getBoundingClientRect().top - sourceTop) * scale)
    )
    .filter(offset => offset > 0)
    .sort((first, second) => first - second);
}

function createPageCanvas(
  pixelsPerMillimetre: number,
  watermarkImage: HTMLImageElement,
  logoImage: HTMLImageElement,
  sourceCanvas: HTMLCanvasElement,
  sourceOffset: number,
  sourceHeight: number,
  pageNumber: number
): HTMLCanvasElement | undefined {
  const pageCanvas = document.createElement("canvas");
  pageCanvas.width = Math.round(PAGE_WIDTH * pixelsPerMillimetre);
  pageCanvas.height = Math.round(PAGE_HEIGHT * pixelsPerMillimetre);
  const context = pageCanvas.getContext("2d");
  if (!context) return undefined;

  context.fillStyle = "#F8F5E6";
  context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
  context.save();
  context.globalAlpha = 0.045;
  const watermarkSize = Math.min(pageCanvas.width, pageCanvas.height) * 0.72;
  context.drawImage(
    watermarkImage,
    (pageCanvas.width - watermarkSize) / 2,
    (pageCanvas.height - watermarkSize) / 2,
    watermarkSize,
    watermarkSize
  );
  context.restore();

  const logoHeight = 13 * pixelsPerMillimetre;
  const logoWidth =
    logoHeight * (logoImage.naturalWidth / logoImage.naturalHeight);
  context.drawImage(
    logoImage,
    CONTENT_LEFT * pixelsPerMillimetre,
    6 * pixelsPerMillimetre,
    logoWidth,
    logoHeight
  );
  context.strokeStyle = `rgb(${BRAND_MAROON.join(" ")})`;
  context.globalAlpha = 0.3;
  context.lineWidth = 0.35 * pixelsPerMillimetre;
  context.beginPath();
  context.moveTo(CONTENT_LEFT * pixelsPerMillimetre, 24 * pixelsPerMillimetre);
  context.lineTo(
    (CONTENT_LEFT + CONTENT_WIDTH) * pixelsPerMillimetre,
    24 * pixelsPerMillimetre
  );
  context.stroke();
  context.globalAlpha = 1;

  context.drawImage(
    sourceCanvas,
    0,
    sourceOffset,
    sourceCanvas.width,
    sourceHeight,
    CONTENT_LEFT * pixelsPerMillimetre,
    CONTENT_TOP * pixelsPerMillimetre,
    CONTENT_WIDTH * pixelsPerMillimetre,
    sourceHeight
  );

  context.strokeStyle = `rgb(${BRAND_MAROON.join(" ")})`;
  context.globalAlpha = 0.3;
  context.lineWidth = 0.35 * pixelsPerMillimetre;
  context.beginPath();
  context.moveTo(CONTENT_LEFT * pixelsPerMillimetre, 281 * pixelsPerMillimetre);
  context.lineTo(
    (CONTENT_LEFT + CONTENT_WIDTH) * pixelsPerMillimetre,
    281 * pixelsPerMillimetre
  );
  context.stroke();
  context.globalAlpha = 1;
  drawFooter(context, pixelsPerMillimetre, logoImage, pageNumber);

  return pageCanvas;
}

export async function downloadRecipePdf(
  recipeElement: HTMLElement,
  documentTitle: string
): Promise<void> {
  recipeElement.setAttribute("aria-hidden", "false");
  try {
    await document.fonts.ready;
    const sourceCanvas = await html2canvas(recipeElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#F8F5E6",
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const [watermarkImage, logoImage] = await Promise.all([
      loadImage(watermark.src),
      loadImage(logo.src),
    ]);
    const pixelsPerMillimetre = sourceCanvas.width / CONTENT_WIDTH;
    const sliceHeight = Math.floor(CONTENT_HEIGHT * pixelsPerMillimetre);
    const pageBreakOffsets = getPageBreakOffsets(recipeElement, 2);
    let sourceOffset = 0;
    let pageNumber = 1;

    while (sourceOffset < sourceCanvas.height) {
      const idealOffset = Math.min(
        sourceOffset + sliceHeight,
        sourceCanvas.height
      );
      const preferredOffset = pageBreakOffsets
        .filter(
          offset =>
            offset > sourceOffset + sliceHeight * 0.45 && offset <= idealOffset
        )
        .at(-1);
      const nextOffset = preferredOffset ?? idealOffset;
      const currentHeight = nextOffset - sourceOffset;
      const pageCanvas = createPageCanvas(
        pixelsPerMillimetre,
        watermarkImage,
        logoImage,
        sourceCanvas,
        sourceOffset,
        currentHeight,
        pageNumber
      );
      if (!pageCanvas) break;

      if (pageNumber > 1) pdf.addPage();
      pdf.addImage(
        pageCanvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        PAGE_WIDTH,
        PAGE_HEIGHT
      );

      sourceOffset += currentHeight;
      pageNumber += 1;
    }

    pdf.save(
      `${
        documentTitle
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase() || "recipe"
      }.pdf`
    );
  } finally {
    recipeElement.setAttribute("aria-hidden", "true");
  }
}
