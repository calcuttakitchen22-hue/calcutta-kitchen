import { jsPDF } from "jspdf";
import logo from "@/assets/images/Hori logo o-w.png";
import watermark from "@/assets/images/pdf-watermark.png";

function drawFooter(pdf: jsPDF) {

  pdf.setFontSize(10);

  pdf.setTextColor(100);

pdf.text(
  "calcuttakitchen.in",
  105,
  285,
  { align: "center" }
);
}

function drawPageBackground(
  pdf: jsPDF,
  watermarkImg: HTMLImageElement
) {

  pdf.setFillColor(248, 245, 230);

  pdf.rect(
    0,
    0,
    210,
    297,
    "F"
  );

pdf.addImage(
  watermarkImg,
  "PNG",
  0,
  -20,
  320,
  320
);
}
async function waitForImage(
  img: HTMLImageElement
) {

  if (img.complete) {
    return;
  }

  await new Promise(resolve => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(true);
  });
}

(window as any).downloadRecipePdf =
async () => {
  

const title =
  document.querySelector("h1")
    ?.childNodes[0]
    ?.textContent
    ?.trim() || "Recipe";

const ingredients = Array.from(
  document.querySelectorAll(
    "#ingredients + ul li"
  )
).map(
  li =>
    li.textContent?.trim() || ""
);

const methodHeading =
  document.getElementById(
    "method"
  );

let method: string[] = [];

if (methodHeading) {

  const methodList =
    methodHeading.nextElementSibling;

  if (
    methodList?.tagName === "OL"
  ) {

    method = Array.from(
      methodList.querySelectorAll(
        "li"
      )
    ).map(
      li =>
        li.textContent?.trim() ||
        ""
    );
  }
}

  const pdf = new jsPDF();

  	const logoImg = new Image();

	logoImg.src = logo.src;
	
	const watermarkImg = new Image();

	watermarkImg.src = watermark.src;


pdf.setTextColor(0);

await waitForImage(
  watermarkImg
);


drawPageBackground(
  pdf,
  watermarkImg
);

drawFooter(pdf);
	await waitForImage(
  logoImg
);


pdf.addImage(
  logoImg,
  "PNG",
  20,
  10,
  61,
  25
);

const heroImgElement =
  document.querySelector("main img") as HTMLImageElement;
  
  if (
  heroImgElement &&
  !heroImgElement.complete
) {

  await waitForImage(
    heroImgElement
  );
}
  
  if (heroImgElement) {

  const canvas = document.createElement("canvas");

  const maxWidth = 1200;

const scale =
  maxWidth /
  heroImgElement.naturalWidth;

canvas.width = maxWidth;

canvas.height =
  heroImgElement.naturalHeight *
  scale;

  const ctx = canvas.getContext("2d");

  if (ctx) {

    ctx.drawImage(
  heroImgElement,
  0,
  0,
  canvas.width,
  canvas.height
);

    const heroData =
  canvas.toDataURL(
    "image/jpeg",
    0.7
  );

    pdf.addImage(
      heroData,
      "JPEG",
      20,
      60,
      170,
      95
    );
  }
}	

  pdf.setTextColor(112, 13, 29);

pdf.setFont(
  "helvetica",
  "bold"
);

pdf.setFontSize(34);

const titleLines =
  pdf.splitTextToSize(
    title,
    160
  );

pdf.text(
  titleLines,
  105,
  50,
  {
    align: "center"
  }
);

pdf.setFont(
  "helvetica",
  "normal"
);

  let y = 185;

  pdf.setTextColor(112, 13, 29);

	pdf.setFontSize(16);

	pdf.text(
	  "INGREDIENTS",
	  20,
	  y
	);

  y += 10;
  
  pdf.setTextColor(0);
pdf.setFontSize(12);

  ingredients.forEach(item => {

  if (y > 270) {

  pdf.addPage();

  drawPageBackground(
    pdf,
    watermarkImg
  );

  drawFooter(pdf);

  y = 20;

  pdf.setTextColor(0);

  pdf.setFontSize(12);
  
  pdf.setFont(
  "helvetica",
  "normal"
);

}
  
  pdf.text(
    "• " + item,
    25,
    y
  );

  y += 8;
});

  y += 10;

  pdf.setTextColor(112, 13, 29);

pdf.setFontSize(16);

if (y > 240) {

  pdf.addPage();

  drawPageBackground(
    pdf,
    watermarkImg
  );

  drawFooter(pdf);

  y = 20;
}

pdf.setTextColor(112, 13, 29);

pdf.setFontSize(16);

pdf.text(
  "METHOD",
  20,
  y
);

y += 10;

pdf.setTextColor(0);

pdf.setFontSize(12);

  method.forEach((step, index) => {

if (y > 270) {

  pdf.addPage();

  drawPageBackground(
    pdf,
    watermarkImg
  );

  drawFooter(pdf);

  y = 20;

  pdf.setTextColor(112, 13, 29);

  pdf.setFontSize(16);

  pdf.text(
    "METHOD",
    20,
    y
  );

  y += 10;

  pdf.setTextColor(0);

  pdf.setFontSize(12);
  
  pdf.setFont(
  "helvetica",
  "normal"
);

}

  pdf.text(
    `${index + 1}. ${step}`,
    25,
    y
  );

  y += 8;
});
  
pdf.save(
  title.replace(
    /[^\w\s-]/g,
    ""
  ) + ".pdf"
);

};