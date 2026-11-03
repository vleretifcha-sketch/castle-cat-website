"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { estimer, formatEuro, OFFRES, PALIERS, TARIFS, type NbChats, type Offre } from "@/lib/pricing";

function useSimulatorState() {
  const [offre, setOffre] = useState<Offre>("espaces");
  const [chats, setChats] = useState<NbChats>(1);
  const [arrivee, setArrivee] = useState("");
  const [depart, setDepart] = useState("");

  const r = estimer({ offre, chats, arrivee, depart });
  const catsLabel = chats === 1 ? "1 chat" : `${chats} chats`;
  const reservationHref = `/reservation?${new URLSearchParams({
    service: "pension",
    offre,
    chats: String(chats),
    arrivee,
    depart,
  }).toString()}`;

  return {
    offre,
    setOffre,
    chats,
    setChats,
    arrivee,
    setArrivee,
    depart,
    setDepart,
    r,
    catsLabel,
    reservationHref,
  };
}

type SimState = ReturnType<typeof useSimulatorState>;

function SimulatorForm({
  state,
  idPrefix,
  compact = false,
}: {
  state: SimState;
  idPrefix: string;
  compact?: boolean;
}) {
  const { offre, setOffre, chats, setChats, arrivee, setArrivee, depart, setDepart, r, catsLabel, reservationHref } =
    state;

  return (
    <div className={`flex min-w-0 flex-col gap-6 ${compact ? "" : "rounded-card bg-surface p-6 md:p-8"}`}>
      {!compact && <h3 className="text-3xl">Calculez votre séjour</h3>}

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-sm font-medium text-ink-soft">1. L’offre</legend>
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
        <legend className="mb-2.5 text-sm font-medium text-ink-soft">2. Nombre de chats</legend>
        <div role="group" aria-label="Nombre de chats" className="segment-group">
          {([1, 2, 3] as NbChats[]).map((n) => (
            <button
              key={n}
              type="button"
              className="segment"
              aria-pressed={chats === n}
              onClick={() => setChats(n)}
            >
              {n === 1 ? "1" : n}
              <span className="sr-only"> {n === 1 ? "chat" : "chats"}</span>
              <span aria-hidden="true" className="ml-1 hidden sm:inline">
                {n === 1 ? "chat" : "chats"}
              </span>
            </button>
          ))}
        </div>
        <p className="text-[13px] text-muted">4 chats ou plus : sur devis.</p>
      </fieldset>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-sm font-medium text-ink-soft">3. Vos dates</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={`${idPrefix}-arrivee`} className="text-sm">
              Arrivée
            </label>
            <input
              id={`${idPrefix}-arrivee`}
              type="date"
              className="field max-w-full"
              value={arrivee}
              onChange={(e) => setArrivee(e.target.value)}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={`${idPrefix}-depart`} className="text-sm">
              Départ
            </label>
            <input
              id={`${idPrefix}-depart`}
              type="date"
              className="field max-w-full"
              value={depart}
              min={arrivee || undefined}
              onChange={(e) => setDepart(e.target.value)}
            />
          </div>
        </div>
        <p className="text-[13px] text-muted">
          Jours d’arrivée et de départ inclus. La saison est appliquée automatiquement.
        </p>
      </fieldset>

      <div aria-live="polite" className="flex flex-col gap-6">
        {!r.ok && (
          <div role="status" className="flex flex-col gap-3 rounded-card border border-line bg-canvas p-5">
            <p className="font-medium">{r.titre}</p>
            <p className="text-[15px] leading-relaxed text-ink-soft">{r.message}</p>
            {r.raison === "chato-ete" && (
              <button type="button" className="toggle self-start" onClick={() => setOffre("espaces")}>
                Voir avec {OFFRES.espaces.nom}
              </button>
            )}
          </div>
        )}

        {r.ok && (
          <div className="flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div className="flex min-w-0 flex-col gap-1.5">
              <p className="text-sm text-muted">
                {OFFRES[offre].nom} · {catsLabel} · {r.jours} {r.jours > 1 ? "jours" : "jour"} · {r.saison}
              </p>
              <p className="text-4xl font-medium tracking-tight break-words md:text-5xl">{formatEuro(r.total)}</p>
              <p className="text-sm text-muted">
                soit {formatEuro(r.moyenneJour)} / jour en moyenne · alimentation incluse
              </p>
              {(r.joursSpeciaux > 0 || r.supplementFeries > 0) && (
                <p className="text-sm text-ink-soft">
                  {[
                    r.joursSpeciaux > 0 && `${r.joursSpeciaux} jour(s) à tarif spécifique (25/12, 01/01)`,
                    r.supplementFeries > 0 && `dont ${formatEuro(r.supplementFeries)} de supplément jour férié`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
            <Link href={reservationHref} className="btn btn-primary w-full shrink-0 sm:w-auto">
              Réserver ce séjour
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function PricingAside({ state }: { state: SimState }) {
  const { offre, chats, catsLabel } = state;

  return (
    <div className="flex min-w-0 flex-col gap-4 overflow-hidden rounded-card bg-ink p-6 text-on-ink md:p-8">
      <h3 className="text-2xl text-on-ink">Comment le prix est calculé</h3>
      {offre === "chato" ? (
        <div className="flex flex-col gap-3 text-base leading-relaxed text-on-ink-muted">
          <p>
            <strong className="text-on-ink">10 € par jour et par chat</strong>, dès le premier jour et quelle que soit
            la durée.
          </p>
          <p>Disponible du 1er septembre au 30 juin.</p>
          <p>Exemple : 7 jours pour 1 chat = 70 €.</p>
        </div>
      ) : (
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-base text-on-ink-muted">Prix par jour pour {catsLabel}, selon la durée du séjour :</p>
          <div className="-mx-1 max-w-full overflow-x-auto overscroll-x-contain px-1" tabIndex={0} role="region" aria-label="Tarifs par durée">
            <table className="w-full min-w-[280px] border-collapse text-[14px] sm:text-[15px]">
              <thead>
                <tr className="border-b-[1.5px] border-on-ink">
                  <th scope="col" className="p-2 text-left font-medium">
                    Jour du séjour
                  </th>
                  <th scope="col" className="whitespace-nowrap p-2 text-right font-medium">
                    Basse
                  </th>
                  <th scope="col" className="whitespace-nowrap p-2 text-right font-medium">
                    Haute
                  </th>
                </tr>
              </thead>
              <tbody>
                {PALIERS.map((label, i) => (
                  <tr key={label} className="border-b border-on-ink/20">
                    <th scope="row" className="p-2 text-left font-normal">
                      {label}
                    </th>
                    <td className="whitespace-nowrap p-2 text-right">{TARIFS.basse[chats][i]} €</td>
                    <td className="whitespace-nowrap p-2 text-right">{TARIFS.haute[chats][i]} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-snug text-on-ink-muted">
            Basse saison : 1er septembre → 30 juin. Haute saison : 1er juillet → 31 août.
          </p>
        </div>
      )}
      <p className="border-t border-on-ink/20 pt-3.5 text-sm leading-snug text-on-ink-muted">
        25 décembre et 1er janvier : 25 € (1 chat), 41 € (2 chats), 57 € (3 chats). Autres jours fériés : + 5 €, + 8 € ou
        + 12 € selon le nombre de chats.
      </p>
    </div>
  );
}

export function PriceSimulator() {
  const state = useSimulatorState();
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#simulateur" && window.matchMedia("(max-width: 767px)").matches) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div id="simulateur" className="scroll-mt-40">
      {/* Mobile : card + ouverture en overlay */}
      <div className="md:hidden">
        <div className="flex flex-col gap-5 rounded-card bg-surface p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl">Calculez votre séjour</h3>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Choisissez l’offre, le nombre de chats et vos dates pour obtenir le prix.
            </p>
          </div>
          <button type="button" className="btn btn-primary w-full" onClick={() => setOpen(true)}>
            Ouvrir le simulateur
          </button>
        </div>
      </div>

      {/* Desktop : simulateur inline */}
      <div className="hidden flex-wrap items-stretch gap-6 md:flex">
        <div className="min-w-0 flex-[3_1_520px]">
          <SimulatorForm state={state} idPrefix="sim" />
        </div>
        <div className="min-w-0 flex-[2_1_340px]">
          <PricingAside state={state} />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Fermer le simulateur"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-x-0 bottom-0 top-10 flex max-h-[92dvh] w-full max-w-[100vw] flex-col overflow-hidden rounded-t-card bg-canvas"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line/60 px-4 py-3">
              <h3 id={titleId} className="min-w-0 truncate text-xl">
                Calculez votre séjour
              </h3>
              <button
                type="button"
                className="flex size-11 shrink-0 items-center justify-center rounded-control border-[1.5px] border-line-strong"
                aria-label="Fermer"
                onClick={() => setOpen(false)}
              >
                <Icon name="close" size={22} />
              </button>
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-6 overflow-x-hidden overflow-y-auto p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <SimulatorForm state={state} idPrefix="sim-modal" compact />
              <PricingAside state={state} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Grille complète, repliable, pour ceux qui veulent tout voir. */
export function FullPriceGrid() {
  return (
    <details className="rounded-card bg-surface px-6 py-5 md:px-8">
      <summary className="text-lg font-medium">Voir la grille complète des tarifs 2026–2027</summary>
      <div className="flex flex-col gap-4 pt-5">
        <p className="text-[15px] text-ink-soft">{OFFRES.espaces.nom} · prix par jour (€)</p>
        <div className="overflow-x-auto" role="region" aria-label="Grille complète des tarifs" tabIndex={0}>
          <table className="w-full min-w-[720px] border-collapse text-[15px]">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" rowSpan={2} className="p-2 text-left align-bottom font-medium">
                  Jour du séjour
                </th>
                <th scope="colgroup" colSpan={3} className="p-2 text-center font-medium">
                  Basse saison
                </th>
                <th scope="colgroup" colSpan={3} className="p-2 text-center font-medium">
                  Haute saison
                </th>
              </tr>
              <tr className="border-b-[1.5px] border-ink">
                {["basse", "haute"].flatMap((s) =>
                  [1, 2, 3].map((n) => (
                    <th key={`${s}${n}`} scope="col" className="p-2 text-right font-normal">
                      {n === 1 ? "1 chat" : `${n} chats`}
                    </th>
                  )),
                )}
              </tr>
            </thead>
            <tbody>
              {PALIERS.map((label, i) => (
                <tr key={label} className="border-b border-line">
                  <th scope="row" className="p-2 text-left font-normal">
                    {label}
                  </th>
                  {(["basse", "haute"] as const).flatMap((s) =>
                    ([1, 2, 3] as NbChats[]).map((n) => (
                      <td key={`${s}${n}`} className="p-2 text-right">
                        {TARIFS[s][n][i]}
                      </td>
                    )),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[15px] text-ink-soft">
          {OFFRES.chato.nom} · 10 € par jour et par chat, du 1er septembre au 30 juin.
        </p>
      </div>
    </details>
  );
}
