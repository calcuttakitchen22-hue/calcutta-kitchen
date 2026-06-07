import { downloadRecipePdf } from "./recipePdf";

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