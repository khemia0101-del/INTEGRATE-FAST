import { Resend } from "resend";

type EmailPayload = {
  subject: string;
  html: string;
};

export async function sendInternalNotification(payload: EmailPayload) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email skipped]", payload.subject);
    return { skipped: true };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.LEADS_TO_EMAIL ?? "info@integratefast.com";
  const from = process.env.FROM_EMAIL ?? "Integrate Fast <noreply@integratefast.com>";

  return resend.emails.send({
    from,
    to,
    subject: payload.subject,
    html: payload.html,
  });
}

export function rows(items: Record<string, unknown>) {
  return Object.entries(items)
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
      return `<tr><td style="padding:6px 12px;color:#64748b">${label}</td><td style="padding:6px 12px"><strong>${String(value ?? "")}</strong></td></tr>`;
    })
    .join("");
}
