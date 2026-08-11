"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";

type Side = "left" | "right";

function useRouteChange(href: string, side: Side) {
  const [leaving, setLeaving] = useState(false);
  const reduceMotion = useReducedMotion();

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => window.location.assign(href), reduceMotion ? 20 : 520);
  };

  const overlay = (
    <AnimatePresence>
      {leaving && (
        <motion.div
          className={`route-wipe route-wipe--${side}`}
          initial={{ x: reduceMotion ? 0 : side === "right" ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : .52, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <span className="route-wipe__mark">F</span>
          <strong>{side === "right" ? "Entrée dans Folio" : "Retour à la présentation"}</strong>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { navigate, overlay };
}

export function RouteTransitionLink({ href, side, className, children }: { href: string; side: Side; className?: string; children: ReactNode }) {
  const { navigate, overlay } = useRouteChange(href, side);
  return <>{overlay}<a className={className} href={href} onClick={navigate}>{children}</a></>;
}

export function RoutePortal({ href, side, eyebrow, label }: { href: string; side: Side; eyebrow: string; label: string }) {
  const { navigate, overlay } = useRouteChange(href, side);
  return <>{overlay}<div className={`route-portal-shell route-portal-shell--${side}`}><motion.a className="route-portal" href={href} onClick={navigate} aria-label={label} whileHover={{ x: side === "right" ? -4 : 4 }} whileTap={{ scale: .96 }}><span className="route-portal__eyebrow">{eyebrow}</span><strong>{label}</strong><i aria-hidden="true">{side === "right" ? "→" : "←"}</i></motion.a></div></>;
}
