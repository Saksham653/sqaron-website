'use client';

/* `osht --stats`: the size of the OSHT backend, counted from its code. Each figure counts up once
 * when the strip comes into view (shown final straight away for reduced motion). */
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { STATS, STATS_AS_OF } from '@/lib/saksham';

const fmt = (v) => Math.round(v).toLocaleString('en-US');

function Count({ to, suffix = '', start }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return undefined; }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400 + Math.min(900, to / 12);
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      setV(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, start]);
  return <>{fmt(start ? v : 0)}{suffix}</>;
}

export default function Stats() {
  const box = useRef(null);
  const seen = useInView(box, { once: true, amount: 0.4 });
  return (
    <section className="sk-stats sk-wrap" aria-label="The OSHT backend in numbers" ref={box}>
      <div className="sk-term">
        <div className="sk-term__bar"><span className="sk-dots"><i /><i /><i /></span><span>osht --stats</span><span className="sk-term__hint">counted from the code · {STATS_AS_OF}</span></div>
        <ul className="sk-stats__grid">
          {STATS.map((s) => (
            <li className="sk-stats__item" key={s.label} aria-label={`${fmt(s.n)}${s.suffix || ''} ${s.label}, ${s.note}`}>
              <span className="sk-stats__n" aria-hidden="true"><Count to={s.n} suffix={s.suffix} start={seen} /></span>
              <span className="sk-stats__label" aria-hidden="true">{s.label}</span>
              <span className="sk-stats__note" aria-hidden="true">{s.note}</span>
            </li>
          ))}
        </ul>
        <p className="sk-stats__asof">counted from the code · {STATS_AS_OF}</p>
      </div>
    </section>
  );
}
