import { parsePhoneNumberFromString } from "libphonenumber-js/min";

export const DEFAULT_PHONE_COUNTRY = "DE";

export const PHONE_COUNTRIES = [
  // Germany first
  { iso: "DE", name: "Deutschland", dialCode: "+49", minLength: 5, maxLength: 15 },
  // EU countries
  { iso: "AT", name: "Oesterreich", dialCode: "+43", minLength: 5, maxLength: 15 },
  { iso: "BE", name: "Belgien", dialCode: "+32", minLength: 8, maxLength: 9 },
  { iso: "BG", name: "Bulgarien", dialCode: "+359", minLength: 7, maxLength: 9 },
  { iso: "HR", name: "Kroatien", dialCode: "+385", minLength: 8, maxLength: 9 },
  { iso: "CY", name: "Zypern", dialCode: "+357", minLength: 8, maxLength: 8 },
  { iso: "CZ", name: "Tschechien", dialCode: "+420", minLength: 9, maxLength: 9 },
  { iso: "DK", name: "Daenemark", dialCode: "+45", minLength: 8, maxLength: 8 },
  { iso: "EE", name: "Estland", dialCode: "+372", minLength: 7, maxLength: 8 },
  { iso: "FI", name: "Finnland", dialCode: "+358", minLength: 7, maxLength: 12 },
  { iso: "FR", name: "Frankreich", dialCode: "+33", minLength: 9, maxLength: 9 },
  { iso: "GR", name: "Griechenland", dialCode: "+30", minLength: 10, maxLength: 10 },
  { iso: "HU", name: "Ungarn", dialCode: "+36", minLength: 8, maxLength: 9 },
  { iso: "IE", name: "Irland", dialCode: "+353", minLength: 7, maxLength: 9 },
  { iso: "IT", name: "Italien", dialCode: "+39", minLength: 6, maxLength: 11 },
  { iso: "LV", name: "Lettland", dialCode: "+371", minLength: 8, maxLength: 8 },
  { iso: "LT", name: "Litauen", dialCode: "+370", minLength: 8, maxLength: 8 },
  { iso: "LU", name: "Luxemburg", dialCode: "+352", minLength: 4, maxLength: 11 },
  { iso: "MT", name: "Malta", dialCode: "+356", minLength: 8, maxLength: 8 },
  { iso: "NL", name: "Niederlande", dialCode: "+31", minLength: 9, maxLength: 9 },
  { iso: "PL", name: "Polen", dialCode: "+48", minLength: 9, maxLength: 9 },
  { iso: "PT", name: "Portugal", dialCode: "+351", minLength: 9, maxLength: 9 },
  { iso: "RO", name: "Rumänien", dialCode: "+40", minLength: 9, maxLength: 9 },
  { iso: "SK", name: "Slowakei", dialCode: "+421", minLength: 9, maxLength: 9 },
  { iso: "SI", name: "Slowenien", dialCode: "+386", minLength: 8, maxLength: 8 },
  { iso: "ES", name: "Spanien", dialCode: "+34", minLength: 9, maxLength: 9 },
  { iso: "SE", name: "Schweden", dialCode: "+46", minLength: 7, maxLength: 10 },
];

const PHONE_COUNTRY_BY_ISO = new Map(PHONE_COUNTRIES.map((country) => [country.iso, country]));

export function getPhoneCountry(iso) {
  return PHONE_COUNTRY_BY_ISO.get(String(iso || "").toUpperCase()) || null;
}

export function normalizePhoneDigits(value, maxLength = 20) {
  return String(value ?? "").replace(/\D+/g, "").slice(0, maxLength);
}

export function validatePhoneForCountry(iso, nationalDigits) {
  const country = getPhoneCountry(iso);
  if (!country) return false;
  const digits = normalizePhoneDigits(nationalDigits, 20);
  if (!digits) return false;

  const trimmedForIntl = digits.replace(/^0+/, "");
  if (!trimmedForIntl) return false;

  if (
    trimmedForIntl.length < country.minLength
    || trimmedForIntl.length > country.maxLength + 6 // allow extension tail
  ) {
    return false;
  }

  const directCandidate = `${country.dialCode}${trimmedForIntl}`;
  const parsedDirect = parsePhoneNumberFromString(directCandidate);
  if (parsedDirect?.country === country.iso && parsedDirect.isValid()) {
    return true;
  }

  // Extension-friendly fallback: treat trailing 1-6 digits as office extension.
  for (let extLength = 1; extLength <= 6; extLength += 1) {
    if (trimmedForIntl.length - extLength < country.minLength) break;
    const coreDigits = trimmedForIntl.slice(0, -extLength);
    const candidate = `${country.dialCode}${coreDigits}`;
    const parsed = parsePhoneNumberFromString(candidate);
    if (parsed?.country === country.iso && parsed.isValid()) {
      return true;
    }
  }

  // Fallback for local fixed-line patterns that can still be legitimate.
  return trimmedForIntl.length >= country.minLength
    && trimmedForIntl.length <= country.maxLength;
}

export function formatInternationalPhone(iso, nationalDigits) {
  const country = getPhoneCountry(iso);
  if (!country || !nationalDigits) return "";
  const trimmedForIntl = normalizePhoneDigits(nationalDigits, 20).replace(/^0+/, "");
  if (!trimmedForIntl) return "";
  return `${country.dialCode}${trimmedForIntl}`;
}
