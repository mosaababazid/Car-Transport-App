const MAIL_TO = process.env.MAIL_TO || "anfrage@automove-logistik.de";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM || "AutoMove Logistik <onboarding@resend.dev>";

function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailBody({ name, email, phone, message }) {
  const lines = [
    message,
    "",
    "---",
    `Name: ${escapeHtml(name)}`,
    `E-Mail: ${escapeHtml(email)}`,
    `Telefon: ${phone ? escapeHtml(phone) : "–"}`,
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
  <strong>Telefon:</strong> ${phone ? escapeHtml(phone) : "–"}</p>
</body>
</html>`;
  return { text, html };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim() || "";
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, E-Mail und Nachricht sind erforderlich." },
        { status: 400 }
      );
    }

    if (!RESEND_API_KEY) {
      return Response.json(
        {
          error:
            "E-Mail-Versand ist nicht konfiguriert. Bitte RESEND_API_KEY in der Umgebung setzen.",
        },
        { status: 503 }
      );
    }

    const { text, html } = buildEmailBody({ name, email, phone, message });
    const subject = `Kontaktanfrage von ${name}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        subject,
        text,
        html,
      }),
    });

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
    console.error("contact API error:", err);
    return Response.json(
      { error: "Die Anfrage konnte nicht verarbeitet werden." },
      { status: 500 }
    );
  }
}
