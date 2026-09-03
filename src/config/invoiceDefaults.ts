import invoiceLogo from "@/assets/images/DP.png?url";

export const invoiceDefaults = {
  business: {
    name: "Calcutta Kitchen",
    address:
      "Vill: Brajamal, Haipur, Contai, Purba Medinipur, West Bengal - 721433",
    email: "calcuttakitchen22@gmail.com",
    contactNumber: "+91 7063640680",
    gstin: "",
    pan: "AOGPD3950A",
    logo: invoiceLogo,
  },
  invoice: {
    prefix: "CK-2026-",
    startingSequence: 27,
  },
  descriptions: [
    "Instagram Reel",
    "Instagram Story",
    "YouTube Video",
    "YouTube Short",
    "Facebook Reel",
    "Brand Collaboration",
    "Content Creation",
    "Other",
  ],
  payment: {
    accountHolderName: "Samar Das",
    bankName: "Punjab National Bank",
    branch: "Hatabari Branch",
    accountNumber: "0868010052100",
    ifsc: "PUNB0018220",
    upiId: "samardas22166-1@okicici",
    instructions: "",
  },
  paymentTerms: "Payment due within 15 days from the invoice date.",
  notes: "",
} as const;
