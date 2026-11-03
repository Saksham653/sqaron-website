'use client';

/* The OSHT system map: the field app, the office console and uploaded papers feed one API, which
 * leans on the books, the workers and the PDF engine. Every part is a button; picking one lights its
 * wires and shows what it does. The wires are drawn from the parts' measured positions, so the map
 * keeps its shape at any width; on phones it becomes a single column and the wires give way to arrows. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OSHT_PARTS } from '@/lib/saksham';

const EDGES = [
  ['app', 'api'], ['console', 'api'], ['papers', 'api'],
  ['api', 'books'], ['api', 'workers'], ['api', 'docs'],
  ['workers', 'books'],
];
const SIDES = [['in', 'Feeds the API'], ['mid', 'The core'], ['out', 'What it leans on']];

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function SystemMap() {
  const box = useRef(null);
  const svg = useRef(null);
  const nodes = useRef({});
  const [pick, setPick] = useState('api');
  const [wires, setWires] = useState(null);

  // draw each wire from the parts' real positions; redraw when the map changes size
  useIsoLayout(() => {
    const el = box.current;
    const measure = () => {
      const base = el.getBoundingClientRect();
      if (window.matchMedia('(max-width: 760px)').matches) { setWires({ w: base.width, h: base.height, paths: [] }); return; }
      const at = (id) => {
        const r = nodes.current[id].getBoundingClientRect();
        return { l: r.left - base.left, r: r.right - base.left, y: r.top - base.top + r.height / 2 };
      };
      const paths = EDGES.map(([a, b]) => {
        const p = at(a), q = at(b);
        let d;
        if (Math.abs(p.r - q.r) < 2) {
          // two parts in the same column: loop round their outer edge
          d = `M${p.r} ${p.y} C ${p.r + 46} ${p.y}, ${q.r + 46} ${q.y}, ${q.r} ${q.y}`;
        } else {
          const dx = Math.max(30, (q.l - p.r) * 0.5);
          d = `M${p.r} ${p.y} C ${p.r + dx} ${p.y}, ${q.l - dx} ${q.y}, ${q.l} ${q.y}`;
        }
        return { id: `skw-${a}-${b}`, a, b, d };
      });
      setWires({ w: base.width, h: base.height, paths });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && svg.current && svg.current.pauseAnimations) svg.current.pauseAnimations();
  }, [wires]);

  const part = OSHT_PARTS.find((p) => p.id === pick);
  const lit = (w) => w.a === pick || w.b === pick;

  return (
    <div className="sk-map">
      <div className="sk-map__stage" ref={box}>
        {wires && wires.paths.length > 0 && (
          <svg ref={svg} className="sk-map__wires" width={wires.w} height={wires.h} viewBox={`0 0 ${wires.w} ${wires.h}`} aria-hidden="true">
            {wires.paths.map((w) => <path key={w.id} id={w.id} d={w.d} className={`sk-map__wire${lit(w) ? ' is-on' : ''}`} />)}
            {wires.paths.map((w, i) => (
              <circle key={`p-${w.id}`} r={lit(w) ? 3.6 : 2.6} className={`sk-map__packet${lit(w) ? ' is-on' : ''}`}>
                <animateMotion dur={`${lit(w) ? 1.5 : 2.6 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                  <mpath href={`#${w.id}`} />
                </animateMotion>
              </circle>
            ))}
          </svg>
        )}
        {SIDES.map(([side, label], s) => (
          <div className={`sk-map__col sk-map__col--${side}`} key={side}>
            <p className="sk-map__label">{label}</p>
            {OSHT_PARTS.filter((p) => p.side === side).map((p) => (
              <button
                type="button" key={p.id}
                ref={(n) => { nodes.current[p.id] = n; }}
                className={`sk-map__node${pick === p.id ? ' is-on' : ''}${p.side === 'mid' ? ' sk-map__node--core' : ''}`}
                aria-pressed={pick === p.id}
                onClick={() => setPick(p.id)}
                data-cursor="Inspect"
              >
                <span className="sk-map__t">{p.title}</span>
                <span className="sk-map__s">{p.sub}</span>
              </button>
            ))}
            {s < SIDES.length - 1 && <span className="sk-map__arrow" aria-hidden="true">↓</span>}
          </div>
        ))}
      </div>
      <div className="sk-map__detail" aria-live="polite">
        <p className="sk-map__kicker"><span className="sk-ps">$</span> osht explain {part.id}</p>
        <h3 className="sk-map__title">{part.title} <span>{part.sub}</span></h3>
        <p className="sk-map__text">{part.text}</p>
        <ul className="sk-chips">{part.chips.map((c) => <li key={c}>{c}</li>)}</ul>
        <p className="sk-map__log"><span className={`sk-logs__tag sk-tag--${part.log[0]}`}>[{part.log[0]}]</span> {part.log[1]}</p>
      </div>
    </div>
  );
}
