'use client';

/* A console that talks about Saksham's work. Nothing to learn first: the commands sit under the prompt
 * as buttons, the input suggests the rest of a command as you type (Tab or → takes it), ↑ and ↓ walk
 * the history, and a typo gets a "did you mean". `open <project>` opens a live project in the in-page
 * browser; `hire saksham` goes to the brief form. Every answer is about real work; nothing is fetched. */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInView } from 'motion/react';
import { useSite } from '../SiteProvider';
import { SAKSHAM, STACK, DEPLOYMENTS, STATS, STATS_AS_OF, OSHT_PARTS } from '@/lib/saksham';
import { SITE } from '@/lib/site';

const PROMPT = 'visitor@sqaron:~$';
const CHIPS = ['help', 'whoami', 'osht stats', 'projects', 'open lumiq', 'stack', 'hire saksham'];
const MAX_LINES = 220;

const link = (label, href) => ({ t: label, href });
const c = (t, cls) => ({ t, cls });
const fmt = (n) => n.toLocaleString('en-US');

// a project by slug or name, forgiving about case and spaces
const findProject = (q) => {
  const k = q.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!k) return null;
  return DEPLOYMENTS.find((d) => d.slug.replace(/-/g, '') === k || d.title.toLowerCase().replace(/[^a-z0-9]/g, '').startsWith(k));
};

const distance = (a, b) => {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[m][n];
};

export default function Console() {
  const router = useRouter();
  const { openSite } = useSite();
  const frame = useRef(null);
  const out = useRef(null);
  const input = useRef(null);
  const typing = useRef(false);
  const seen = useInView(frame, { once: true, amount: 0.35 });
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const [busy, setBusy] = useState(false);
  const nextId = useRef(0);

  const print = useCallback((...rows) => {
    setLines((cur) => [...cur, ...rows.map((parts) => ({ id: nextId.current++, parts: Array.isArray(parts) ? parts : [parts] }))].slice(-MAX_LINES));
  }, []);

  // the commands: name, a one-line usage for `help`, and what each one prints
  const commands = useMemo(() => {
    const list = [
      {
        name: 'help', usage: 'help', about: 'list the commands',
        run: () => {
          print(c('commands — tap one below or type it:', 'dim'));
          list.filter((k) => !k.hidden).forEach((k) => print([c(k.usage.padEnd(22, ' '), 'cmd'), c(k.about, 'dim')]));
          print(c('tip: Tab or → completes a command, ↑ ↓ walk your history.', 'dim'));
        },
      },
      {
        name: 'whoami', usage: 'whoami', about: 'who Saksham is',
        run: () => {
          print([c(SAKSHAM.name, 'hi'), c(` · ${SAKSHAM.role}`, 'dim')]);
          print(SAKSHAM.intro);
          print([c('based ', 'dim'), SAKSHAM.based, c(' · company ', 'dim'), SITE.legalName]);
        },
      },
      {
        name: 'osht', usage: 'osht stats | osht <part>', about: 'the OSHT backend, in numbers or part by part',
        run: (args) => {
          const sub = (args[0] || '').toLowerCase();
          if (!sub || sub === 'stats') {
            print(c(`OSHT – Agro Trading · backend · counted from the code on ${STATS_AS_OF}`, 'dim'));
            STATS.forEach((s) => print([c(`${fmt(s.n)}${s.suffix || ''}`.padStart(8, ' '), 'num'), `  ${s.label}`, c(`  ${s.note}`, 'dim')]));
            print([c('parts: ', 'dim'), c(OSHT_PARTS.map((p) => p.id).join(' · '), 'cmd'), c('  → try ', 'dim'), c('osht books', 'cmd')]);
            return;
          }
          const p = OSHT_PARTS.find((x) => x.id === sub || x.title.toLowerCase().startsWith(sub));
          if (!p) { print(c(`osht: no part called "${sub}". parts: ${OSHT_PARTS.map((x) => x.id).join(', ')}`, 'err')); return; }
          print([c(p.title, 'hi'), c(` · ${p.sub}`, 'dim')]);
          print(p.text);
          print([c(`[${p.log[0]}] `, 'tag'), c(p.log[1], 'dim')]);
        },
      },
      {
        name: 'projects', usage: 'projects', about: 'everything he has shipped',
        run: () => {
          DEPLOYMENTS.forEach((d) => print([c(d.status.padEnd(12, ' '), d.status === 'live' ? 'ok' : 'dim'), c(d.title.padEnd(20, ' '), 'hi'), c(d.line || '', 'dim')]));
          print([c('open one: ', 'dim'), c('open lumiq', 'cmd'), c(' · ', 'dim'), c('open stockwaves', 'cmd')]);
        },
      },
      {
        name: 'open', usage: 'open <project>', about: 'open a project, live where it can be',
        run: (args) => {
          const d = findProject(args.join(' '));
          if (!d) { print(c(`open: which project? try ${DEPLOYMENTS.slice(0, 4).map((x) => x.slug).join(', ')}`, 'err')); return; }
          if (d.img) {
            print([c('opening ', 'dim'), c(d.title, 'hi'), c(' in the browser window…', 'dim')]);
            setTimeout(() => openSite({ ...d, alt: d.alt || d.title, links: d.links || [] }, null), 350);
          } else {
            const href = (d.links && d.links[0] && d.links[0].href) || d.url;
            print([c(`${d.title} opens in a new tab: `, 'dim'), link(href, href)]);
            window.open(href, '_blank', 'noopener');
          }
        },
      },
      {
        name: 'stack', usage: 'stack', about: 'the tools he reaches for',
        run: () => STACK.forEach((s) => print([c(s.tool.padEnd(20, ' '), 'cmd'), s.use, c(`  · ${s.where}`, 'dim')])),
      },
      {
        name: 'hire', usage: 'hire saksham', about: 'start a project with him',
        run: () => {
          print(c('PING saksham … reply within one working day ✓', 'ok'));
          print(c('opening the brief form…', 'dim'));
          setTimeout(() => router.push('/#contact'), 900);
        },
      },
      {
        name: 'ping', usage: 'ping', about: 'how fast he replies',
        run: () => {
          print(`PING saksham (${SITE.legalName})`);
          print(c('reply from a founder within one working day', 'ok'));
          print([c('then a written plan and a fixed price · ', 'dim'), c('hire saksham', 'cmd'), c(' to start', 'dim')]);
        },
      },
      {
        name: 'contact', usage: 'contact', about: 'email, GitHub, LinkedIn, Fiverr',
        run: () => {
          print([c('email     ', 'dim'), link(SITE.email, `mailto:${SITE.email}`)]);
          SAKSHAM.links.forEach((l) => print([c(l.label.toLowerCase().padEnd(10, ' '), 'dim'), link(l.handle, l.href)]));
        },
      },
      {
        name: 'github', usage: 'github', about: 'open his GitHub', hidden: true,
        run: () => { const l = SAKSHAM.links[0]; print([c('opening ', 'dim'), link(l.handle, l.href)]); window.open(l.href, '_blank', 'noopener'); },
      },
      {
        name: 'linkedin', usage: 'linkedin', about: 'open his LinkedIn', hidden: true,
        run: () => { const l = SAKSHAM.links[1]; print([c('opening ', 'dim'), link(l.handle, l.href)]); window.open(l.href, '_blank', 'noopener'); },
      },
      {
        name: 'fiverr', usage: 'fiverr', about: 'open his Fiverr', hidden: true,
        run: () => { const l = SAKSHAM.links.find((x) => x.label === 'Fiverr'); print([c('opening ', 'dim'), link(l.handle, l.href)]); window.open(l.href, '_blank', 'noopener'); },
      },
      {
        name: 'ls', usage: 'ls', about: 'what is here', hidden: true,
        run: () => print([c('about.json  ', 'cmd'), c('projects/  ', 'cmd'), c('stack.txt  ', 'cmd'), c('osht/', 'cmd')]),
      },
      {
        name: 'cat', usage: 'cat about.json', about: 'read a file', hidden: true,
        run: (args) => {
          const f = (args[0] || '').toLowerCase();
          if (f === 'about.json') {
            print('{');
            print(`  "name": "${SAKSHAM.name}",`);
            print(`  "role": "${SAKSHAM.role}",`);
            print(`  "shipped": ${DEPLOYMENTS.length},`);
            print(`  "based": "${SAKSHAM.based}"`);
            print('}');
          } else if (f === 'stack.txt') commandsRef.current.find((k) => k.name === 'stack').run([]);
          else if (f.startsWith('projects')) commandsRef.current.find((k) => k.name === 'projects').run([]);
          else print(c(`cat: ${f || '(nothing)'}: no such file. try: cat about.json`, 'err'));
        },
      },
      { name: 'date', usage: 'date', about: 'the time where he is', hidden: true, run: () => print(`${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })} IST`) },
      { name: 'echo', usage: 'echo <text>', about: 'say something', hidden: true, run: (args) => print(args.join(' ')) },
      { name: 'sudo', usage: 'sudo', about: '', hidden: true, run: () => print(c('permission denied. nice try — ask Saksham for the keys: hire saksham', 'err')) },
      { name: 'exit', usage: 'exit', about: '', hidden: true, run: () => print(c('there is no exit. there is only hire saksham.', 'dim')) },
      { name: 'history', usage: 'history', about: 'what you typed', hidden: true, run: () => history.forEach((h, i) => print([c(String(i + 1).padStart(3, ' '), 'dim'), `  ${h}`])) },
      { name: 'clear', usage: 'clear', about: 'clear the screen', run: () => setLines([]) },
    ];
    return list;
  }, [print, openSite, router, history]);
  const commandsRef = useRef(commands);
  commandsRef.current = commands;

  // everything a visitor might type in full, for the inline suggestion
  const completions = useMemo(() => [
    ...CHIPS, 'contact', 'ping', 'clear', 'osht stats', ...OSHT_PARTS.map((p) => `osht ${p.id}`),
    ...DEPLOYMENTS.map((d) => `open ${d.slug}`), 'github', 'linkedin', 'fiverr', 'ls', 'cat about.json', 'date', 'history',
  ], []);
  const hint = useMemo(() => {
    const v = value.toLowerCase();
    if (!v.trim()) return '';
    const m = completions.find((x) => x.startsWith(v) && x !== v);
    return m ? m.slice(value.length) : '';
  }, [value, completions]);

  const run = useCallback((raw) => {
    const text = raw.trim();
    print([c(PROMPT, 'ps'), ` ${text}`]);
    if (!text) return;
    setHistory((h) => [...h.filter((x) => x !== text), text].slice(-40));
    setHIndex(-1);
    const [name, ...args] = text.split(/\s+/);
    const cmd = commandsRef.current.find((k) => k.name === name.toLowerCase());
    if (cmd) { cmd.run(args); return; }
    const near = commandsRef.current.map((k) => [k.name, distance(name.toLowerCase(), k.name)]).sort((a, b) => a[1] - b[1])[0];
    print(c(`command not found: ${name}`, 'err'));
    if (near && near[1] <= 2) print([c('did you mean ', 'dim'), c(near[0], 'cmd'), c('? or type ', 'dim'), c('help', 'cmd')]);
    else print([c('type ', 'dim'), c('help', 'cmd'), c(' to see what it understands', 'dim')]);
  }, [print]);

  // a tapped command types itself out first, so it reads like someone used the console
  const typeAndRun = useCallback((text) => {
    if (typing.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { run(text); return; }
    typing.current = true;
    setBusy(true);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setValue(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setTimeout(() => { run(text); setValue(''); typing.current = false; setBusy(false); }, 160);
      }
    }, 34);
  }, [run]);

  // the first time the console is on screen it says hello and shows how to use it
  const greeted = useRef(false);
  useEffect(() => {
    if (!seen || greeted.current) return;
    greeted.current = true;
    print(c('sqaron console · ask about Saksham’s work', 'hi'));
    print([c('tap a command below, or type one. start with ', 'dim'), c('help', 'cmd'), c('.', 'dim')]);
  }, [seen, print]);

  // keep the newest line in view, inside the console only (the page does not jump)
  useEffect(() => {
    const el = out.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const onKey = (e) => {
    if (busy) { e.preventDefault(); return; }
    if (e.key === 'Enter') { e.preventDefault(); run(value); setValue(''); return; }
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && hint) {
      if (e.key === 'ArrowRight' && e.currentTarget.selectionStart !== value.length) return;
      e.preventDefault(); setValue(value + hint); return;
    }
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const i = hIndex < 0 ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(i); setValue(history[i]); return;
    }
    if (e.key === 'ArrowDown' && hIndex >= 0) {
      e.preventDefault();
      const i = hIndex + 1;
      if (i >= history.length) { setHIndex(-1); setValue(''); } else { setHIndex(i); setValue(history[i]); }
      return;
    }
    if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setLines([]); }
  };

  // clicking anywhere in the console (but not a link or a button) puts the cursor in the prompt
  const focus = (e) => {
    if (e.target.closest('a, button') || (window.getSelection && String(window.getSelection()))) return;
    input.current?.focus({ preventScroll: true });
  };

  return (
    <div className="sk-term sk-con" ref={frame}>
      <div className="sk-term__bar"><span className="sk-dots"><i /><i /><i /></span><span>sqaron — console</span><span className="sk-live"><i />interactive</span></div>
      <div className="sk-con__body" onClick={focus}>
        <div className="sk-con__out" ref={out} data-lenis-prevent aria-live="polite" aria-label="Console output">
          {lines.map(({ id, parts }) => (
            <p className="sk-con__line" key={id}>
              {parts.map((p, i) => {
                if (typeof p === 'string') return <span key={i}>{p}</span>;
                if (p.href) return <a key={i} href={p.href} target={p.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">{p.t}</a>;
                return <span key={i} className={`sk-con__${p.cls}`}>{p.t}</span>;
              })}
            </p>
          ))}
        </div>
        <label className="sk-con__prompt">
          <span className="sk-con__ps" aria-hidden="true">{PROMPT}</span>
          <span className="sk-con__field">
            <input
              ref={input}
              className="sk-con__input"
              value={value}
              onChange={(e) => { setValue(e.target.value); setHIndex(-1); }}
              onKeyDown={onKey}
              placeholder="type a command, e.g. help"
              aria-label="Type a command"
              autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
              enterKeyHint="go"
              readOnly={busy}
            />
            {hint && <span className="sk-con__ghost" aria-hidden="true"><span>{value}</span>{hint}</span>}
          </span>
          {hint && <button type="button" className="sk-con__tab" onClick={() => { setValue(value + hint); input.current?.focus(); }}>tab ↹</button>}
        </label>
      </div>
      <div className="sk-con__chips" role="group" aria-label="Commands you can run">
        {CHIPS.map((k) => (
          <button type="button" key={k} className={`sk-con__chip${k === 'hire saksham' ? ' is-hire' : ''}`} onClick={() => typeAndRun(k)} disabled={busy}>{k}</button>
        ))}
      </div>
    </div>
  );
}
