'use client';

/* LUMIQ, Saksham's hero project, in the console style of his page: the real Android screens in a phone, and the
 * app's own sample answer checking its numbers one by one in a terminal. Facts and screens from the LUMIQ repo
 * (github.com/Saksham653/LUMIQ, 26 Nov 2026). Reduced motion: no auto-advance, the answer shows fully checked. */
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export const LUMIQ = {
  apk: 'https://github.com/Saksham653/LUMIQ/releases/download/android-v2.0.0/LUMIQ-2.0.0.apk',
  site: 'https://lumiq-android.vercel.app/',
  code: 'https://github.com/Saksham653/LUMIQ',
  film: 'https://lumiq-android.vercel.app/assets/video/lumiq-film.mp4',
  poster: 'https://lumiq-android.vercel.app/assets/video/poster.jpg',
};

const SCREENS = [
  ['welcome', 'start'], ['home', 'home'], ['answer', 'ask'], ['review', 'check'],
  ['story', 'story'], ['insights', 'insights'], ['share', 'share'], ['storydark', 'dark'],
];
const ANSWER = [['The highest total amount is Atta = '], ['17,385', 1], [', then Toor dal = '], ['9,240', 1], [' and Basmati rice = '], ['7,685', 1], ['. All other items have lower totals, ending with Candles = '], ['60', 1], ['.']];
const NUMS = ANSWER.filter((p) => p[1]).length;

export function LumiqPhone({ go }) {
  const calm = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (calm || !go) return undefined;
    const id = setInterval(() => setI((k) => (k + 1) % SCREENS.length), 2800);
    return () => clearInterval(id);
  }, [calm, go]);
  return (
    <div className="sk-lumiq__phonewrap">
      <div className="sk-lumiq__phone">
        {SCREENS.map(([key, label], k) => (
          <img key={key} src={`/assets/img/lumiq/${key}.webp`} alt={k === i ? `LUMIQ on Android: ${label}` : ''} width="600" height="1257"
            loading={k < 2 ? 'eager' : 'lazy'} style={{ opacity: k === i ? 1 : 0 }} />
        ))}
      </div>
      <div className="sk-lumiq__tabs" role="tablist" aria-label="LUMIQ screens">
        {SCREENS.map(([key, label], k) => (
          <button key={key} type="button" role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} onClick={() => setI(k)}>{label}</button>
        ))}
      </div>
    </div>
  );
}

export function LumiqAnswer({ go }) {
  const calm = useReducedMotion();
  const [n, setN] = useState(calm ? NUMS : 0);
  useEffect(() => {
    if (calm) { setN(NUMS); return undefined; }
    if (!go) return undefined;
    let k = 0;
    const id = setInterval(() => { k = (k + 1) % (NUMS + 4); setN(Math.min(k, NUMS)); }, 700);
    return () => clearInterval(id);
  }, [calm, go]);
  let seen = 0;
  return (
    <div className="sk-term sk-lumiq__ask">
      <div className="sk-term__bar"><span className="sk-dots"><i /><i /><i /></span><span>lumiq --ask</span><span className="sk-term__hint">sample file · shop sales · 607 rows</span></div>
      <div className="sk-lumiq__askbody">
        <p className="sk-lumiq__q"><span className="sk-ps">?</span>What is the total Amount by Item?</p>
        <p className="sk-lumiq__a">
          {ANSWER.map(([text, isNum], k) => {
            if (!isNum) return <span key={k}>{text}</span>;
            seen += 1;
            return <span key={k} className={`sk-lumiq__num${seen <= n ? ' is-ok' : ''}`}>{text}{seen <= n ? ' ✓' : ''}</span>;
          })}
        </p>
        <p className={`sk-lumiq__done${n >= NUMS ? ' is-on' : ''}`}><span aria-hidden="true">●</span> {n} of {NUMS} numbers checked on your phone</p>
      </div>
    </div>
  );
}

export function LumiqFilm({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="sk-lumiq__film" role="dialog" aria-modal="true" aria-label="LUMIQ launch film" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-lenis-prevent>
          <motion.div className="sk-lumiq__filmbox" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, opacity: 0 }}>
            <video src={LUMIQ.film} poster={LUMIQ.poster} controls autoPlay playsInline preload="metadata" />
          </motion.div>
          <button type="button" className="sk-btn sk-lumiq__close" onClick={onClose} aria-label="Close the film">close ✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
