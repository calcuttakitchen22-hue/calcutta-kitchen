export type InvoiceStatus = "Draft" | "Sent" | "Paid";
export type DiscountType = "percentage" | "fixed";
export type TaxMode = "none" | "cgst-sgst" | "igst";

export interface BusinessDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
  pan: string;
  logo: string;
}
export interface PaymentDetails {
  accountHolder: string;
  bankName: string;
  branch?: string;
  accountNumber: string;
  ifsc: string;
  upiId: string;
  instructions: string;
}
export interface ClientDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
}
export interface InvoiceItem {
  id: string;
  description: string;
  postLink: string;
  product: string;
  recipe: string;
  quantity: number;
  rate: number;
}
export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  placeOfSupply: string;
  status: InvoiceStatus;
  business: BusinessDetails;
  payment: PaymentDetails;
  client: ClientDetails;
  items: InvoiceItem[];
  discountType: DiscountType;
  discountValue: number;
  taxMode: TaxMode;
  gstRate: number;
  paymentTerms: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
export interface InvoiceTotals {
  subtotal: number;
  discount: number;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  grandTotal: number;
}
