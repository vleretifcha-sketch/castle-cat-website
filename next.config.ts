import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // Masque le badge « N » Next.js en bas à gauche (souvent pris pour un logo).
  devIndicators: false,

  // Redirections 301 depuis l'ancien site « Monsieur l'Humain ».
  // CRITIQUE pour le SEO : une ligne par ancienne URL, à compléter
  // avec la liste fournie par Patrick (Clic-web).
  async redirects() {
    return [
      { source: "/livraison-croquettes", destination: "/extras", permanent: true },
      { source: "/garde-animaux-domicile", destination: "/extras", permanent: true },
      // { source: "/pension-feline", destination: "/pension-chat-nantes", permanent: true },
      // { source: "/contact", destination: "/reservation", permanent: true },
    ];
  },
};

export default nextConfig;
