import type { Metadata } from "next";
import { RoutePortal, RouteTransitionLink } from "../RouteTransition";

export const metadata: Metadata = {
  title: "Démo interactive",
  description: "Manipulez Folio VEFA avec des données entièrement fictives. Le logiciel métier et ses données réelles restent installés en local.",
};

export default function DemoPage() {
  return (
    <main className="demo-page">
      <RoutePortal href="/" side="left" eyebrow="Retour" label="Site vitrine" />
      <header className="demo-topbar">
        <RouteTransitionLink className="demo-topbar__back" href="/" side="left">← Revenir à la présentation</RouteTransitionLink>
        <div className="demo-topbar__message"><i />Vous manipulez une simulation : aucune donnée saisie ici n’est conservée.</div>
        <span className="demo-topbar__badge">Données 100 % fictives</span>
      </header>
      <section className="demo-stage" aria-label="Démonstration interactive de Folio VEFA">
        <iframe
          src="/demo-app/index.html"
          title="Folio VEFA — démonstration interactive"
          loading="eager"
        />
      </section>
    </main>
  );
}
