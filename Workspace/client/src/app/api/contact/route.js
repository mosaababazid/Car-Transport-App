import { checkRateLimit, getClientIp } from "../_lib/rateLimit";
import {
  formatInternationalPhone,
  getPhoneCountry,
  normalizePhoneDigits,
  validatePhoneForCountry,
} from "../../../constants/phoneCountries";

const MAIL_TO = process.env.MAIL_TO || "anfrage@automove-logistik.de";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM || "AutoMove Logistik <onboarding@resend.dev>";

function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function sanitize(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function hasUnsafeControlChars(value) {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value);
}

function buildEmailBody({ name, email, phone, phoneCountryLabel, message }) {
  const lines = [
    message,
    "",
    "---",
    `Name: ${escapeHtml(name)}`,
    `E-Mail: ${escapeHtml(email)}`,
    `Telefon: ${phone ? escapeHtml(phone) : "–"}`,
    `Land/Vorwahl: ${phoneCountryLabel ? escapeHtml(phoneCountryLabel) : "–"}`,
  ];
  const text = lines.join("\n");
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; line-height: 1.5;">
  <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  <hr style="border: none; border-top: 1px solid #eee;">
  <p><strong>Name:</strong> ${escapeHtml(name)}<br>
  <strong>E-Mail:</strong> ${escapeHtml(email)}<br>
  <strong>Telefon:</strong> ${phone ? escapeHtml(phone) : "–"}<br>
  <strong>Land/Vorwahl:</strong> ${phoneCountryLabel ? escapeHtml(phoneCountryLabel) : "–"}</p>
</body>
</html>`;
  return { text, html };
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const limiter = checkRateLimit({
      key: `contact:${ip}`,
      limit: 6,
      windowMs: 60_000,
    });
    if (!limiter.allowed) {
      return Response.json(
        { error: "Zu viele Anfragen. Bitte kurz warten und erneut versuchen." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 255).toLowerCase();
    const phoneCountry = sanitize(body.phoneCountry, 2).toUpperCase();
    const phoneDigits = normalizePhoneDigits(body.phoneDigits, 20);
    const phoneCountryMeta = getPhoneCountry(phoneCountry);
    const phone = formatInternationalPhone(phoneCountry, phoneDigits);
    const message = sanitize(body.message, 2000);

    if (!name || !email || !phoneDigits || !message || !phoneCountryMeta) {
      return Response.json(
        { error: "Name, E-Mail, Telefonnummer und Nachricht sind erforderlich." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Bitte eine gültige E-Mail-Adresse angeben." },
        { status: 400 }
      );
    }
    if (!validatePhoneForCountry(phoneCountry, phoneDigits)) {
      return Response.json(
        {
          error: `Bitte eine gültige Festnetz- oder Mobilnummer für ${phoneCountryMeta.name} angeben.`,
        },
        { status: 400 }
      );
    }
    if (hasUnsafeControlChars(name) || hasUnsafeControlChars(message)) {
      return Response.json(
        { error: "Ungültige Zeichen in den Eingabefeldern." },
        { status: 400 }
      );
    }

    if (!RESEND_API_KEY) {
      return Response.json(
        {
          error: "E-Mail-Versand aktuell nicht verfügbar. Bitte später erneut versuchen.",
        },
        { status: 503 }
      );
    }

    const { text, html } = buildEmailBody({
      name,
      email,
      phone,
      phoneCountryLabel: `${phoneCountryMeta.name} (${phoneCountryMeta.dialCode})`,
      message,
    });
    const subject = `Kontaktanfrage von ${name}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        subject,
        text,
        html,
      }),
    }).finally(() => clearTimeout(timeout));

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return Response.json(
        {
          error: data.message || "E-Mail konnte nicht gesendet werden.",
        },
        { status: res.status >= 500 ? 502 : 400 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: "Die Anfrage konnte nicht verarbeitet werden." },
      { status: 500 }
    );
  }
}
