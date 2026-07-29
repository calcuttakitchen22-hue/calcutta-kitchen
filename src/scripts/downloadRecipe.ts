import { downloadRecipePdf } from "./recipePdf";
declare global {
  interface Window {
    generateRecipePdf: () => Promise<void>;
  }
}

if (typeof window !== "undefined") {
  window.generateRecipePdf = async () => {
    const recipeElement = document.querySelector<HTMLElement>("#recipe-pdf");
    if (recipeElement) await downloadRecipePdf(recipeElement, document.title);
  };
}

export {};
