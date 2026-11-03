// Infos du site, utilisées par le header, le footer, le SEO et les données structurées.
// Les valeurs entre crochets sont à confirmer avec Sylvain.

export const site = {
  name: "Castle Cat",
  url: "https://www.castle-cat.fr", // TODO : remplacer par le vrai domaine (déjà réservé par Sylvain)
  owner: "Sylvain Pierredon",
  phone: "07 70 41 37 58",
  phoneHref: "tel:+33770413758",
  /** Lien WhatsApp (numéro international sans + ni espaces). */
  whatsappHref: "https://wa.me/33770413758",
  email: "sylvain.pierredon@gmail.com",
  address: {
    street: "38 rue Paul Salmon",
    postalCode: "44390",
    city: "Casson",
    region: "Loire-Atlantique",
  },
  /** Carte Google Maps (embed, sans clé API). */
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=38+Rue+Paul+Salmon,+44390+Casson,+France&hl=fr&z=16&output=embed",
  mapsLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=38+Rue+Paul+Salmon,+44390+Casson,+France",
  responseDelay: "24h",
  hours: [
    { label: "Lundi–vendredi", value: "9h30–18h" },
    { label: "Samedi", value: "9h30–12h30*" },
    { label: "Dimanche", value: "16h30–19h*" },
    { label: "Du 14/07 au 31/08", value: "tous les jours 8h–20h" },
  ],
  hoursNote: "*En dehors de ces horaires, sur demande uniquement.",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/[page]" },
    { label: "Instagram", href: "https://www.instagram.com/[compte]" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/cgv", label: "CGV" },
  ],
} as const;

export const nav = [
  { href: "/pension-chat-nantes", label: "La pension" },
  { href: "/extras", label: "Extras" },
  { href: "/a-propos", label: "À propos" },
] as const;

export const reassurance = [
  { title: "Formé ACACED et TAV", text: "Certifications officielles pour la garde et le transport d’animaux.", icon: "workspace_premium" },
  { title: "Expérimenté depuis 2016", text: "Chats, chiens et NAC, chez vous puis à la pension.", icon: "history" },
  { title: "Assuré en RC pro", text: "Votre animal est couvert pendant toute la garde.", icon: "verified_user" },
  { title: "Vigilance santé", text: "Un œil attentif chaque jour, et le vétérinaire si besoin.", icon: "monitor_heart" },
  { title: "Médicaments administrés", text: "Traitements et injections (diabète…) sans supplément.", icon: "vaccines" },
  { title: "Adapté à chaque profil", text: "Quels que soient l’âge, la race ou les habitudes.", icon: "pets" },
] as const;
