import watermark from "@/assets/images/pdf-watermark.png";
import logo from "@/assets/images/calcutta-kitchen-logo.svg";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const BRAND_MAROON = [112, 13, 29] as const;
const CONTENT_LEFT = 12;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_TOP = 26;
const CONTENT_WIDTH = 186;
const CONTENT_HEIGHT = 254;

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
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

  const logoHeight = 8 * pixelsPerMillimetre;
  const logoWidth = logoHeight * (logoImage.naturalWidth / logoImage.naturalHeight);
  context.drawImage(logoImage, CONTENT_LEFT * pixelsPerMillimetre, 9 * pixelsPerMillimetre, logoWidth, logoHeight);
  context.strokeStyle = `rgb(${BRAND_MAROON.join(" ")})`;
  context.globalAlpha = 0.3;
  context.lineWidth = 0.35 * pixelsPerMillimetre;
  context.beginPath();
  context.moveTo(CONTENT_LEFT * pixelsPerMillimetre, 20 * pixelsPerMillimetre);
  context.lineTo((CONTENT_LEFT + CONTENT_WIDTH) * pixelsPerMillimetre, 20 * pixelsPerMillimetre);
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
  context.lineTo((CONTENT_LEFT + CONTENT_WIDTH) * pixelsPerMillimetre, 281 * pixelsPerMillimetre);
  context.stroke();
  context.globalAlpha = 1;
  context.fillStyle = `rgb(${BRAND_MAROON.join(" ")})`;
  context.font = `${2.8 * pixelsPerMillimetre}px sans-serif`;
  context.fillText("Calcutta Kitchen  ·  calcuttakitchen.in", CONTENT_LEFT * pixelsPerMillimetre, 288 * pixelsPerMillimetre);
  context.textAlign = "right";
  context.fillText(String(pageNumber), (CONTENT_LEFT + CONTENT_WIDTH) * pixelsPerMillimetre, 288 * pixelsPerMillimetre);

  return pageCanvas;
}

export async function downloadRecipePdf(recipeElement: HTMLElement, documentTitle: string): Promise<void> {
  recipeElement.setAttribute("aria-hidden", "false");
  const sourceCanvas = await html2canvas(recipeElement, { scale: 2, useCORS: true, backgroundColor: "#F8F5E6" });
  recipeElement.setAttribute("aria-hidden", "true");

  const pdf = new jsPDF("p", "mm", "a4");
  const [watermarkImage, logoImage] = await Promise.all([loadImage(watermark.src), loadImage(logo.src)]);
  const pixelsPerMillimetre = sourceCanvas.width / CONTENT_WIDTH;
  const sliceHeight = Math.floor(CONTENT_HEIGHT * pixelsPerMillimetre);
  let sourceOffset = 0;
  let pageNumber = 1;

  while (sourceOffset < sourceCanvas.height) {
    const currentHeight = Math.min(sliceHeight, sourceCanvas.height - sourceOffset);
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
    pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", 0, 0, PAGE_WIDTH, PAGE_HEIGHT);

    sourceOffset += currentHeight;
    pageNumber += 1;
  }

  pdf.save(`${documentTitle.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").toLowerCase() || "recipe"}.pdf`);
}
