'use client';

/* Page-wide state: smooth scrolling to a target, the in-page browser window, the brief that the
 * hero bar hands to the contact form, the founder sprites, and the custom cursor's label. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLenisInstance } from './SmoothScroll';
import { NEEDS, WHENS, BUDGETS } from '@/lib/site';

const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

export function SiteProvider({ children }) {
  const lenis = useLenisInstance();
  const [browser, setBrowser] = useState(null);
  const [brief, setBrief] = useState({ need: NEEDS[0], when: WHENS[0], budget: BUDGETS[0], nonce: 0 });
  const [characters, setCharacters] = useState(null);
  const cursorRef = useRef(null);

  const goTo = useCallback((target, { duration = 1.3, offset = 0, onComplete } = {}) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el == null) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (lenis) {
      lenis.scrollTo(el, { duration, offset, onComplete });
      return;
    }
    const top = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: calm ? 'auto' : 'smooth' });
    if (onComplete) setTimeout(onComplete, calm ? 0 : 800);
  }, [lenis]);

  // arriving from another page with a hash (/#contact): once the page has settled, glide to it
  const arrived = useRef(false);
  useEffect(() => {
    const id = window.location.hash;
    if (arrived.current || id.length < 2) return undefined;
    let el = null;
    try { el = document.querySelector(id); } catch { return undefined; }
    if (!el) return undefined;
    // pinned sections above it keep changing the page's height while it loads, so wait until the
    // height holds still, glide there, then check where it landed and correct once more
    let t = 0;
    let last = -1;
    let still = 0;
    let tries = 0;
    const off = () => Math.abs(el.getBoundingClientRect().top) > 40;
    const check = () => { if (off()) goTo(el, { duration: 0.6 }); };
    const wait = () => {
      const h = document.documentElement.scrollHeight;
      still = h === last ? still + 1 : 0;
      last = h;
      tries += 1;
      if (still < 3 && tries < 30) { t = setTimeout(wait, 200); return; }
      arrived.current = true;
      goTo(el, { duration: 1.1 });
      t = setTimeout(check, 1500);
    };
    t = setTimeout(wait, 300);
    return () => clearTimeout(t);
  }, [goTo]);

  // in-page anchors (#work, #contact...) glide with Lenis
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      const el = id.length > 1 && document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      goTo(el);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [goTo]);

  const setCursor = useCallback((text) => cursorRef.current && cursorRef.current.setLabel(text), []);
  const openSite = useCallback((project, origin) => setBrowser({ project, origin }), []);
  const closeSite = useCallback(() => setBrowser(null), []);

  const value = useMemo(() => ({
    lenis, goTo, browser, openSite, closeSite, brief, setBrief, characters, setCharacters, cursorRef, setCursor,
  }), [lenis, goTo, browser, openSite, closeSite, brief, characters, setCursor]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
