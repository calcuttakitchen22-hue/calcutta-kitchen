import watermark from "@/assets/images/pdf-watermark.png";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const BRAND_MAROON = [112, 13, 29] as const;
const CONTENT_LEFT = 12;
const CONTENT_TOP = 28;
const CONTENT_WIDTH = 186;
const CONTENT_HEIGHT = 248;

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

function addFooter(pdf: jsPDF, pageNumber: number): void {
  const pageHeight = pdf.internal.pageSize.getHeight();
  pdf.setDrawColor(...BRAND_MAROON);
  pdf.setLineWidth(0.35);
  pdf.line(CONTENT_LEFT, pageHeight - 13, CONTENT_LEFT + CONTENT_WIDTH, pageHeight - 13);
  pdf.setTextColor(...BRAND_MAROON);
  pdf.setFontSize(8);
  pdf.text("Calcutta Kitchen · calcuttakitchen.in", CONTENT_LEFT, pageHeight - 7);
  pdf.text(String(pageNumber), CONTENT_LEFT + CONTENT_WIDTH, pageHeight - 7, { align: "right" });
}

export async function downloadRecipePdf(recipeElement: HTMLElement, documentTitle: string): Promise<void> {
  recipeElement.setAttribute("aria-hidden", "false");
  const sourceCanvas = await html2canvas(recipeElement, { scale: 2, useCORS: true, backgroundColor: "#F8F5E6" });
  recipeElement.setAttribute("aria-hidden", "true");

  const pdf = new jsPDF("p", "mm", "a4");
  const watermarkImage = await loadImage(watermark.src);
  const pixelsPerMillimetre = sourceCanvas.width / CONTENT_WIDTH;
  const sliceHeight = Math.floor(CONTENT_HEIGHT * pixelsPerMillimetre);
  let sourceOffset = 0;
  let pageNumber = 1;

  while (sourceOffset < sourceCanvas.height) {
    const currentHeight = Math.min(sliceHeight, sourceCanvas.height - sourceOffset);
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = sourceCanvas.width;
    pageCanvas.height = currentHeight;
    const context = pageCanvas.getContext("2d");
    if (!context) break;

    context.fillStyle = "#F8F5E6";
    context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    context.save();
    context.globalAlpha = 0.055;
    const watermarkSize = Math.min(pageCanvas.width, pageCanvas.height) * 0.78;
    context.drawImage(watermarkImage, (pageCanvas.width - watermarkSize) / 2, (pageCanvas.height - watermarkSize) / 2, watermarkSize, watermarkSize);
    context.restore();
    context.drawImage(sourceCanvas, 0, sourceOffset, sourceCanvas.width, currentHeight, 0, 0, pageCanvas.width, currentHeight);

    if (pageNumber > 1) pdf.addPage();
    pdf.setTextColor(...BRAND_MAROON);
    pdf.setFontSize(12);
    pdf.text("Calcutta Kitchen", CONTENT_LEFT, 14);
    pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", CONTENT_LEFT, CONTENT_TOP, CONTENT_WIDTH, currentHeight / pixelsPerMillimetre);
    addFooter(pdf, pageNumber);

    sourceOffset += currentHeight;
    pageNumber += 1;
  }

  pdf.save(`${documentTitle.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").toLowerCase() || "recipe"}.pdf`);
}
