// Calcul du prix de la pension — grille « Castle Cat · Tarifs 2026–2027 ».
// Source unique utilisée par le simulateur, le formulaire et les tableaux.
// Vérifiée contre les 168 totaux de la grille : `npm run check:prix`.

export type Offre = "chato" | "espaces";
export type NbChats = 1 | 2 | 3;
export type Saison = "basse" | "haute";

export const OFFRES: Record<Offre, { nom: string; resume: string }> = {
  chato: {
    nom: "La vie de chat’ô",
    resume: "Espace partagé de 40 m² · 10 € / jour / chat · du 1er septembre au 30 juin",
  },
  espaces: {
    nom: "Les espaces de la pension",
    resume: "500 m², 4 zones et catio · tarif dégressif · toute l’année",
  },
};

/** La vie de chat'ô : prix fixe par jour et par chat, basse saison uniquement. */
export const CHATO_PRIX_JOUR = 10;

/** Les espaces : prix par jour selon le palier. Index = palier (voir PALIERS). */
export const TARIFS: Record<Saison, Record<NbChats, readonly number[]>> = {
  basse: { 1: [10, 17, 16, 15, 14, 13], 2: [16, 28, 26, 24, 22, 20], 3: [22, 39, 36, 33, 30, 30] },
  haute: { 1: [14, 20, 19, 18, 17, 16], 2: [24, 34, 32, 30, 28, 26], 3: [30, 48, 45, 42, 39, 36] },
};

export const PALIERS = [
  "1er jour",
  "Jours 2 à 7",
  "Jours 8 à 14",
  "Jours 15 à 21",
  "Jours 22 à 28",
  "Dès le 29e jour",
] as const;

/** 25 décembre et 1er janvier : prix fixe du jour. */
export const PRIX_JOUR_SPECIAL: Record<NbChats, number> = { 1: 25, 2: 41, 3: 57 };
/** Autres jours fériés : supplément par jour. */
export const SUPPLEMENT_FERIE: Record<NbChats, number> = { 1: 5, 2: 8, 3: 12 };

export const DUREE_MAX = 120;
const JOUR = 86_400_000;

export function palier(jour: number): number {
  if (jour === 1) return 0;
  if (jour <= 7) return 1;
  if (jour <= 14) return 2;
  if (jour <= 21) return 3;
  if (jour <= 28) return 4;
  return 5;
}

/** Haute saison : 1er juillet → 31 août. */
export function saisonDu(date: Date): Saison {
  const m = date.getUTCMonth();
  return m === 6 || m === 7 ? "haute" : "basse";
}

function paques(annee: number): number {
  const a = annee % 19, b = Math.floor(annee / 100), c = annee % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31);
  const jour = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(annee, mois - 1, jour);
}

/** Jours fériés français, hors 25/12 et 01/01 (traités à part). */
export function estFerie(t: number): boolean {
  const y = new Date(t).getUTCFullYear();
  const p = paques(y);
  return [
    Date.UTC(y, 4, 1), Date.UTC(y, 4, 8), Date.UTC(y, 6, 14), Date.UTC(y, 7, 15),
    Date.UTC(y, 10, 1), Date.UTC(y, 10, 11),
    p + JOUR, p + 39 * JOUR, p + 50 * JOUR, // lundi de Pâques, Ascension, lundi de Pentecôte
  ].includes(t);
}

function estJourSpecial(d: Date): boolean {
  const m = d.getUTCMonth(), j = d.getUTCDate();
  return (m === 11 && j === 25) || (m === 0 && j === 1);
}

/** "2026-11-14" → timestamp UTC, ou null. */
export function lireDate(iso: string | null | undefined): number | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const t = Date.UTC(y, m - 1, d);
  return Number.isNaN(t) ? null : t;
}

export type Estimation =
  | {
      ok: true;
      total: number;
      jours: number;
      joursBasse: number;
      joursHaute: number;
      joursSpeciaux: number;
      supplementFeries: number;
      saison: "basse saison" | "haute saison" | "basse + haute saison";
      moyenneJour: number;
    }
  | {
      ok: false;
      raison: "dates-manquantes" | "ordre-dates" | "trop-long" | "chato-ete";
      titre: string;
      message: string;
    };

export function estimer(params: {
  offre: Offre;
  chats: NbChats;
  arrivee: string | null | undefined;
  depart: string | null | undefined;
}): Estimation {
  const { offre, chats } = params;
  const a = lireDate(params.arrivee);
  const b = lireDate(params.depart);

  if (a === null || b === null) {
    return { ok: false, raison: "dates-manquantes", titre: "Indiquez vos dates", message: "Choisissez une date d’arrivée et une date de départ pour voir le prix." };
  }
  if (b < a) {
    return { ok: false, raison: "ordre-dates", titre: "La date de départ est avant l’arrivée", message: "Choisissez un départ le jour de l’arrivée ou après." };
  }
  const jours = Math.round((b - a) / JOUR) + 1; // arrivée et départ inclus
  if (jours > DUREE_MAX) {
    return { ok: false, raison: "trop-long", titre: `Séjour de plus de ${DUREE_MAX} jours`, message: "Pour un long séjour, contactez Sylvain : il vous fera un devis." };
  }

  let total = 0, joursBasse = 0, joursHaute = 0, joursSpeciaux = 0, supplementFeries = 0;
  for (let k = 1; k <= jours; k++) {
    const t = a + (k - 1) * JOUR;
    const d = new Date(t);
    const s = saisonDu(d);
    if (s === "haute") joursHaute++; else joursBasse++;

    if (estJourSpecial(d)) {
      joursSpeciaux++;
      total += PRIX_JOUR_SPECIAL[chats];
      continue;
    }
    total += offre === "chato" ? CHATO_PRIX_JOUR * chats : TARIFS[s][chats][palier(k)];
    if (estFerie(t)) {
      supplementFeries += SUPPLEMENT_FERIE[chats];
      total += SUPPLEMENT_FERIE[chats];
    }
  }

  if (offre === "chato" && joursHaute > 0) {
    return {
      ok: false,
      raison: "chato-ete",
      titre: "La vie de chat’ô n’est pas ouverte en été",
      message: `Votre séjour compte ${joursHaute} ${joursHaute > 1 ? "jours" : "jour"} entre le 1er juillet et le 31 août. Cette offre est disponible du 1er septembre au 30 juin.`,
    };
  }

  return {
    ok: true,
    total,
    jours,
    joursBasse,
    joursHaute,
    joursSpeciaux,
    supplementFeries,
    saison: joursHaute === 0 ? "basse saison" : joursBasse === 0 ? "haute saison" : "basse + haute saison",
    moyenneJour: Math.round((total / jours) * 10) / 10,
  };
}

export const formatEuro = (n: number) =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " €";
