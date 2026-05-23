# Éditer les mises en avant du site — Google Sheet

Document destiné à la pharmacienne pour éditer les promos affichées en page d'accueil du site sans toucher au code.

## En une phrase

Les promos sont stockées dans un **Google Sheet partagé**. Quand la pharmacienne modifie le sheet, le site se met à jour automatiquement en moins d'une minute.

---

## Mise en place (à faire une seule fois)

### 1. Créer le Google Sheet

1. Ouvrir [sheets.google.com](https://sheets.google.com) (compte Google de la pharmacie)
2. Nouveau classeur → renommer en **« Pharmacie des Arcades — Promos »**
3. Renommer le premier onglet (en bas) en **`Promos`** (sensible à la casse, sans accent)
4. Créer cette ligne d'en-tête en haut, dans cet ordre exact :

| titre | badge | badgeColor | commentaire | image | ordre | publie |

### 2. Remplir avec les 4 promos actuelles (point de départ)

| titre | badge | badgeColor | commentaire | image | ordre | publie |
|---|---|---|---|---|---|---|
| Allergiques, anticipez vos sorties. | SPÉCIAL ALLERGIE | green | Allerdol Double Action, en rayon. Conseil personnalisé en officine pour anticiper la saison. | promo-allergie.jpg | 1 | oui |
| Le déodorant dès l'adolescence. | ADOLESCENCE | terra | La Rosée Pierre d'Alun. Formule bio, sans aluminium, adaptée aux peaux jeunes. | promo-deodorant.jpg | 2 | oui |
| Avril : la qualité bio à petit prix. | QUALITÉ & PRIX | ocre | Crème de jour à l'huile d'abricot bio, certifiée Cosmos Organic. Une référence du quotidien. | promo-avril-creme.jpg | 3 | oui |
| Anti-moustiques toute la famille. | FAMILLE | terraDeep | Cinq sur Cinq Famille. Formulation douce, adaptée aux enfants. | promo-moustique.jpg | 4 | oui |

### 3. Rendre le sheet lisible par le site

1. Bouton **Partager** en haut à droite
2. Section « Accès général » → changer de « Restreint » à **« Toute personne disposant du lien »**
3. Rôle : **Lecteur** (ne pas mettre Éditeur)
4. Cliquer **Copier le lien**

### 4. Copier l'ID du sheet et le donner au développeur

L'URL ressemble à ça :
```
https://docs.google.com/spreadsheets/d/1abc...XYZ/edit#gid=0
                                       ^^^^^^^^^^
                                       c'est ça l'ID
```

L'ID = la longue chaîne entre `/d/` et `/edit`. La copier et la coller dans le fichier `.env` du projet :

```
NEXT_PUBLIC_SHEET_ID=1abc...XYZ
```

Redémarrer le site → les 4 promos du sheet apparaissent.

---

## Édition au quotidien (par la pharmacienne)

### Modifier une promo existante

1. Ouvrir le Google Sheet
2. Modifier la cellule (titre, commentaire, etc.) directement dans le sheet
3. Sauvegarde automatique côté Google
4. Le site se met à jour dans la minute (cache de 60 secondes)

### Réordonner les promos

Changer le nombre dans la colonne **ordre** (1 = en premier, 2 = en deuxième, etc.).

### Cacher une promo sans la supprimer

Mettre **non** dans la colonne **publie**. La ligne reste dans le sheet mais n'apparaît plus sur le site. Pour la réafficher, remettre **oui**.

### Ajouter une nouvelle promo

1. Nouvelle ligne en dessous des existantes
2. Remplir toutes les colonnes (cf. table ci-dessus)
3. Pour la photo : voir section suivante

### Changer la photo d'une promo

**Option A — Photo déjà disponible en officine** (workflow normal)

Envoyer la photo au développeur, qui :
1. La met dans le dossier `public/photos/promo/` du site
2. La pharmacienne tape juste le nom du fichier dans la colonne **image** (ex: `nouvelle-promo.jpg`)

**Option B — Photo hébergée ailleurs** (lien direct)

Mettre l'URL complète dans la colonne **image** (ex: `https://drive.google.com/uc?id=...`). Le site la chargera directement. Attention : Drive bloque parfois les images, préférer Imgur ou un autre hébergeur d'images publiques.

---

## Référence des colonnes

| Colonne | Type | Valeurs possibles | Exemple |
|---|---|---|---|
| `titre` | Texte court | Libre | Allergiques, anticipez vos sorties. |
| `badge` | Texte court | Libre, majuscules conseillées | SPÉCIAL ALLERGIE |
| `badgeColor` | Code couleur | `terra`, `green`, `ocre`, `terraDeep` | terra |
| `commentaire` | Phrase | Libre, 1-2 phrases | Allerdol Double Action, en rayon. |
| `image` | Nom de fichier ou URL | `xxx.jpg` ou `https://...` | promo-allergie.jpg |
| `ordre` | Nombre | 1, 2, 3, … | 1 |
| `publie` | Oui / Non | `oui` ou `non` | oui |

**Couleurs de badge disponibles :**
- `terra` = orange terracotta (par défaut)
- `green` = vert sapin (conseil saisonnier, naturel)
- `ocre` = doré (mise en avant qualité/prix)
- `terraDeep` = orange profond (famille, urgence)

---

## Que faire si ça ne marche pas

| Problème | Solution |
|---|---|
| Le site n'affiche pas mes modifs | Attendre 1 minute (cache), puis Ctrl+F5 dans le navigateur |
| Une promo n'apparaît pas | Vérifier que `publie` est bien sur `oui` et que toutes les colonnes obligatoires sont remplies |
| La photo ne s'affiche pas | Vérifier l'orthographe exacte du nom de fichier (sensible à la casse). Demander au développeur de vérifier que la photo existe dans le dossier |
| Le sheet ne se charge plus | Vérifier que le partage est bien sur « Toute personne disposant du lien — Lecteur » |
| Tout est cassé | Appeler le développeur, ne pas paniquer 🙂 |

---

## Sécurité

Le sheet est **public en lecture seule**. Seule la pharmacienne et les personnes à qui elle partage l'accès en édition peuvent modifier le contenu. Les visiteurs du site ne voient que le rendu final, pas le sheet.
