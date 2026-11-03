/* Saksham Srivastava's portfolio: facts only, taken from his projects, GitHub and portfolio. */
import { PROJECTS } from './projects';
import { SITE } from './site';

const project = (slug) => PROJECTS.find((p) => p.slug === slug);

export const SAKSHAM = {
  name: 'Saksham Srivastava',
  first: 'Saksham',
  role: 'Backend, AI & data',
  company: 'Sqaron Technologies Pvt Ltd',
  based: 'India',
  photo: '/assets/img/founders/saksham.jpg',
  intro: 'Co-founder of Sqaron Technologies. He builds the systems behind the screen: APIs, databases, agentic AI, LLM apps and MLOps pipelines.',
  links: [
    { label: 'GitHub', href: 'https://github.com/Saksham653', handle: 'github.com/Saksham653' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/saksham-srivastava-b689a8367', handle: 'in/saksham-srivastava' },
    { label: 'Portfolio', href: 'https://saksham653.github.io/', handle: 'saksham653.github.io' },
    { label: 'Fiverr', href: 'https://www.fiverr.com/sakshamai_', handle: 'fiverr.com/sakshamai_' },
  ],
};

// what he reaches for, what for, and where it shipped
export const STACK = [
  { tool: 'Python', use: 'everything that runs on the server', where: 'every project' },
  { tool: 'FastAPI', use: 'async REST APIs', where: 'StockWaves' },
  { tool: 'PostgreSQL', use: 'data that has to be right', where: 'StockWaves' },
  { tool: 'Accounting logic', use: 'double-entry books that always balance', where: 'OSHT – Agro Trading' },
  { tool: 'Workers', use: 'jobs that keep systems in step on their own', where: 'OSHT – Agro Trading' },
  { tool: 'OCR + PDF', use: 'papers in, statements and reports out', where: 'OSHT – Agro Trading' },
  { tool: 'Agents + LangChain', use: 'multi-agent and tool-using LLM apps', where: 'HR Agent Pro · SmartEdge Copilot' },
  { tool: 'Groq · Llama 3', use: 'fast inference on top of checked numbers', where: 'LUMIQ' },
  { tool: 'MLOps', use: 'data drift vs concept drift, with alerts', where: 'DriftWatch' },
  { tool: 'Clerk + Stripe', use: 'sign-in, payments and credits', where: 'FlowCraft' },
  { tool: 'Docker', use: 'the same build everywhere', where: 'StockWaves' },
];

// everything he has built or run the backend for, newest work first
export const DEPLOYMENTS = [
  {
    ...project('osht'), status: 'live', role: 'Co-built with Shivam Jha · backend',
    did: 'Servers and APIs for the Android, iOS and web apps, double-entry books, background workers, OCR and PDF automation, zero-downtime releases.',
    stack: ['APIs', 'Ledgers', 'Workers', 'OCR', 'PDF'],
  },
  {
    ...project('clonix'), status: 'pre-booking', role: 'Co-founder with Shivam Jha · the whole backend',
    did: 'Built the whole backend of Clonix. Shivam Jha built the frontend and the extractor.',
    stack: ['Backend', 'APIs'],
  },
  {
    ...project('lumiq'), status: 'beta', role: 'Built by Saksham',
    did: 'Ask a spreadsheet questions in plain English. Numbers come from code, words from AI, and every figure is checked before you see it.',
    stack: ['Groq', 'Llama 3', 'In-browser data'],
  },
  {
    ...project('stockwaves'), status: 'live', role: 'Built by Saksham',
    did: 'Stock, sales, suppliers and staff in real time, with an AI assistant that answers questions about the actual inventory.',
    stack: ['FastAPI', 'PostgreSQL', 'React', 'Docker'],
  },
  {
    slug: 'flowcraft', title: 'FlowCraft', status: 'live', role: 'Built by Saksham', embed: false,
    url: 'https://flow-craft-theta.vercel.app/', line: 'AI content pipelines, as a SaaS.',
    did: 'Chains AI stages into content pipelines, with sign-in, Stripe payments and credits.',
    stack: ['Clerk', 'Stripe', 'AI pipelines'], links: [{ label: 'Live app', href: 'https://flow-craft-theta.vercel.app/' }],
  },
  {
    slug: 'hr-agent-pro', title: 'HR Agent Pro', status: 'code', role: 'Built by Saksham',
    url: 'https://github.com/Saksham653/hr-agent-pro', line: 'A multi-agent HR desk.',
    did: 'Answers policy questions and runs screening workflows with a team of agents.',
    stack: ['Multi-agent', 'LLM'], links: [{ label: 'Code', href: 'https://github.com/Saksham653/hr-agent-pro' }],
  },
  {
    slug: 'smartedge', title: 'SmartEdge Copilot', status: 'code', role: 'Built by Saksham',
    url: 'https://github.com/Saksham653/smartedge-copilot', line: 'A copilot for research and meetings.',
    did: 'An LLM copilot with a modular tool and plugin architecture.',
    stack: ['LLM', 'Tools', 'Plugins'], links: [{ label: 'Code', href: 'https://github.com/Saksham653/smartedge-copilot' }],
  },
  {
    slug: 'driftwatch', title: 'DriftWatch', status: 'code', role: 'Built by Saksham',
    url: 'https://github.com/Saksham653/ML-DRIFT-DETECTION---PERFORMANCE-MONITORING', line: 'MLOps monitoring.',
    did: 'Tells data drift from concept drift and raises alerts automatically.',
    stack: ['MLOps', 'Monitoring'], links: [{ label: 'Code', href: 'https://github.com/Saksham653/ML-DRIFT-DETECTION---PERFORMANCE-MONITORING' }],
  },
  {
    slug: 'groundwater', title: 'Groundwater API', status: 'code', role: 'Built by Saksham',
    url: 'https://github.com/Saksham653/fixitclub-groundwater-api', line: "An async API for India's groundwater stations.",
    did: 'An async REST API built for a civic-tech club.',
    stack: ['Async', 'REST'], links: [{ label: 'Code', href: 'https://github.com/Saksham653/fixitclub-groundwater-api' }],
  },
  {
    slug: 'crawlr', title: 'Crawlr', status: 'code', role: 'Built by Saksham',
    url: 'https://github.com/Saksham653/web-crawlr', line: 'A universal web scraper.',
    did: 'Zero dependencies, in the browser or the terminal.',
    stack: ['Scraping', 'Zero deps'], links: [{ label: 'Code', href: 'https://github.com/Saksham653/web-crawlr' }],
  },
];

// what his systems do, written as log lines (descriptions of real features, not live data)
export const LOG_LINES = [
  ['api', 'order raised by voice → purchase order created', 'osht'],
  ['ledger', 'voucher posted · debit = credit · books balanced', 'osht'],
  ['ocr', 'lorry receipt read · fields matched to the order', 'osht'],
  ['pdf', 'statement generated for the office', 'osht'],
  ['worker', 'systems back in step', 'osht'],
  ['api', 'request served · pack ready for the editor', 'clonix'],
  ['lumiq', 'question answered · every figure checked first', 'lumiq'],
  ['stock', 'assistant answered from the actual inventory', 'stockwaves'],
  ['agents', 'policy question → answer, screening step queued', 'hr-agent-pro'],
  ['drift', 'data drift ≠ concept drift → alert raised', 'driftwatch'],
  ['crawl', 'pages fetched · zero dependencies', 'crawlr'],
  ['billing', 'credits added after payment', 'flowcraft'],
];

export const WALL_WORDS = ['postgres', 'fastapi', 'workers', 'agents', 'pipelines', 'ledgers', 'ocr → pdf', 'llm apps', 'mlops', 'async', 'inference', 'scrapers'];

// counted from the OSHT backend's code; update STATS_AS_OF when they are recounted
export const STATS_AS_OF = '30 Oct 2026';
export const STATS = [
  { n: 872, label: 'API endpoints', note: 'behind the Android, iOS and web apps' },
  { n: 158, label: 'database tables', note: 'PostgreSQL, double-entry books' },
  { n: 8951, label: 'automated tests', note: 'run before every release' },
  { n: 257, suffix: 'k', label: 'lines of Python', note: 'in the OSHT backend' },
  { n: 10, label: 'projects shipped', note: 'OSHT, Clonix, LUMIQ and more' },
];

// the OSHT system map: three sides that feed the API, three parts it leans on
export const OSHT_PARTS = [
  {
    id: 'app', side: 'in', title: 'Field app', sub: 'Android · iOS',
    text: 'Brokers and suppliers raise orders by voice and send each lorry’s papers from the field. Every order becomes a purchase order through the API.',
    chips: ['orders', 'lorry papers', 'push alerts'], log: ['api', 'order raised by voice → purchase order created'],
  },
  {
    id: 'console', side: 'in', title: 'Office console', sub: 'web',
    text: 'The office runs the whole trade here: purchase, sale, ledgers, payments and bank closing, each screen answered by the same API.',
    chips: ['purchase', 'sale', 'ledgers', 'payments'], log: ['api', 'bill posted → ledger card updated instantly'],
  },
  {
    id: 'papers', side: 'in', title: 'Papers in', sub: 'slips · receipts · statements',
    text: 'Weighbridge slips, lorry receipts and bank statements are uploaded once. OCR reads them and the backend matches every line to the right order or bill.',
    chips: ['OCR', 'matching', 'bank statements'], log: ['ocr', 'lorry receipt read · fields matched to the order'],
  },
  {
    id: 'api', side: 'mid', title: 'API', sub: 'FastAPI · 872 endpoints',
    text: 'One API behind every screen. Each request is checked against the person’s access keys, and every change is written to an audit trail in that person’s name.',
    chips: ['FastAPI', 'access keys', 'audit trail'], log: ['api', 'request checked · access key ok · change audited'],
  },
  {
    id: 'books', side: 'out', title: 'Books', sub: 'PostgreSQL · 158 tables',
    text: 'Double-entry accounting for several firms: every voucher’s debits equal its credits, or it is refused. Ledgers, opening balances, notes and bank closing all live here.',
    chips: ['double-entry', 'ledgers', 'bank closing'], log: ['ledger', 'voucher posted · debit = credit · books balanced'],
  },
  {
    id: 'workers', side: 'out', title: 'Workers', sub: 'jobs that run on their own',
    text: 'Background workers keep the books in step every few minutes, settle bills that were paid, and match payments to bills: by link, exact amount, batch, then oldest first.',
    chips: ['sync', 'payment matching', 'checks'], log: ['worker', 'payment matched to its bill · systems back in step'],
  },
  {
    id: 'docs', side: 'out', title: 'PDF engine', sub: 'bills · statements · pay slips',
    text: 'A warm headless Chromium renders bills, ledger statements and pay slips in batches, so the office prints a whole day’s papers in seconds.',
    chips: ['Chromium', 'batch render', 'Hindi text'], log: ['pdf', 'statement generated for the office'],
  },
];

// what the OSHT backend took, in six parts
export const OSHT_FACTS = [
  { title: 'Books that always balance', text: 'Double-entry from the first voucher: a posting whose debits and credits differ is refused, for every firm, in real and paper books alike.' },
  { title: 'Nothing waits on a person', text: 'Workers keep the books in step on their own, settle paid bills and flag the overdue ones, so the office starts each day with the numbers already right.' },
  { title: 'Papers in, documents out', text: 'OCR reads slips and receipts as they arrive; a PDF engine sends back bills, statements and pay slips in batches.' },
  { title: 'Every rupee traced', text: 'Each payment is matched to the bill it paid, and an uploaded bank statement is checked line by line against the books.' },
  { title: 'The right door for each person', text: 'Access is set per section and per person, and every change carries the name of whoever made it.' },
  { title: 'Releases without fear', text: '8,951 automated tests run before a release, and a new server only takes traffic once its health check passes, so the office never sees downtime.' },
];

// the questions people (and AI assistants) ask about him, answered on his page and in its FAQPage data
const stat = (label) => STATS.find((x) => x.label === label);
const count = (label) => { const x = stat(label); return (x.suffix === 'k' ? x.n * 1000 : x.n).toLocaleString('en-US'); };
export const FAQ = [
  ['Who built the backend of OSHT – Agro Trading?', "Saksham Srivastava built the backend of OSHT – Agro Trading: the servers, APIs, database, accounting books and automation everything runs on. He built the app with Shivam Jha, who built the Android and iOS app, the office console's screens and the website. Both are co-founders of Sqaron Technologies."],
  ['What does Saksham Srivastava do at Sqaron Technologies?', 'He is a co-founder of Sqaron Technologies and builds the back end: APIs, databases, background workers, automation, agentic AI and data systems. Shivam Jha, the other co-founder, builds the front end.'],
  ['What has Saksham Srivastava built?', 'The backend of OSHT – Agro Trading, with Shivam Jha. The whole backend of Clonix, which he co-founded with Shivam Jha. LUMIQ, StockWaves and FlowCraft, and HR Agent Pro, SmartEdge Copilot, DriftWatch, the FixItClub Groundwater API and Crawlr.'],
  ['How big is the OSHT backend?', `Counted from its code on ${STATS_AS_OF}: ${count('API endpoints')} API endpoints, ${count('database tables')} database tables, ${count('automated tests')} automated tests and about ${count('lines of Python')} lines of Python.`],
  ['How can I work with Saksham Srivastava?', `Send a brief through the form on the Sqaron Technologies website, or email ${SITE.email}. A founder replies within one working day with questions, then a written plan and a fixed price. He is also on GitHub, LinkedIn and Fiverr.`],
];
