# Pharmacie des Arcades — site Next.js + Sanity CMS

Vrai projet Next.js + Sanity pour la Pharmacie des Arcades à Châteauneuf-le-Rouge. Site public + admin éditable par l'équipe via Sanity Studio (intégré au site sur `/studio`).

## Stack

- **Next.js 15** (App Router, TypeScript, React 19)
- **Sanity CMS 3** — admin hosted, vraie UI pro, free tier généreux
- **Sanity Studio embedded** sur la route `/studio` (intégré au site, branding cohérent)
- **Tailwind CSS** + direction Susanne Kaufmann / Provence wellness
- **Cible** : Vercel + Cloudflare DNS

## Setup initial (à faire 1 seule fois)

### 1. Créer le projet Sanity

Suivre **[docs/SANITY_SETUP.md](./docs/SANITY_SETUP.md)** étape par étape :
- Compte Sanity gratuit (avec pierre.pignon09@gmail.com)
- Créer un projet "Pharmacie des Arcades", dataset `production`
- Noter le **Project ID**

### 2. Renseigner les variables d'environnement

Copier `.env.example` en `.env` et compléter :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy  # le projectId noté à l'étape 1
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Installer et lancer

```bash
npm install
npm run dev
```

- Site public : http://localhost:3000
- Sanity Studio : http://localhost:3000/studio

Au premier accès au Studio, se connecter avec le compte Sanity créé.

### 4. Créer les 4 premières promos

Dans le Studio (`/studio`) → Mise en avant → Create. Détails dans [docs/SANITY_SETUP.md](./docs/SANITY_SETUP.md#5-créer-les-4-premières-promos-point-de-départ).

## Structure du projet

```
pharmacie-arcades-app/
├── src/
│   ├── app/
│   │   ├── (frontend)/         ← site public
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx        ← assemblage de toutes les sections
│   │   │   └── globals.css
│   │   └── studio/             ← Sanity Studio embedded
│   │       └── [[...tool]]/page.tsx
│   ├── sanity/                 ← config et schemas Sanity
│   │   ├── env.ts
│   │   ├── lib/
│   │   │   ├── client.ts       ← client Sanity
│   │   │   ├── image.ts        ← helper URL d'image
│   │   │   └── queries.ts      ← requêtes GROQ
│   │   └── schemaTypes/
│   │       ├── index.ts
│   │       └── promo.ts        ← schema des mises en avant
│   ├── components/             ← composants React
│   │   ├── Header.tsx
│   │   ├── StatusBadge.tsx     ← statut ouvert/fermé live
│   │   ├── RdvModal.tsx        ← modal RDV → WhatsApp
│   │   ├── ContactFAB.tsx      ← bouton flottant 3 voies
│   │   └── ServiceRdvButton.tsx
│   └── lib/
│       ├── constants.ts        ← infos officine, univers, services, galerie
│       └── sheet.ts            ← fetch des promos depuis Sanity (nom historique)
├── sanity.config.ts            ← config Studio
├── sanity.cli.ts               ← config CLI
├── docs/
│   └── SANITY_SETUP.md         ← guide pour la pharmacienne
└── public/
    └── photos/                 ← façade, marques, promos, ambiances
```

## Ce qui est éditable par la pharmacienne (sans toucher au code)

| Élément | Méthode | Doc |
|---|---|---|
| **Mises en avant** (promos home) | Sanity Studio sur `/studio` | [SANITY_SETUP.md](./docs/SANITY_SETUP.md) |
| **Équipe**, coordonnées, horaires | En dur dans `src/lib/constants.ts` (modif annuelle, peu fréquente) | — |
| **Photos marques et officine** | Dossier `public/photos/` (idem) | — |

La pharmacienne se rend sur `https://pharmaciedesarcades.fr/studio`, se connecte avec son compte Sanity, modifie ses promos dans une vraie interface pro (drag & drop, upload photo, preview live). Le site front se met à jour en moins d'une minute.

## Déploiement

Cf. [DEPLOYMENT.md](./DEPLOYMENT.md).

- Hébergement frontend : **Vercel** (free tier)
- CMS : **Sanity hosted** (free tier — 3 utilisateurs, 10K docs, 500 GB CDN/mois)
- DNS / proxy : **Cloudflare** (free)
- Domaine recommandé : `pharmaciedesarcades.fr` chez Cloudflare Registrar (~7 €/an)
- Compte de référence : **pierre.pignon09@gmail.com**

Coût total mensuel : ~0 €/mois (tant qu'on reste sous les limites des free tiers).

## Points à clarifier

- [ ] Vrais noms d'équipe (Sophie Reynaud, Thomas Albert restent fictifs)
- [ ] Labels "Hygiène dentaire" / "Hygiène intime" (à valider avec la cliente)
- [ ] Inviter la pharmacienne sur Sanity comme Editor
- [ ] Achat nom de domaine
