# Castle Cat — site

Pension féline, garde à domicile et livraison de croquettes à Casson (44).
Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript. Hébergement prévu : Vercel.

Ce code reprend le wireframe validé : structure, contenus, simulateur de prix, formulaire,
accessibilité et SEO. Le style est volontairement neutre, à habiller via `STYLE.md`.

## Lancer

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de production
npm run check:prix   # vérifie le calcul contre les 168 totaux de la grille 2026–2027
```

## Appliquer le style dans Cursor

1. Remplir `STYLE.md` (couleurs, polices, rayons, ambiance).
2. Demander à Cursor : « Applique STYLE.md : mets à jour les tokens de `app/globals.css`, charge les polices avec next/font, puis ajuste les composants. »
3. Les règles du projet sont dans `.cursor/rules/castle-cat.mdc` (tokens obligatoires, accessibilité, SEO).

Tous les tokens sont dans le bloc `@theme` de `app/globals.css`. Chaque token devient une classe Tailwind :
`--color-ink` → `bg-ink`, `text-ink`, `border-ink`.

## Structure

```
app/
  layout.tsx                 Header, footer, lien d'évitement, données LocalBusiness
  globals.css                TOKENS DE STYLE + classes partagées (btn, toggle, field…)
  page.tsx                   Accueil (hero centré)
  pension-chat-nantes/       Pension : offres, simulateur, grille, FAQ (+ FAQPage)
  garde-animaux-domicile/    Visites et balades
  livraison-croquettes/      Gamme et prix
  a-propos/                  Sylvain, parcours, réassurance
  reservation/               Formulaire (pré-rempli depuis le simulateur)
  mentions-legales/          À compléter
  sitemap.ts, robots.ts
components/
  Header.tsx                 Menu + burger mobile, « Réserver » toujours visible
  Footer.tsx
  PriceSimulator.tsx         Simulateur + grille complète repliable
  ReservationForm.tsx        Formulaire multi-services
  ui.tsx                     Placeholder, PageHero, CtaBand, FaqItem, Eyebrow
lib/
  pricing.ts                 Grille tarifaire et calcul (source unique)
  site.ts                    Coordonnées, horaires, navigation, réassurance
scripts/check-pricing.ts     Test du calcul
```

## Avant la mise en ligne

- [ ] **Redirections 301** depuis l'ancien site Monsieur l'Humain (`next.config.ts`) — critique pour le SEO
- [ ] Vrai domaine dans `lib/site.ts`, email pro, liens réseaux
- [ ] Envoi du formulaire (`components/ReservationForm.tsx` → route API + Resend ou Formspree) et anti-spam (Turnstile)
- [ ] Photos : remplacer chaque `<Placeholder>` par `next/image` avec un `alt` descriptif
- [ ] Logo dans `Header.tsx`, favicon dans `app/icon.svg`
- [ ] Vrais avis Google sur l'accueil (ou supprimer la section)
- [ ] Contenus entre crochets : délai de réponse, prix du taxi au km, longueur de l'arbre à chat, noms des ambiances, communes desservies, diplôme CCAD/ACACED
- [ ] Mentions légales et RGPD
- [ ] Données LocalBusiness : horaires, image, coordonnées GPS, lien fiche Google
- [ ] Fiche Google Business Profile au nom de Castle Cat

## Calcul de la pension (rappel)

- **La vie de chat’ô** : 10 € / jour / chat, du 1er septembre au 30 juin uniquement.
- **Les espaces** : prix par jour selon le palier (1er jour, 2–7, 8–14, 15–21, 22–28, 29+) et la saison de chaque jour
  (haute = 1er juillet → 31 août). Un séjour à cheval sur deux saisons est calculé jour par jour.
- 25/12 et 01/01 : 25 / 41 / 57 €. Autres jours fériés : + 5 / 8 / 12 €.
- À confirmer avec Sylvain : la vie de chat’ô à 2–3 chats (10 € × chats), les jours spéciaux appliqués aux deux offres,
  3 chats en basse saison à 30 € dès le 29e jour.
