import createImageUrlBuilder from '@sanity/image-url'
import type { Image as SanityImage } from 'sanity'
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImage) => builder.image(source)
