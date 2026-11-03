import SakshamPortfolio from '@/components/saksham/SakshamPortfolio';
import { JsonLd } from '@/components/Page';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Saksham Srivastava — Backend, AI & data | Co-founder, Sqaron Technologies',
  description: 'Saksham Srivastava builds backends, agentic AI and data systems and is co-founder of Sqaron Technologies. Built OSHT – Agro Trading with Shivam Jha (its backend), co-founded Clonix with Shivam Jha (its whole backend), builder of LUMIQ, StockWaves and FlowCraft.',
  alternates: { canonical: '/saksham-srivastava/' },
  openGraph: { title: 'Saksham Srivastava — the back end of Sqaron', images: [{ url: '/assets/og.png', width: 1200, height: 630 }] },
};

const person = {
  '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE.url}/#saksham`, name: 'Saksham Srivastava',
  jobTitle: 'Co-founder · Backend, AI & data', url: `${SITE.url}/saksham-srivastava/`, image: `${SITE.url}/assets/img/founders/saksham.jpg`,
  worksFor: { '@type': 'Organization', name: SITE.legalName, url: `${SITE.url}/` },
  knowsAbout: ['Backend development', 'Python', 'FastAPI', 'REST APIs', 'PostgreSQL', 'Database design', 'Double-entry accounting systems', 'Background workers', 'Automation', 'OCR', 'PDF generation', 'Agentic AI', 'LangChain', 'LLM applications', 'MLOps', 'Docker'],
  sameAs: ['https://github.com/Saksham653', 'https://linkedin.com/in/saksham-srivastava-b689a8367', 'https://saksham653.github.io/', 'https://www.fiverr.com/sakshamai_'],
};

export default function SakshamPage() {
  return (
    <>
      <JsonLd data={person} />
      <SakshamPortfolio />
    </>
  );
}
