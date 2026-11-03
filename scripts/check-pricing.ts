// Vérifie lib/pricing.ts contre les totaux de la grille papier 2026–2027.
// Lancer : npm run check:prix
import { TARIFS, palier, estimer, type NbChats, type Saison } from "../lib/pricing.ts";

const GRILLE: Record<string, number[]> = {
  basse1: [10,27,44,61,78,95,112,128,144,160,176,192,208,224,239,254,269,284,299,314,329,343,357,371,385,399,413,427],
  basse2: [16,44,72,100,128,156,184,210,236,262,288,314,340,366,390,414,438,462,486,510,534,556,578,600,622,644,666,688],
  basse3: [22,61,100,139,178,217,256,292,328,364,400,436,472,508,541,574,607,640,673,706,739,769,799,829,859,889,919,949],
  haute1: [14,34,54,74,94,114,134,153,172,191,210,229,248,267,285,303,321,339,357,375,393,410,427,444,461,478,495,512],
  haute2: [24,58,92,126,160,194,228,260,292,324,356,388,420,452,482,512,542,572,602,632,662,690,718,746,774,802,830,858],
  haute3: [30,78,126,174,222,270,318,363,408,453,498,543,588,633,675,717,759,801,843,885,927,966,1005,1044,1083,1122,1161,1200],
};

let erreurs = 0;
for (const [cle, totaux] of Object.entries(GRILLE)) {
  const s = cle.slice(0, 5) as Saison;
  const n = Number(cle[5]) as NbChats;
  let t = 0;
  totaux.forEach((attendu, i) => {
    t += TARIFS[s][n][palier(i + 1)];
    if (t !== attendu) { erreurs++; console.error(`${cle} jour ${i + 1} : ${t} au lieu de ${attendu}`); }
  });
}

// Cas de bout en bout
const cas: [Parameters<typeof estimer>[0], number | string][] = [
  [{ offre: "espaces", chats: 1, arrivee: "2026-11-14", depart: "2026-11-20" }, 112],
  [{ offre: "chato", chats: 1, arrivee: "2026-11-14", depart: "2026-11-20" }, 70],
  [{ offre: "chato", chats: 2, arrivee: "2026-11-14", depart: "2026-11-20" }, 140],
  [{ offre: "espaces", chats: 1, arrivee: "2027-08-01", depart: "2027-08-07" }, 134], // haute saison, sans férié
  [{ offre: "chato", chats: 1, arrivee: "2027-06-28", depart: "2027-07-03" }, "chato-ete"],
  [{ offre: "espaces", chats: 1, arrivee: "2026-12-24", depart: "2026-12-26" }, 10 + 25 + 17], // 25 décembre
  [{ offre: "espaces", chats: 1, arrivee: "2026-11-10", depart: "2026-11-12" }, 10 + 17 + 5 + 17], // 11 novembre férié
];
for (const [p, attendu] of cas) {
  const r = estimer(p);
  const obtenu = r.ok ? r.total : r.raison;
  if (obtenu !== attendu) { erreurs++; console.error("Cas", p, "→", obtenu, "au lieu de", attendu); }
}

if (erreurs) { console.error(`${erreurs} écart(s)`); process.exit(1); }
console.log("OK : 168 totaux de la grille + 7 cas de bout en bout");
