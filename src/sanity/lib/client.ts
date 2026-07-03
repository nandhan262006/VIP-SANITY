import { createClient } from 'next-sanity'

function getClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  if (!projectId || !dataset) {
    throw new Error(
      'Sanity environment variables not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.'
    )
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2026-02-01',
    useCdn: true,
    perspective: 'published',
    stega: {
      enabled: process.env.NEXT_PUBLIC_SANITY_STEGA === 'true',
      studioUrl: '/studio',
    },
  })
}

let _client: ReturnType<typeof createClient>

export function client() {
  if (!_client) {
    _client = getClient()
  }
  return _client
}

export function ensureClient() {
  return client()
}
