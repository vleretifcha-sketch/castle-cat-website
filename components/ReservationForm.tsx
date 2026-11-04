"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { estimer, formatEuro, OFFRES, type NbChats, type Offre } from "@/lib/pricing";
import { site } from "@/lib/site";

type Service = "pension" | "domicile" | "croquettes" | "autre";

const SERVICES: { id: Service; label: string; submit: string }[] = [
  { id: "pension", label: "Pension féline", submit: "Envoyer ma demande de séjour" },
  { id: "domicile", label: "Visites ou balades", submit: "Envoyer ma demande" },
  { id: "croquettes", label: "Croquettes", submit: "Envoyer ma commande" },
  { id: "autre", label: "Autre question", submit: "Envoyer mon message" },
];

const PRODUITS = [
  "Entretien (chien, 20 kg)", "Energie (chien, 20 kg)", "Maintenance (chien, 20 kg)", "Vitalité (chien, 20 kg)",
  "Excellence (chien, 20 kg)", "Haute performance (chien, 20 kg)", "Digest + (chien, 20 kg)", "Starter chiots (20 kg)",
  "Chat stérilisé (3 kg)", "JMS chat adulte (10 kg)",
];

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

export function ReservationForm() {
  // Pré-remplissage depuis le simulateur : /reservation?service=pension&offre=…&chats=…&arrivee=…&depart=…
  const params = useSearchParams();
  const [service, setService] = useState<Service>(pick<Service>(params.get("service"), ["pension", "domicile", "croquettes", "autre"], "pension"));
  const [offre, setOffre] = useState<Offre>(pick<Offre>(params.get("offre"), ["chato", "espaces"], "espaces"));
  const [chats, setChats] = useState<number>(Math.min(3, Math.max(1, Number(params.get("chats")) || 1)));
  const [arrivee, setArrivee] = useState(params.get("arrivee") ?? "");
  const [depart, setDepart] = useState(params.get("depart") ?? "");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = SERVICES.find((s) => s.id === service)!;
  const r = estimer({ offre, chats: chats as NbChats, arrivee, depart });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    if (r?.ok) {
      data.set(
        "estimation",
        `${formatEuro(r.total)} · ${r.jours} jour(s) · ${r.saison} · ${formatEuro(r.moyenneJour)}/jour`,
      );
    }

    try {
      const res = await fetch("/api/devis", { method: "POST", body: data });
      const json = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(json?.error ?? "L’envoi a échoué. Réessayez ou appelez Sylvain.");
        return;
      }
      setSent(true);
    } catch {
      setError("Réseau indisponible. Réessayez ou appelez Sylvain.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-card bg-surface p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl">Demande envoyée, merci !</h2>
        <p className="text-ink-soft">
          Sylvain vous répond sous {site.responseDelay}. Pour une urgence, appelez le{" "}
          <a href={site.phoneHref}>{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 rounded-card bg-surface p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="service" className="text-sm font-medium">
          De quoi avez-vous besoin&nbsp;?
        </label>
        <select
          id="service"
          name="service"
          className="field"
          value={service}
          onChange={(e) => setService(e.target.value as Service)}
        >
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {service === "pension" && (
        <div className="flex flex-col gap-6">
          <input type="hidden" name="offre" value={offre} />
          <input type="hidden" name="chats" value={chats} />
          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 text-sm font-medium">L’offre</legend>
            <div role="radiogroup" aria-label="Offre" className="flex flex-col gap-2">
              {(Object.keys(OFFRES) as Offre[]).map((id) => {
                const selected = offre === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className="choice-card"
                    onClick={() => setOffre(id)}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-pill border-[1.5px] ${
                        selected ? "border-ink" : "border-line-strong"
                      }`}
                    >
                      {selected && <span className="size-2 rounded-pill bg-ink" />}
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-medium">{OFFRES[id].nom}</span>
                      <span className="text-[13px] leading-snug text-muted">{OFFRES[id].resume}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 text-sm font-medium">Nombre de chats</legend>
            <div role="group" aria-label="Nombre de chats" className="segment-group">
              {([1, 2, 3] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  className="segment"
                  aria-pressed={chats === n}
                  onClick={() => setChats(n)}
                >
                  {n}
                  <span className="sr-only"> {n === 1 ? "chat" : "chats"}</span>
                  <span aria-hidden="true" className="ml-1 hidden sm:inline">
                    {n === 1 ? "chat" : "chats"}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[13px] text-muted">4 chats ou plus : sur devis.</p>
          </fieldset>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-[1_1_220px] flex-col gap-2">
              <label htmlFor="arrivee" className="text-sm font-medium">Arrivée <span aria-hidden="true">*</span></label>
              <input id="arrivee" name="arrivee" type="date" className="field" required value={arrivee} onChange={(e) => setArrivee(e.target.value)} />
            </div>
            <div className="flex flex-[1_1_220px] flex-col gap-2">
              <label htmlFor="depart" className="text-sm font-medium">Départ <span aria-hidden="true">*</span></label>
              <input id="depart" name="depart" type="date" className="field" required min={arrivee || undefined} value={depart} onChange={(e) => setDepart(e.target.value)} />
            </div>
          </div>

          {offre === "espaces" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="formule" className="text-sm font-medium">Formule souhaitée</label>
              <select id="formule" name="formule" className="field">
                <option>En liberté avec les copains</option>
                <option>Espace privatisé sur demande</option>
                <option>Je ne sais pas encore</option>
              </select>
            </div>
          )}

          <div aria-live="polite">
            {r && !r.ok && r.raison !== "dates-manquantes" && (
              <div role="status" className="flex flex-col gap-2.5 rounded-card border border-line bg-canvas p-5">
                <p className="font-medium">{r.titre}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{r.message}</p>
                {r.raison === "chato-ete" && (
                  <button type="button" className="toggle self-start" onClick={() => setOffre("espaces")}>
                    Passer sur {OFFRES.espaces.nom}
                  </button>
                )}
              </div>
            )}
            {r?.ok && (
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 rounded-card bg-mist p-5">
                <p className="text-sm text-ink-soft">
                  Estimation · {OFFRES[offre].nom} · {chats === 1 ? "1 chat" : `${chats} chats`} · {r.jours} {r.jours > 1 ? "jours" : "jour"} · {r.saison}
                </p>
                <p className="font-display text-5xl leading-[0.9] font-bold">{formatEuro(r.total)}</p>
                <p className="basis-full text-[13px] text-muted">Alimentation incluse. Prix confirmé par Sylvain avec la disponibilité.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="noms" className="text-sm font-medium">Nom(s) et âge de vos chats</label>
            <input id="noms" name="noms" type="text" className="field" placeholder="Ex. Moka, 4 ans" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="besoins" className="text-sm font-medium">Besoins particuliers</label>
            <textarea id="besoins" name="besoins" rows={3} className="field" placeholder="Traitement, régime, caractère…" />
          </div>
          <div className="flex items-center gap-2.5">
            <input id="taxi" name="taxi" type="checkbox" value="oui" className="size-6 accent-ink" />
            <label htmlFor="taxi" className="text-[15px]">J’aurai besoin du taxi animalier</label>
          </div>
        </div>
      )}

      {service === "domicile" && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-[1_1_220px] flex-col gap-2"><label htmlFor="debut" className="text-sm font-medium">Du</label><input id="debut" name="debut" type="date" className="field" /></div>
            <div className="flex flex-[1_1_220px] flex-col gap-2"><label htmlFor="fin" className="text-sm font-medium">Au</label><input id="fin" name="fin" type="date" className="field" /></div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-[1_1_220px] flex-col gap-2">
              <label htmlFor="animal" className="text-sm font-medium">Animal</label>
              <select id="animal" name="animal" className="field"><option>Chat</option><option>Chien</option><option>Lapin</option><option>Furet</option><option>Chinchilla</option><option>Autre</option></select>
            </div>
            <div className="flex flex-[1_1_220px] flex-col gap-2">
              <label htmlFor="passages" className="text-sm font-medium">Passages par jour</label>
              <select id="passages" name="passages" className="field"><option>1</option><option>2</option><option>3</option></select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="commune" className="text-sm font-medium">Votre commune</label>
            <input id="commune" name="commune" type="text" className="field" autoComplete="address-level2" />
            <p className="text-[13px] text-muted">Pour calculer la zone de déplacement.</p>
          </div>
        </div>
      )}

      {service === "croquettes" && (
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-[2_1_280px] flex-col gap-2">
            <label htmlFor="produit" className="text-sm font-medium">Produit</label>
            <select id="produit" name="produit" className="field">{PRODUITS.map((p) => <option key={p}>{p}</option>)}</select>
          </div>
          <div className="flex flex-[1_1_140px] flex-col gap-2">
            <label htmlFor="qte" className="text-sm font-medium">Nombre de sacs</label>
            <input id="qte" name="quantite" type="number" min={1} defaultValue={1} className="field" />
          </div>
          <div className="flex flex-[1_1_100%] flex-col gap-2">
            <label htmlFor="adresse" className="text-sm font-medium">Adresse de livraison</label>
            <input id="adresse" name="adresse" type="text" className="field" autoComplete="street-address" />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 border-t border-line pt-6">
        <p className="basis-full text-[13px] text-muted">Les champs marqués d’un * sont obligatoires.</p>
        <div className="flex flex-[1_1_220px] flex-col gap-2">
          <label htmlFor="nom" className="text-sm font-medium">Nom <span aria-hidden="true">*</span></label>
          <input id="nom" name="nom" type="text" className="field" autoComplete="name" required />
        </div>
        <div className="flex flex-[1_1_220px] flex-col gap-2">
          <label htmlFor="tel" className="text-sm font-medium">Téléphone <span aria-hidden="true">*</span></label>
          <input id="tel" name="telephone" type="tel" className="field" autoComplete="tel" required />
        </div>
        <div className="flex basis-full flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" className="field" autoComplete="email" required />
        </div>
        <div className="flex basis-full flex-col gap-2">
          <label htmlFor="msg" className="text-sm font-medium">Message (facultatif)</label>
          <textarea id="msg" name="message" rows={3} className="field" />
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-card border border-line bg-canvas px-4 py-3 text-[15px] text-ink-soft">
          {error}
        </p>
      )}

      {/* TODO : anti-spam invisible (ex. Cloudflare Turnstile) */}
      <button type="submit" className="btn btn-primary self-start" disabled={sending}>
        {sending ? "Envoi en cours…" : current.submit}
      </button>
    </form>
  );
}
