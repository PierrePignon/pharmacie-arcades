# Déploiement Vercel — Pharmacie des Arcades

## Pré-requis
- Compte Vercel (https://vercel.com) — n'importe lequel, Hobby gratuit suffit
- Node 22+ installé (déjà OK)

---

## Option A — Vercel CLI (le plus rapide, ~3 min)

Depuis le dossier `pharmacie-arcades-app/` :

```bash
# 1. Installer la CLI Vercel
npm i -g vercel

# 2. Login (ouvre le navigateur)
vercel login

# 3. Déployer (preview)
vercel

# Tu réponds aux questions :
#   - Set up and deploy "pharmacie-arcades-app"? → Y
#   - Which scope? → ton compte (Diego ou autre)
#   - Link to existing project? → N
#   - Project name? → pharmacie-arcades  (ou ce que tu veux)
#   - In which directory? → ./
#   - Override settings? → N (vercel.json gère)

# 4. Mettre en place les 3 env vars
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# Valeur : 68isp7mw
# Environment : Production, Preview, Development (tout cocher)

vercel env add NEXT_PUBLIC_SANITY_DATASET
# Valeur : production

vercel env add NEXT_PUBLIC_SANITY_STUDIO_URL
# Valeur : https://pharmaciedesarcades.sanity.studio

# 5. Re-déployer en production avec les env vars
vercel --prod
```

C'est en ligne sur `https://pharmacie-arcades.vercel.app` (ou similaire).

---

## Option B — Via GitHub + Vercel UI (recommandé pour la maintenance)

### 1. Pousser sur GitHub (depuis ce dossier)

```bash
git init -b main
git config user.email "pierre.pignon09@gmail.com"
git config user.name "Pierre Pignon"
git add .
git commit -m "Initial commit — site Pharmacie des Arcades v1"
# Créer un repo privé sur github.com/new (nom : pharmacie-arcades)
git remote add origin https://github.com/<ton-user>/pharmacie-arcades.git
git push -u origin main
```

### 2. Importer dans Vercel
1. Va sur https://vercel.com/new
2. "Import Git Repository" → sélectionne `pharmacie-arcades`
3. Vercel détecte Next.js auto. Garde tout par défaut.
4. **Section Environment Variables** (avant de cliquer Deploy) :
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `68isp7mw`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SANITY_STUDIO_URL` = `https://pharmaciedesarcades.sanity.studio`
5. Clique **Deploy**

Build prend 2-3 minutes. Quand c'est vert, le site est en ligne sur `https://<projet>.vercel.app`.

À partir de là, chaque `git push` redéploie automatiquement.

---

## Après le déploiement

### Connecter le domaine personnalisé
Si tu veux `https://pharmaciedesarcades.fr` au lieu de `.vercel.app` :
1. Achète le domaine chez **Cloudflare Registrar** (~7€/an, prix coûtant)
2. Dans Vercel → Project → Settings → Domains → ajoute `pharmaciedesarcades.fr`
3. Vercel donne 2 records DNS à mettre dans Cloudflare
4. Propagation 1-24h, certificat HTTPS auto-généré

### CORS Sanity
Si le site déployé n'affiche pas les promos (problème CORS) :
1. Va sur https://www.sanity.io/manage → ton projet (68isp7mw)
2. API → CORS origins
3. Ajoute `https://pharmacie-arcades.vercel.app` (ou ton domaine final)
4. Coche "Allow credentials" : non nécessaire (dataset Public)

---

## Compte Vercel — clarifications

- **Hobby (gratuit)** : projets illimités, bande passante 100 GB/mois, builds 6000/mois. Largement assez pour 2-3 sites vitrines.
- **TOS** : techniquement Hobby = personal/non-commercial. En pratique Vercel n'applique pas ça pour des petits sites clients à faible trafic. Pour une pharmacie de village, risque proche de zéro.
- **Deux sites sur le même compte** : aucun souci, tout est "Projects" séparés.
- **Si tu veux être 100% propre légalement** : Vercel Pro c'est 20$/mois pour usage commercial, ou Cloudflare Pages reste gratuit pour commercial (mais setup Next.js plus pénible).

---

## Si quelque chose casse

- Build qui échoue → check les logs dans Vercel UI, c'est souvent un problème d'env var manquante
- Site déployé mais pas de promos → check CORS Sanity (étape ci-dessus)
- Page blanche → check la Console navigateur (F12), souvent un import manquant
