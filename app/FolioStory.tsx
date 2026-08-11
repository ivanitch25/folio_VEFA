"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const stories = [
  {
    id: "priorites",
    number: "01",
    kicker: "Ma journée",
    title: "Commencez par les dossiers qui comptent.",
    body: "Folio calcule la situation de chaque client et remonte seulement les retards, écarts et informations manquantes. Les dossiers à jour restent silencieux.",
    proof: "143 dossiers à jour. Aucun contrôle manuel à refaire.",
    image: "/screens/dashboard.png",
    alt: "Tableau de bord réel de Folio VEFA affichant les dossiers prioritaires et les montants en attente",
  },
  {
    id: "client",
    number: "02",
    kicker: "Travail par client",
    title: "Une personne. Toute sa situation.",
    body: "Prix, appels, paiements, documents et prochaine action sont réunis au même endroit. Plus besoin de recouper un tableau, un dossier et une boîte mail.",
    proof: "Le solde et son origine se lisent en quelques secondes.",
    image: "/screens/client-detail.png",
    alt: "Fiche client réelle de Folio VEFA avec synthèse financière, historique et prochaine action",
  },
  {
    id: "publipostage",
    number: "03",
    kicker: "Publipostage local",
    title: "Un appel. Un document juste pour chaque client.",
    body: "Choisissez l’étape, le palier et les clients. Folio calcule chaque montant, injecte les bonnes informations et produit un PDF distinct, nommé et classé dans le bon dossier.",
    proof: "Les dossiers incomplets sont isolés, sans bloquer les autres.",
    image: "/screens/publipostage.png",
    alt: "Écran réel de publipostage Folio VEFA avec sélection des clients et contrôle avant génération",
  },
  {
    id: "local",
    number: "04",
    kicker: "Confidentialité",
    title: "Les données ne prennent jamais le chemin du site web.",
    body: "La démo web permet d’essayer les parcours avec des données fictives et temporaires. Le logiciel métier, lui, s’installe sur le poste du comptable et conserve clients, montants, documents et sauvegardes dans son environnement local.",
    proof: "Démo sans données réelles. Produit métier sans base clients distante.",
    image: "/screens/confidentialite.png",
    alt: "Écran réel des paramètres de confidentialité et de stockage local de Folio VEFA",
  },
];

function Mark() {
  return <span className="folio-mark" aria-hidden="true">F</span>;
}

function ProductFrame({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="product-frame">
      <div className="product-frame__bar">
        <span /><span /><span />
        <em>Écran réel · données de démonstration</em>
      </div>
      <Image src={src} alt={alt} width={1280} height={720} priority={eager} unoptimized />
    </div>
  );
}

export function FolioStory() {
  const [activeStory, setActiveStory] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: .35 });
  const heroY = useTransform(scrollYProgress, [0, .13], [0, reduceMotion ? 0 : 90]);
  const heroScale = useTransform(scrollYProgress, [0, .13], [1, reduceMotion ? 1 : .95]);

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="site-header">
        <a className="wordmark" href="#haut" aria-label="Folio VEFA, accueil"><Mark /><span>Folio <b>VEFA</b></span></a>
        <nav aria-label="Navigation principale">
          <a href="#parcours">Le quotidien</a>
          <a href="#confidentialite">Confidentialité</a>
          <a href="#vision">La promesse</a>
        </nav>
        <a className="nav-cta" href="/demo">Essayer la démo <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="haut">
        <motion.div className="hero__copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>
          <div className="hero__eyebrow"><span>Conçu avec le métier</span><i />Logiciel local pour comptables VEFA</div>
          <h1>Moins de dossiers à fouiller.<br /><em>Plus de travail déjà prêt.</em></h1>
          <p>Folio réunit chaque client, prépare ses appels de fonds et génère ses courriers personnalisés — sans envoyer ses données sensibles sur le web.</p>
          <div className="hero__actions"><a className="primary-link" href="/demo">Manipuler le logiciel <span aria-hidden="true">↗</span></a><a className="text-link" href="#parcours">Voir le parcours <span aria-hidden="true">↓</span></a><span className="local-proof"><i />Démo fictive · produit réel en local</span></div>
        </motion.div>
        <motion.div className="hero__product" style={{ y: heroY, scale: heroScale }} initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .9, ease: [0.16, 1, 0.3, 1] }}>
          <ProductFrame src="/screens/dashboard.png" alt={stories[0].alt} eager />
          <span className="hero__annotation hero__annotation--left">Seulement 4 dossiers à traiter</span>
          <span className="hero__annotation hero__annotation--right">143 dossiers silencieux</span>
        </motion.div>
      </section>

      <section className="manifesto" id="vision">
        <span className="section-index">00 — La conviction</span>
        <p>Le temps ne se perd pas seulement dans les cas difficiles.</p>
        <h2>Il se perd dans les mêmes gestes, répétés client après client.</h2>
        <div className="manifesto__line"><span>chercher</span><i /><span>copier</span><i /><span>calculer</span><i /><span>renommer</span><i /><span>classer</span></div>
        <p className="manifesto__answer">Folio prépare cette mécanique. Le comptable garde le contrôle.</p>
      </section>

      <section className="story" id="parcours">
        <div className="story__intro"><span className="section-index">01 — Le parcours réel</span><h2>Quatre écrans.<br />Une journée plus légère.</h2><p>Faites défiler, puis ouvrez la démo : chaque écran montré ici appartient au logiciel fonctionnel.</p></div>
        <div className="story__grid">
          <div className="story__copy">
            {stories.map((item, index) => (
              <motion.article
                className={`story-step ${activeStory === index ? "story-step--active" : ""}`}
                key={item.id}
                onViewportEnter={() => setActiveStory(index)}
                viewport={{ amount: .55 }}
              >
                <span className="story-step__number">{item.number}</span>
                <div><span className="story-step__kicker">{item.kicker}</span><h3>{item.title}</h3><p>{item.body}</p><strong><i />{item.proof}</strong></div>
              </motion.article>
            ))}
          </div>
          <div className="story__sticky" aria-live="polite">
            <div className="story__screen">
              <AnimatePresence mode="wait">
                <motion.div key={stories[activeStory].id} initial={{ opacity: 0, y: 22, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -14, scale: .99 }} transition={{ duration: reduceMotion ? 0 : .45, ease: [0.16, 1, 0.3, 1] }}>
                  <ProductFrame src={stories[activeStory].image} alt={stories[activeStory].alt} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="story__counter"><span>0{activeStory + 1}</span><i>{stories.map((_, index) => <b className={index <= activeStory ? "active" : ""} key={index} />)}</i><span>04</span></div>
          </div>
        </div>
      </section>

      <section className="privacy" id="confidentialite">
        <div className="privacy__headline"><span className="section-index">02 — La frontière</span><h2>Le site vous présente Folio.<br /><em>Il ne voit jamais vos clients.</em></h2></div>
        <div className="privacy__split">
          <article><span className="privacy__label">Ici, sur le site public</span><h3>Une démo isolée.</h3><ul><li>Parcours interactifs du logiciel</li><li>Données entièrement fictives</li><li>Aucune conservation après la visite</li></ul><small>Aucune donnée client réelle · aucune base métier</small></article>
          <div className="privacy__divider"><span>≠</span></div>
          <article className="privacy__local"><span className="privacy__label">Là, sur le poste du comptable</span><h3>Le vrai travail, en local.</h3><ul><li>Clients, lots et montants</li><li>Appels, paiements et documents</li><li>Sauvegardes choisies par l’utilisateur</li></ul><small><i />Fonctionne sans connexion Internet</small></article>
        </div>
      </section>

      <section className="outcome">
        <span className="section-index">03 — Ce qui change</span>
        <div className="outcome__grid"><h2>Moins de clics.<br />Moins de doutes.<br /><em>Moins de choses à garder en tête.</em></h2><div className="outcome__list"><div><b>01</b><span><strong>Une seule source</strong><small>La fiche client remplace la chasse aux informations.</small></span></div><div><b>02</b><span><strong>Une seule validation</strong><small>Le publipostage prépare chaque document sans copier-coller.</small></span></div><div><b>03</b><span><strong>Une seule liste</strong><small>Les exceptions viennent au comptable, pas l’inverse.</small></span></div></div></div>
      </section>

      <section className="closing">
        <div className="closing__mark"><Mark /></div>
        <span>Folio VEFA</span>
        <h2>Le logiciel prépare.<br /><em>Vous décidez.</em></h2>
        <p>Un outil local, pensé autour de chaque client et des documents que vous devez réellement produire.</p>
        <a className="primary-link primary-link--light" href="/demo">Ouvrir la démo interactive <span aria-hidden="true">↗</span></a>
      </section>

      <footer><a className="wordmark wordmark--footer" href="#haut"><Mark /><span>Folio <b>VEFA</b></span></a><p>Logiciel local d’assistance comptable VEFA.</p><span>La démo utilise exclusivement des données fictives.</span></footer>
    </main>
  );
}
