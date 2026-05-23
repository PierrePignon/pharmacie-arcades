import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

/**
 * Config du Studio Sanity hosted sur pharmaciedesarcades.sanity.studio.
 *
 * Project ID et dataset sont en dur ici car le Studio hosted ne lit pas
 * les variables d'environnement de Next.js. C'est OK : ce ne sont pas
 * des secrets, ils sont déjà visibles côté client du site.
 */
export default defineConfig({
  name: 'pharmacie-arcades',
  title: 'Pharmacie des Arcades',
  basePath: '/studio',
  projectId: '68isp7mw',
  dataset: 'production',
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: '2024-12-01' })],
})
