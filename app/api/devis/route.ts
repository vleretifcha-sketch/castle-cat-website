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

/** Envoi via FormSubmit (pas de clé API — activation par e-mail au 1er envoi). */
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

  const payload: Record<string, string> = {
    _subject: `[Castle Cat] ${SERVICE_TITRES[service] ?? service} — ${nom}`,
    _replyto: email,
    _template: "table",
    _captcha: "false",
    Service: SERVICE_TITRES[service] ?? service,
  };

  for (const [keyName, label] of Object.entries(LABELS)) {
    if (keyName === "service") continue;
    const raw = form.get(keyName);
    if (raw == null) continue;
    if (keyName === "taxi") {
      const value = str(raw);
      payload[label] = value === "oui" || value === "on" ? "Oui" : "Non";
      continue;
    }
    const value = str(raw);
    if (!value) continue;
    payload[label] = value;
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => null)) as { success?: string; message?: string } | null;

    if (!res.ok) {
      console.error("[api/devis] FormSubmit", res.status, data);
      return NextResponse.json(
        { error: "L’envoi a échoué. Réessayez ou appelez Sylvain." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      // FormSubmit envoie un mail de confirmation au destinataire au tout premier envoi.
      hint: data?.message,
    });
  } catch (err) {
    console.error("[api/devis]", err);
    return NextResponse.json(
      { error: "L’envoi a échoué. Réessayez ou appelez Sylvain." },
      { status: 502 },
    );
  }
}
