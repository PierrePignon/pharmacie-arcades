import { redirect } from 'next/navigation'

/**
 * /studio sur le site → redirige vers le Studio Sanity hosted.
 *
 * L'admin Sanity n'est plus intégré au site Next.js (problèmes de SSR/Turbopack
 * non triviaux). À la place, il est hébergé chez Sanity sur :
 *   https://pharmacie-arcades.sanity.studio
 *
 * Pour déployer ce studio : `npx sanity deploy` (utilise sanity.config.ts à la racine).
 */
export default function StudioRedirect() {
  // Remplacer par la vraie URL une fois sanity deploy effectué
  const sanityStudioUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://www.sanity.io/manage'
  redirect(sanityStudioUrl)
}
