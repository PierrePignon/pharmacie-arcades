import { groq } from 'next-sanity'

export const promosQuery = groq`
  *[_type == "promo" && publie == true] | order(ordre asc) {
    _id,
    titre,
    badge,
    badgeColor,
    commentaire,
    "image": image.asset->url,
    ordre
  }
`
