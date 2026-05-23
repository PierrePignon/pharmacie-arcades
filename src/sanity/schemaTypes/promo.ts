import { defineField, defineType } from 'sanity'

export const promo = defineType({
  name: 'promo',
  title: 'Mise en avant',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
      description: 'Phrase courte qui s\'affiche en gros (ex: « Allergiques, anticipez vos sorties. »)',
    }),
    defineField({
      name: 'badge',
      title: 'Étiquette',
      type: 'string',
      description: 'Petit badge coloré en haut à gauche (ex: « SPÉCIAL ALLERGIE »). Optionnel.',
    }),
    defineField({
      name: 'badgeColor',
      title: 'Couleur de l\'étiquette',
      type: 'string',
      options: {
        list: [
          { title: 'Terra (orange terracotta)', value: 'terra' },
          { title: 'Green (vert sapin)', value: 'green' },
          { title: 'Ocre (doré)', value: 'ocre' },
          { title: 'Terra deep (orange profond)', value: 'terraDeep' },
        ],
        layout: 'radio',
      },
      initialValue: 'terra',
    }),
    defineField({
      name: 'commentaire',
      title: 'Commentaire',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: 'Phrase de description (1-2 phrases sobres).',
    }),
    defineField({
      name: 'image',
      title: 'Photo du produit',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'Format carré idéal. Fond clair de préférence.',
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 1,
      description: '1 = en premier sur la home, 2 = en deuxième, etc.',
    }),
    defineField({
      name: 'publie',
      title: 'Publié sur la home',
      type: 'boolean',
      initialValue: true,
      description: 'Décocher pour cacher la promo sans la supprimer.',
    }),
  ],
  preview: {
    select: { title: 'titre', subtitle: 'badge', media: 'image' },
  },
  orderings: [
    { title: 'Ordre d\'affichage', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
})
