import type { BusinessDetails, Invoice, PaymentDetails } from "@/types/invoice";
const KEYS = {
  business: "ck-invoice-business-v1",
  payment: "ck-invoice-payment-v1",
  invoices: "ck-invoices-v1",
  sequence: "ck-invoice-sequence-v1",
} as const;
function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
export const invoiceStorage = {
  getBusiness: (fallback: BusinessDetails) => read(KEYS.business, fallback),
  saveBusiness: (value: BusinessDetails) => write(KEYS.business, value),
  getPayment: (fallback: PaymentDetails) => read(KEYS.payment, fallback),
  savePayment: (value: PaymentDetails) => write(KEYS.payment, value),
  getInvoices: () => read<Invoice[]>(KEYS.invoices, []),
  getSequence: (fallback: number) => read<number>(KEYS.sequence, fallback),
  saveSequence: (value: number) => write(KEYS.sequence, value),
  saveInvoice(invoice: Invoice): Invoice[] {
    const invoices = this.getInvoices();
    if (
      invoices.some(
        saved =>
          saved.invoiceNumber === invoice.invoiceNumber &&
          saved.id !== invoice.id
      )
    )
      throw new Error("That invoice number is already in use.");
    const index = invoices.findIndex(saved => saved.id === invoice.id);
    if (index >= 0) invoices[index] = invoice;
    else invoices.unshift(invoice);
    write(KEYS.invoices, invoices);
    return invoices;
  },
  deleteInvoice(id: string): Invoice[] {
    const invoices = this.getInvoices().filter(invoice => invoice.id !== id);
    write(KEYS.invoices, invoices);
    return invoices;
  },
};
