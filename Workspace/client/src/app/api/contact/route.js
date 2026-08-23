import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "../_lib/rateLimit";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 16_384;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CALLING_CODE_PATTERN = /^\+[1-9]\d{0,2}$/;
const PHONE_PATTERN = /^[1-9]\d{4,13}$/;

function escapeHtml(value) {
  if (typeof value !== "string") return "";
  return value
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

function hasHeaderControlChars(value) {
  return /[\u0000-\u001F\u007F]/.test(value);
}

function buildEmailBody({ name, email, phone, message }) {
  const text = [message, "", "---", `Name: ${name}`, `E-Mail: ${email}`, `Telefon: ${phone}`].join("\n");
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; line-height: 1.5;">
  <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  <hr style="border: none; border-top: 1px solid #eee;">
  <p><strong>Name:</strong> ${escapeHtml(name)}<br>
  <strong>E-Mail:</strong> ${escapeHtml(email)}<br>
  <strong>Telefon:</strong> ${escapeHtml(phone)}</p>
</body>
</html>`;
  return { text, html };
}

export async function POST(request) {
  try {
    const limiter = checkRateLimit({
      key: `contact:${getClientIp(request)}`,
      limit: 6,
      windowMs: 60_000,
    });
    if (!limiter.allowed) {
      return Response.json(
        { error: "Zu viele Anfragen. Bitte kurz warten und erneut versuchen." },
        { status: 429 }
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return Response.json({ error: "Die Anfrage ist zu groß." }, { status: 413 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_REQUEST_BYTES) {
      return Response.json({ error: "Die Anfrage ist zu groß." }, { status: 413 });
    }

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const name = sanitize(body.name, 100);
    const email = String(body.email ?? "").trim().toLowerCase();
    const callingCode = String(body.callingCode ?? "").trim();
    const phoneDigits = String(body.phone ?? "").trim();
    const phone = `${callingCode}${phoneDigits}`;
    const message = sanitize(body.message, 2000);

    if (!name || !email || !callingCode || !phoneDigits || !message) {
      return Response.json(
        { error: "Name, E-Mail, Telefonnummer und Nachricht sind erforderlich." },
        { status: 400 }
      );
    }
    if (email.length > 255 || !EMAIL_PATTERN.test(email)) {
      return Response.json(
        { error: "Bitte eine gültige E-Mail-Adresse angeben." },
        { status: 400 }
      );
    }
    if (
      !CALLING_CODE_PATTERN.test(callingCode)
      || !PHONE_PATTERN.test(phoneDigits)
      || phone.slice(1).length > 15
    ) {
      return Response.json(
        { error: "Bitte eine gültige Vorwahl und Telefonnummer ohne führende 0 angeben." },
        { status: 400 }
      );
    }
    if (hasHeaderControlChars(name) || hasHeaderControlChars(email) || hasUnsafeControlChars(message)) {
      return Response.json(
        { error: "Ungültige Zeichen in den Eingabefeldern." },
        { status: 400 }
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT);
    const smtpConfig = {
      host: process.env.SMTP_HOST,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      to: process.env.MAIL_TO,
      from: process.env.MAIL_FROM,
    };
    if (
      !smtpConfig.host
      || !Number.isInteger(smtpPort)
      || smtpPort < 1
      || smtpPort > 65_535
      || !smtpConfig.user
      || !smtpConfig.pass
      || !smtpConfig.to
      || !smtpConfig.from
    ) {
      console.error("Contact email is unavailable: SMTP configuration is incomplete.");
      return Response.json(
        { error: "E-Mail-Versand aktuell nicht verfügbar. Bitte später erneut versuchen." },
        { status: 503 }
      );
    }

    const { text, html } = buildEmailBody({ name, email, phone, message });
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpConfig.user, pass: smtpConfig.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transporter.sendMail({
      from: smtpConfig.from,
      to: smtpConfig.to,
      replyTo: email,
      subject: `Kontaktanfrage von ${name}`,
      text,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact request failed.", {
      name: err?.name,
      code: err?.code,
      command: err?.command,
      responseCode: err?.responseCode,
    });
    return Response.json(
      { error: "Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen." },
      { status: 500 }
    );
  }
}
