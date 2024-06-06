import { NextResponse } from 'next/server'
import { spotifyApi } from '@/lib/spotify'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')

  if (!query) throw new Error('search: query param not provided')

  const clientCredentials = await spotifyApi.clientCredentialsGrant()
  spotifyApi.setAccessToken(clientCredentials.body.access_token)

  const search = await spotifyApi.search(query, ['album'], { limit: 8 })

  const response = search.body.albums?.items

  // Créer un Set pour stocker des identifiants uniques d'albums
  const uniqueAlbums = new Set()

  // Filtrer les albums avec au moins 3 pistes et éviter les doublons
  const filteredResponse = response?.filter((item) => {
    const uniqueId = `${item.name}-${item.release_date}-${item.total_tracks}`
    if (item.total_tracks >= 3 && !uniqueAlbums.has(uniqueId)) {
      uniqueAlbums.add(uniqueId)
      return true
    }
    return false
  })

  return NextResponse.json(filteredResponse)
}
