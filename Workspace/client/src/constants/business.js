const RAW_PHONE = process.env.NEXT_PUBLIC_PHONE || "+4917662581522";
const RAW_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || process.env.NEXT_PUBLIC_PHONE || "4917662581522";

export const BUSINESS = {
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Luxor Drive Automobile & Transport",
  owner: process.env.NEXT_PUBLIC_OWNER || "Mohammad Zin Al Rahmoun",
  phone: RAW_PHONE,
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+49 176 62581522",
  whatsapp: RAW_WHATSAPP.replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_EMAIL || "anfrage@luxordrive-logistik.de",
  street: process.env.NEXT_PUBLIC_STREET || "Linxweilerstr. 36",
  city: process.env.NEXT_PUBLIC_CITY || "St. Wendel",
  postalCode: process.env.NEXT_PUBLIC_POSTAL || "66606",
  country: "Deutschland",
  taxNumber: process.env.NEXT_PUBLIC_TAX_NUMBER || "060/200/07492",
  vatId: process.env.NEXT_PUBLIC_VAT_ID || "",
  responsible: process.env.NEXT_PUBLIC_RESPONSIBLE || "Mohammad Zin Al Rahmoun",
};

export const whatsappUrl = (number) =>
  `https://wa.me/${String(number).replace(/\D/g, "")}`;
