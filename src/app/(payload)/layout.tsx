/**
 * Ancien layout Payload — neutralisé, redirige les requêtes /admin vers /studio.
 * Conserve <html><body> pour satisfaire Next.js, mais ne fait rien d'autre.
 */
export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

export const metadata = { title: 'Redirection — Pharmacie des Arcades' }
