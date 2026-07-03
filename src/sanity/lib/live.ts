import { client } from './client'

type Params = Record<string, unknown>

interface SanityFetchOptions {
  query: string
  params?: Params
  stega?: boolean
  perspective?: 'published' | 'raw' | 'drafts'
}

export async function sanityFetch<Q = any>({
  query,
  params,
  stega,
  perspective,
}: SanityFetchOptions): Promise<{ data: Q }> {
  const data = await client().fetch<Q>(query, params || {}, {
    stega: stega ?? false,
    perspective: perspective ?? 'published',
  })
  return { data } as { data: Q }
}
