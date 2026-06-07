import { downloadRecipePdf } from "./recipePdf";
console.log("xxxx");
declare global {
  interface Window {
    generateRecipePdf: () => Promise<void>;
  }
}

if (typeof window !== "undefined") {
  window.generateRecipePdf = downloadRecipePdf;
}

export {};