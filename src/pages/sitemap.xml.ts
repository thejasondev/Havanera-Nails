import type { APIRoute } from 'astro';

const pages = [
  {
    url: '',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString()
  },
  {
    url: 'Servicio_section',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: 'Catalogo_section',
    changefreq: 'daily',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  {
    url: 'Contacto',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: 'FAQ_section',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages.map(page => `  <url>
    <loc>https://havanera-nails.vercel.app/${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

export const GET: APIRoute = () => {
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
