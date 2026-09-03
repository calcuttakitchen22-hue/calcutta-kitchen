import type { Invoice } from "@/types/invoice";
export function invoiceSequence(
  invoiceNumber: string,
  prefix: string
): number | null {
  if (!invoiceNumber.startsWith(prefix)) return null;
  const sequence = Number(invoiceNumber.slice(prefix.length));
  return Number.isInteger(sequence) && sequence >= 0 ? sequence : null;
}

export function nextInvoiceNumber(
  invoices: Invoice[],
  latestSequence: number,
  prefix: string,
  startingSequence: number
): string {
  const highest = invoices.reduce(
    (max, invoice) => {
      const sequence = invoiceSequence(invoice.invoiceNumber.trim(), prefix);
      return sequence === null ? max : Math.max(max, sequence);
    },
    Math.max(latestSequence, startingSequence - 1)
  );
  return `${prefix}${String(highest + 1).padStart(3, "0")}`;
}
