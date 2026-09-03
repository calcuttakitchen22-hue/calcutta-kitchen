import type { Invoice, InvoiceTotals } from "@/types/invoice";

const money = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;
export const itemAmount = (quantity: number, rate: number) =>
  money(Math.max(0, quantity || 0) * Math.max(0, rate || 0));
export function calculateInvoiceTotals(invoice: Invoice): InvoiceTotals {
  const subtotal = money(
    invoice.items.reduce(
      (sum, item) => sum + itemAmount(item.quantity, item.rate),
      0
    )
  );
  const requestedDiscount =
    invoice.discountType === "percentage"
      ? subtotal *
        (Math.min(100, Math.max(0, invoice.discountValue || 0)) / 100)
      : Math.max(0, invoice.discountValue || 0);
  const discount = money(Math.min(subtotal, requestedDiscount));
  const taxableAmount = money(subtotal - discount);
  const totalTax =
    invoice.taxMode === "none"
      ? 0
      : money(taxableAmount * (Math.max(0, invoice.gstRate || 0) / 100));
  const cgst = invoice.taxMode === "cgst-sgst" ? money(totalTax / 2) : 0;
  const sgst = invoice.taxMode === "cgst-sgst" ? money(totalTax - cgst) : 0;
  const igst = invoice.taxMode === "igst" ? totalTax : 0;
  return {
    subtotal,
    discount,
    taxableAmount,
    cgst,
    sgst,
    igst,
    grandTotal: money(taxableAmount + cgst + sgst + igst),
  };
}
