import { downloadRecipePdf } from "./recipePdf";

console.log("DOWNLOAD RECIPE TS EXECUTED");
declare global {
  interface Window {
    downloadRecipe: () => Promise<void>;
  }
}

if (typeof window !== "undefined") {
  window.downloadRecipe = async () => {
    await downloadRecipePdf();
  };

  console.log("DOWNLOAD CLIENT LOADED");
}

export {};