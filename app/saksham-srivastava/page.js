import SakshamPortfolio from '@/components/saksham/SakshamPortfolio';
import { JsonLd } from '@/components/Page';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Saksham Srivastava — Backend, AI & data | Co-founder, Sqaron Technologies',
  description: 'Saksham Srivastava builds backends, agentic AI and data systems and is co-founder of Sqaron Technologies. Built OSHT – Agro Trading with Shivam Jha (its backend), co-founded Clonix with Shivam Jha (its whole backend), and builder of LUMIQ for Android, StockWaves and FlowCraft.',
  alternates: { canonical: '/saksham-srivastava/' },
  openGraph: { title: 'Saksham Srivastava — the back end of Sqaron', images: [{ url: '/assets/og.png', width: 1200, height: 630 }] },
};

const PAGE = `${SITE.url}/saksham-srivastava/`;
const PHOTO = `${SITE.url}/assets/img/founders/saksham.jpg`;

// his profile page, his photo (named, so image search ties it to him) and the person, with every profile of his
const person = {
  '@type': 'Person', '@id': `${SITE.url}/#saksham`, name: 'Saksham Srivastava', alternateName: 'Saksham653', givenName: 'Saksham', familyName: 'Srivastava',
  jobTitle: 'Co-founder · Backend, AI & data', url: PAGE, image: { '@id': `${PAGE}#photo` },
  description: 'Backend, AI and data engineer from Lucknow, India, and co-founder of Sqaron Technologies. Built the backend of OSHT – Agro Trading and the LUMIQ Android app.',
  homeLocation: { '@type': 'Place', name: 'Lucknow, Uttar Pradesh, India' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Shri Ramswaroop Memorial University' },
  worksFor: { '@type': 'Organization', '@id': `${SITE.url}/#org`, name: SITE.legalName, url: `${SITE.url}/` },
  knowsAbout: ['Backend development', 'Python', 'FastAPI', 'REST APIs', 'PostgreSQL', 'Database design', 'Double-entry accounting systems', 'Background workers', 'Automation', 'OCR', 'PDF generation', 'Agentic AI', 'LangChain', 'LLM applications', 'MLOps', 'Docker'],
  sameAs: ['https://saksham.sqaron.dev/', 'https://github.com/Saksham653', 'https://www.linkedin.com/in/saksham-srivastava-dev/', 'https://peerlist.io/saksham653', 'https://dev.to/saksham653', 'https://www.fiverr.com/sakshamai_', 'https://in.pinterest.com/sakshamsrivastava7000/', 'https://saksham653.github.io/'],
};

const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'ProfilePage', '@id': `${PAGE}#profile`, url: PAGE, name: metadata.title, inLanguage: 'en', dateModified: '2026-11-26',
      mainEntity: { '@id': `${SITE.url}/#saksham` }, primaryImageOfPage: { '@id': `${PAGE}#photo` } },
    { '@type': 'ImageObject', '@id': `${PAGE}#photo`, url: PHOTO, contentUrl: PHOTO, width: 912, height: 1142,
      caption: 'Saksham Srivastava, co-founder of Sqaron Technologies', creator: { '@id': `${SITE.url}/#saksham` } },
    person,
  ],
};

export default function SakshamPage() {
  return (
    <>
      <JsonLd data={ld} />
      <SakshamPortfolio />
    </>
  );
}
