export const apiVersion = '2024-12-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Variable d\'environnement manquante : NEXT_PUBLIC_SANITY_DATASET (généralement "production")',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Variable d\'environnement manquante : NEXT_PUBLIC_SANITY_PROJECT_ID (à récupérer sur sanity.io)',
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage)
  return v
}
