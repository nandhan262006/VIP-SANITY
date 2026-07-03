import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

let _builder: ReturnType<typeof createImageUrlBuilder>

function getBuilder() {
  if (!_builder) {
    _builder = createImageUrlBuilder({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    })
  }
  return _builder
}

export function urlFor(source: SanityImageSource) {
  return getBuilder().image(source)
}
