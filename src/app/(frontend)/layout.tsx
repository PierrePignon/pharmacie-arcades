import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pharmacie des Arcades — Châteauneuf-le-Rouge',
  description:
    "Pharmacie indépendante place Auguste Baret. Conseil pharmaceutique, entretiens, parapharmacie sélectionnée — depuis 1998.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/photos/logo/logo-400.png', type: 'image/png' },
    ],
    apple: '/photos/logo/logo-400.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
