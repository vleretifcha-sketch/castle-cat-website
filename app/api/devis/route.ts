import { NextResponse } from "next/server";
import { site } from "@/lib/site";

const LABELS: Record<string, string> = {
  service: "Service",
  offre: "Offre",
  chats: "Nombre de chats",
  arrivee: "Arrivée",
  depart: "Départ",
  formule: "Formule",
  noms: "Chats",
  besoins: "Besoins particuliers",
  taxi: "Taxi animalier",
  debut: "Du",
  fin: "Au",
  animal: "Animal",
  passages: "Passages / jour",
  commune: "Commune",
  produit: "Produit",
  quantite: "Quantité",
  adresse: "Adresse de livraison",
  nom: "Nom",
  telephone: "Téléphone",
  email: "Email",
  message: "Message",
  estimation: "Estimation",
};

const SERVICE_TITRES: Record<string, string> = {
  pension: "Pension féline",
  domicile: "Visites ou balades",
  croquettes: "Croquettes",
  autre: "Autre question",
};

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Champs bruts (noms du formulaire) — requis par Formspree. */
function buildRawFields(form: FormData, service: string) {
  const fields: Record<string, string> = {
    service: SERVICE_TITRES[service] ?? service,
  };

  for (const keyName of Object.keys(LABELS)) {
    if (keyName === "service") continue;
    const raw = form.get(keyName);
    if (raw == null) continue;
    if (keyName === "taxi") {
      const value = str(raw);
      fields.taxi = value === "oui" || value === "on" ? "Oui" : "Non";
      continue;
    }
    const value = str(raw);
    if (!value) continue;
    fields[keyName] = value;
  }

  return fields;
}

/** Champs libellés FR — pour l’email Resend / FormSubmit. */
function buildLabeledFields(raw: Record<string, string>) {
  const labeled: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    labeled[LABELS[key] ?? key] = value;
  }
  return labeled;
}

/** Resend — optionnel (RESEND_API_KEY). */
async function sendWithResend(subject: string, replyTo: string, labeled: Record<string, string>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;

  const html = `
    <h2>${subject}</h2>
    <table>
      ${Object.entries(labeled)
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${v.replace(/</g, "&lt;")}</td></tr>`)
        .join("")}
    </table>
  `;

  const from = process.env.RESEND_FROM ?? "Castle Cat <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [site.email],
      reply_to: replyTo,
      subject,
      html,
      text: Object.entries(labeled)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n"),
    }),
    signal: AbortSignal.timeout(12_000),
  });

  if (!res.ok) {
    console.error("[api/devis] Resend", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

/** Formspree — envoi principal. */
const FORMSPREE_FORM_ID = process.env.FORMSPREE_FORM_ID ?? "mwllalkq";

async function sendWithFormspree(subject: string, replyTo: string, raw: Record<string, string>) {
  const id = FORMSPREE_FORM_ID;
  if (!id) return null;

  const res = await fetch(`https://formspree.io/f/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      email: replyTo,
      ...raw,
    }),
    signal: AbortSignal.timeout(12_000),
  });

  if (!res.ok) {
    console.error("[api/devis] Formspree", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

/** FormSubmit — secours si le service revient. */
async function sendWithFormSubmit(subject: string, replyTo: string, labeled: Record<string, string>) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: `${site.url}/reservation`,
        Origin: site.url,
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: replyTo,
        _template: "table",
        _captcha: "false",
        _url: `${site.url}/reservation`,
        ...labeled,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;

    if (!res.ok) {
      console.error("[api/devis] FormSubmit", res.status, data);
      return false;
    }

    if (data?.message && /activation|unable|whoops|not work/i.test(data.message)) {
      console.error("[api/devis] FormSubmit message", data.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[api/devis] FormSubmit", err);
    return false;
  }
}

/** Envoi de la demande par e-mail. */
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const nom = str(form.get("nom"));
  const telephone = str(form.get("telephone"));
  const email = str(form.get("email"));
  const service = str(form.get("service"));

  if (!nom || !telephone || !email || !service) {
    return NextResponse.json(
      { error: "Nom, téléphone, email et service sont obligatoires." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const subject = `[Castle Cat] ${SERVICE_TITRES[service] ?? service} — ${nom}`;
  const raw = buildRawFields(form, service);
  const labeled = buildLabeledFields(raw);

  const viaFormspree = await sendWithFormspree(subject, email, raw);
  if (viaFormspree === true) {
    return NextResponse.json({ ok: true, channel: "email" });
  }

  const viaResend = await sendWithResend(subject, email, labeled);
  if (viaResend === true) {
    return NextResponse.json({ ok: true, channel: "email" });
  }

  const viaFormSubmit = await sendWithFormSubmit(subject, email, labeled);
  if (viaFormSubmit) {
    return NextResponse.json({ ok: true, channel: "email" });
  }

  return NextResponse.json(
    {
      error: "L’envoi email a échoué. Réessayez ou appelez Sylvain.",
    },
    { status: 502 },
  );
}
