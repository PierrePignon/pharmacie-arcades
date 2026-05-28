import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.pharmaciedechateauneuf.fr'

/**
 * Génère le robots.txt automatiquement.
 * Accessible à l'URL : /robots.txt
 *
 * Autorise tout le monde (Google, Bing, etc.) à crawler le site public,
 * mais bloque l'accès à l'interface d'administration Sanity et aux API internes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',     // Sanity Studio (back-office)
          '/studio/',
          '/admin',      // Admin éventuel
          '/admin/',
          '/api/',       // Routes API internes
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
