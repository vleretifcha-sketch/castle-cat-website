import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SplashLoader } from "@/components/SplashLoader";
import { site } from "@/lib/site";

const hero = localFont({
  src: "../fonts/GasoekOne-Regular.ttf",
  variable: "--font-hero-face",
  display: "swap",
  weight: "400",
});

const sans = localFont({
  src: [
    { path: "../fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Satoshi-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Italic.otf", weight: "400", style: "italic" },
    { path: "../fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/Satoshi-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../fonts/Satoshi-Black.otf", weight: "900", style: "normal" },
    { path: "../fonts/Satoshi-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-sans-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Pension pour chats près de Nantes | Castle Cat, Casson",
    template: "%s | Castle Cat",
  },
  description:
    "Pension pour chats à Casson, aux portes de Nantes : 500 m², 4 zones, un catio. Garde à domicile et croquettes. Dès 10 €/jour.",
  openGraph: { siteName: site.name, locale: "fr_FR", type: "website" },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: "Pension féline, garde d’animaux à domicile et livraison de croquettes.",
  url: site.url,
  telephone: "+33770413758",
  founder: site.owner,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: "FR",
  },
  areaServed: "Nantes et nord Loire-Atlantique",
  priceRange: "€",
  // TODO : ajouter openingHoursSpecification, image, geo et sameAs (réseaux, fiche Google)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${hero.variable} ${sans.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!sessionStorage.getItem("castle-cat-splash-seen")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("splash-pending")}catch(e){}`,
          }}
        />
        <SplashLoader />
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <JsonLd data={localBusiness} />
      </body>
    </html>
  );
}
