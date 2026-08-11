import type { Metadata } from "next";
import { FolioStory } from "./FolioStory";

export const metadata: Metadata = {
  title: "Folio VEFA — Le suivi acquéreur, sans la charge mentale",
  description:
    "Logiciel local pour centraliser les clients VEFA, préparer les appels de fonds et générer chaque courrier personnalisé sans exposer les données sensibles.",
};

export default function Home() {
  return <FolioStory />;
}

