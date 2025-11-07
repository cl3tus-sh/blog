# Cl3tus.sh

Blog personnel développé avec Next.js 16, TypeScript et Tailwind CSS. Un espace pour partager des réflexions sur le code, la tech et la bidouille.

## À propos

Ce blog utilise une architecture basée sur des fichiers Markdown pour le contenu, avec un rendu statique optimisé pour les performances.

**Site web :** [blog.cl3tus.com](https://blog.cl3tus.com)

## Stack technique

- **Framework :** Next.js 16 avec App Router
- **Langage :** TypeScript
- **Styling :** Tailwind CSS 4 + classe-variance-authority
- **UI Components :** Radix UI primitives
- **Markdown :** gray-matter, remark, rehype avec support GFM
- **Code highlighting :** rehype-highlight
- **Icônes :** Lucide React + Tabler Icons

## Structure du projet

```
blog/
├── src/
│   ├── app/              # Pages et routes Next.js
│   │   ├── page.tsx      # Page d'accueil avec liste des articles
│   │   ├── posts/[slug]/ # Page article dynamique
│   │   ├── tags/         # Pages de tags
│   │   └── a-propos/     # Page à propos
│   ├── components/       # Composants React réutilisables
│   ├── config/           # Configuration du site
│   ├── content/posts/    # Articles en Markdown
│   └── lib/              # Utilitaires et helpers
├── public/               # Assets statiques
└── package.json
```

## Organisation du contenu

Les articles sont organisés dans `src/content/posts/` avec la structure suivante :

```
posts/
└── mon-article/
    ├── index.md          # Contenu de l'article
    └── image.jpg         # Images associées (optionnel)
```

### Format d'un article

Chaque article commence par un front matter YAML :

```markdown
---
title: "Titre de l'article"
date: '2025-01-07'
description: 'Description courte'
tags: ['tech', 'code']
image: 'cover.jpg'
---

Contenu de l'article en Markdown...
```

## Commandes disponibles

```bash
# Installation des dépendances
pnpm install

# Développement local
pnpm dev

# Build de production
pnpm build

# Démarrage en production
pnpm start

# Linting
pnpm lint

# Formatage du code
pnpm format
```

## Fonctionnalités

- Liste des articles triés par date
- Filtrage par tags
- Table des matières générée automatiquement
- Thème clair/sombre
- Coloration syntaxique du code
- Support Markdown étendu (GFM)
- RSS feed (`/rss.xml`)
- Images optimisées par article
- Design responsive

## Développement

Le site utilise le système de routing de Next.js App Router. Les routes principales :

- `/` - Liste des articles
- `/posts/[slug]` - Page d'un article
- `/tags` - Liste des tags
- `/tags/[tag]` - Articles filtrés par tag
- `/a-propos` - Page à propos
- `/rss.xml` - Flux RSS

## Configuration

La configuration du site se trouve dans [src/config/site.ts](src/config/site.ts) :

- Informations du site (nom, description, URL)
- Données de l'auteur
- Liens sociaux
- Navigation principale

## Licence

Ce projet est publié sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer, sans garantie. Voir le fichier `LICENSE` pour plus de détails.

> **Note :** Le contenu des articles publiés sur ce blog n'est pas autorisé à la reproduction ou à la copie sans autorisation explicite de l'auteur.
