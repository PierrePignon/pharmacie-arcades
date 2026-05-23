/**
 * Promos depuis Sanity (CMS hosted).
 *
 * Setup à faire 1x : cf. docs/SANITY_SETUP.md
 * - Créer un projet Sanity sur sanity.io
 * - Mettre projectId + dataset dans .env (NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET)
 *
 * Édition au quotidien par la pharmacienne :
 * - Aller sur le site sur /studio, se connecter
 * - Modifier ou ajouter une promo, le site se met à jour automatiquement.
 */
import { client } from '@/sanity/lib/client'
import { promosQuery } from '@/sanity/lib/queries'

export type Promo = {
  id: string
  titre: string
  badge: string
  badgeColor: string
  commentaire: string
  image: { url: string; alt: string }
  ordre: number
  publie: boolean
}

type SanityPromo = {
  _id: string
  titre: string
  badge?: string
  badgeColor?: string
  commentaire: string
  image?: string
  ordre: number
}

export async function getPromosFromSheet(): Promise<Promo[] | null> {
  // Fonction nommée "FromSheet" pour rétrocompat, mais elle fetch en réalité depuis Sanity.
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null
  try {
    const docs = await client.fetch<SanityPromo[]>(promosQuery, {}, {
      next: { revalidate: 60 },
    })
    return docs.map((d) => ({
      id: d._id,
      titre: d.titre || '',
      badge: d.badge || '',
      badgeColor: d.badgeColor || 'terra',
      commentaire: d.commentaire || '',
      image: { url: d.image || '/photos/promo/promo-allergie.jpg', alt: d.titre },
      ordre: d.ordre ?? 0,
      publie: true,
    }))
  } catch (err) {
    console.warn('[sanity] fetch error:', err)
    return null
  }
}
