# Sanity — Setup initial et édition au quotidien

Les mises en avant du site sont éditées dans **Sanity Studio**, un panneau d'admin pro intégré au site, accessible sur l'URL `/studio` (ex: `https://pharmaciedesarcades.fr/studio`).

## Setup initial (à faire 1 seule fois, par le développeur)

### 1. Créer un compte et un projet Sanity

1. Aller sur [sanity.io](https://www.sanity.io/) → **Get started**
2. Se connecter avec le compte Google **pierre.pignon09@gmail.com** (ou créer un compte email)
3. Créer un nouveau projet :
   - Nom : **Pharmacie des Arcades**
   - Dataset : **production**
   - Plan : **Free** (largement suffisant : 3 utilisateurs, 10 000 documents, 500 GB de CDN)
4. Une fois créé, noter le **Project ID** (visible sur le dashboard Sanity, ex: `abc123xy`)

### 2. Renseigner le Project ID dans le projet

Dans le fichier `.env` à la racine du projet :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Inviter la pharmacienne

Sur sanity.io → onglet **Members** → **Invite member** → entrer l'email de la pharmacienne avec rôle **Editor**. Elle recevra un email d'invitation.

### 4. Lancer le projet

```bash
npm install
npm run dev
```

- Site public : http://localhost:3000
- Studio Sanity : http://localhost:3000/studio

Au premier accès à `/studio`, se connecter avec le compte Sanity.

### 5. Créer les 4 premières promos (point de départ)

Dans le Studio (`/studio`) :
1. Cliquer sur **Mise en avant** dans la sidebar
2. Cliquer **Create** (en haut à droite)
3. Remplir titre / badge / commentaire / image / ordre
4. Cliquer **Publish**

Données de démarrage suggérées :

| Titre | Badge | Couleur | Commentaire | Ordre |
|---|---|---|---|---|
| Allergiques, anticipez vos sorties. | SPÉCIAL ALLERGIE | Green | Allerdol Double Action, en rayon. Conseil personnalisé en officine. | 1 |
| Le déodorant dès l'adolescence. | ADOLESCENCE | Terra | La Rosée Pierre d'Alun, formule bio, sans aluminium. | 2 |
| Avril : la qualité bio à petit prix. | QUALITÉ & PRIX | Ocre | Crème de jour à l'huile d'abricot bio, certifiée Cosmos Organic. | 3 |
| Anti-moustiques toute la famille. | FAMILLE | Terra deep | Cinq sur Cinq Famille, formulation douce, adaptée aux enfants. | 4 |

Photos : uploader depuis le dossier `public/photos/promo/` (promo-allergie.jpg, etc.) ou directement depuis le téléphone de la pharmacienne.

---

## Édition au quotidien (par la pharmacienne)

### Se connecter

1. Ouvrir le navigateur sur `https://pharmaciedesarcades.fr/studio`
2. Se connecter avec son compte Sanity (email reçu lors de l'invitation)

### Modifier une promo

1. Dans la sidebar, cliquer **Mise en avant**
2. Cliquer sur la promo à éditer
3. Modifier les champs (titre, commentaire, image)
4. Cliquer **Publish** (le bouton vert en bas)
5. Le site se met à jour automatiquement en moins d'une minute

### Réordonner les promos

Changer le **Ordre d'affichage** dans chaque promo (1 = en premier).

### Cacher une promo sans la supprimer

Décocher **Publié sur la home**. La promo reste dans Sanity mais n'apparaît plus sur le site.

### Ajouter une nouvelle promo

Bouton **Create** en haut à droite → remplir tous les champs → **Publish**.

### Supprimer définitivement

Cliquer sur la promo → menu **...** → **Delete**.

---

## Référence des champs

| Champ | Description |
|---|---|
| **Titre** | Phrase courte qui s'affiche en gros (80 caractères max) |
| **Étiquette** | Petit badge en haut de la carte (ex: SPÉCIAL ALLERGIE) |
| **Couleur de l'étiquette** | Terra / Green / Ocre / Terra deep |
| **Commentaire** | Description courte (1-2 phrases, 200 caractères max) |
| **Photo du produit** | Image carrée, format JPG/PNG/WebP |
| **Ordre d'affichage** | 1, 2, 3… (1 = en premier sur la home) |
| **Publié sur la home** | Coche pour afficher, décoche pour cacher |

---

## Sécurité

- Le Studio est protégé par compte Sanity (login obligatoire)
- Seules les personnes invitées peuvent éditer
- Les visiteurs du site **ne peuvent pas accéder au Studio**, ils voient seulement le rendu public

## Coût

- **Free tier Sanity** : 0 € / mois
- Limites du free tier (largement suffisantes pour la pharmacie) : 3 utilisateurs, 10 000 documents, 500 GB de CDN/mois, 2 datasets
