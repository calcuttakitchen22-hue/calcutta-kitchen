declare module "pdfmake/build/pdfmake" {
  type PdfContent = Record<string, unknown>;

  interface PdfMake {
    addVirtualFileSystem(vfs: Record<string, string>): void;
    addFonts(fonts: Record<string, Record<string, string>>): void;
    createPdf(documentDefinition: PdfContent): {
      download(fileName: string): void;
    };
  }

  const pdfMake: PdfMake;
  export default pdfMake;
}
