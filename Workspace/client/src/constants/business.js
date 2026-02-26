const RAW_PHONE = process.env.NEXT_PUBLIC_PHONE || "+491234567890";
const RAW_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || process.env.NEXT_PUBLIC_PHONE || "491234567890";

export const BUSINESS = {
  phone: RAW_PHONE,
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || RAW_PHONE,
  whatsapp: RAW_WHATSAPP.replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_EMAIL || "anfrage@automove-logistik.de",
  street: process.env.NEXT_PUBLIC_STREET || "Beispielstraße 1",
  city: process.env.NEXT_PUBLIC_CITY || "Saarbrücken",
  postalCode: process.env.NEXT_PUBLIC_POSTAL || "66111",
  country: "Deutschland",
  vatId: process.env.NEXT_PUBLIC_VAT_ID || "[USt-IdNr.]",
  responsible: process.env.NEXT_PUBLIC_RESPONSIBLE || "[Name und Anschrift des Verantwortlichen]",
};

export const whatsappUrl = (number) =>
  `https://wa.me/${String(number).replace(/\D/g, "")}`;
