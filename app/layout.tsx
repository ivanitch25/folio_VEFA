import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "folio-vefa.pages.dev";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const origin = `${protocol}://${host}`;
  const title = "Folio VEFA — Moins de dossiers à fouiller";
  const description = "Le logiciel local qui prépare les appels de fonds et les documents personnalisés, client par client.";
  return {
    metadataBase: new URL(origin),
    title: { default: "Folio VEFA", template: "%s · Folio VEFA" },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1730, height: 909, alt: "Folio VEFA — Moins de dossiers à fouiller, plus de travail déjà prêt" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
