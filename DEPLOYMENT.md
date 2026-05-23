# Déploiement & comptes

Document de référence pour les choix d'hébergement et les comptes utilisés.

## Comptes utilisés

| Service | Email / compte | Rôle |
|---|---|---|
| Hébergement (Vercel ou Cloudflare) | **pierre.pignon09@gmail.com** | propriétaire du déploiement |
| GitHub | à définir | repo du projet |
| Base de données (Neon Postgres ou autre) | à définir | base de prod Payload |
| Nom de domaine | à acheter | `pharmacie-des-arcades.fr` (suggestion) |

## Choix d'hébergement — analyse

### Pourquoi pas Cloudflare Pages par défaut ?

Question légitime, surtout que tu as déjà un compte Cloudflare. Voici les faits :

**Cloudflare Pages** est imbattable pour :
- Bandwidth illimité gratuit (Vercel limite à 100 GB/mois sur le free tier)
- CDN global ultra-rapide
- Multi-sites gratuit illimité (idéal si tu lances 5-10 projets)

**MAIS** Cloudflare Pages a un gros défaut pour notre cas : il fait tourner Next.js sur **Cloudflare Workers**, un runtime JavaScript edge qui n'est **pas un vrai Node.js**. Or **Payload CMS a besoin d'un Node.js complet** pour son admin (filesystem, drivers DB, image processing avec Sharp, etc.).

Concrètement, ça donne deux options sur Cloudflare :
1. **Adapter `@opennextjs/cloudflare`** : marche pour le frontend mais Payload admin pose problème (Sharp non supporté nativement, certaines DB drivers cassent)
2. **Frontend sur Cloudflare Pages + backend Payload sur autre service** : ça marche mais on double l'infra et la complexité

**Vercel** au contraire est conçu par les auteurs de Next.js et a une intégration native Payload — zéro config.

### Recommandation honnête selon ton scénario

#### Cas 1 — Tu lances seulement la pharmacie pour l'instant
→ **Vercel Free** + **Neon Postgres Free**.
Coût total : 0 €/mois.
Limites largement suffisantes pour une pharmacie de village (100 GB bandwidth = ~50 000 visites/mois).

#### Cas 2 — Tu lances 3-10 projets dans l'année (plombier, pharmacie, etc.)
→ **VPS Hetzner CX22** à **4,15 €/mois**.
Un seul VPS héberge tous tes sites Next.js + Payload via Coolify ou Dokploy (panel one-click).
Bandwidth illimité, bases de données illimitées, zéro vendor lock-in.
C'est ce que je te recommande dès que tu dépasses 2 projets.

#### Cas 3 — Tu insistes pour Cloudflare
Possible mais avec compromis :
- Frontend (le site public) sur **Cloudflare Pages**
- Payload admin + DB sur un **VPS** ou **Railway** ($5/mois)
- Communication via API REST entre les deux

Plus complexe à maintenir, donc je conseille de l'éviter sauf raison forte.

### Ma reco finale

**Pour la pharmacie maintenant** : Vercel + Neon Postgres (0 €/mois, prêt en 10 min).

**Quand tu auras 3+ projets** : on bascule tout sur un **VPS Hetzner partagé** (4 €/mois pour tous tes sites combinés). On garde Cloudflare pour le DNS, le proxy et le CDN par-dessus (Cloudflare Free DNS reste excellent pour ça).

## Procédure de déploiement Vercel (à faire le moment venu)

```bash
# 1. Push le projet sur GitHub
git init
git add .
git commit -m "Initial commit"
gh repo create pharmacie-arcades --private --source=. --push

# 2. Sur Vercel (avec le compte pierre.pignon09@gmail.com)
#    - Import Project → pharmacie-arcades
#    - Framework : Next.js (auto-détecté)
#    - Root directory : pharmacie-arcades-app

# 3. Variables d'environnement à définir sur Vercel
DATABASE_URI=postgres://...     # URL Neon Postgres
PAYLOAD_SECRET=<random 32 chars> # à générer

# 4. Sur Neon (compte à créer ou réutiliser, avec pierre.pignon09@gmail.com)
#    - Nouveau projet "pharmacie-arcades"
#    - Copier l'URL de connexion → DATABASE_URI sur Vercel

# 5. Premier déploiement : auto au push GitHub
# 6. Au premier accès /admin, créer le compte titulaire
```

## DNS & nom de domaine

Quand le domaine sera acheté (idéalement `pharmacie-des-arcades.fr` chez OVH ou Gandi) :

1. Ajouter le domaine dans **Cloudflare** (compte pierre.pignon09@gmail.com) — DNS gratuit, proxy CDN inclus
2. Pointer les serveurs DNS du registrar (OVH/Gandi) vers ceux de Cloudflare
3. Sur Vercel : ajouter le domaine → Vercel donne un enregistrement CNAME → l'ajouter dans Cloudflare
4. Vérifier que le proxy Cloudflare (orange cloud) est activé pour bénéficier du CDN sans surcoût

Avec cette config tu utilises **Vercel pour l'app**, **Cloudflare pour le DNS/CDN/proxy**. Le meilleur des deux mondes.

## Suivi des sites

Quand tu auras plusieurs projets, garde ce tableau à jour :

| Projet | URL | Hébergeur | DB | Compte |
|---|---|---|---|---|
| Pharmacie des Arcades | _à venir_ | Vercel | Neon | pierre.pignon09@gmail.com |
| Plomberie Diego Rodriguez | _à voir_ | _?_ | _?_ | pierre.pignon09@gmail.com |
