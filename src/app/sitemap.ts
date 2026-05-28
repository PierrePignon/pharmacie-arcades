import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.pharmaciedechateauneuf.fr'

/**
 * Génère le sitemap.xml automatiquement à partir des pages publiques.
 * Accessible à l'URL : /sitemap.xml
 *
 * Pour ajouter de nouvelles pages publiques (si on en crée un jour),
 * ajoute une entrée dans le tableau retourné.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
}
