import { spotifyApi } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const albumId = searchParams.get('albumId')

  if (!albumId) throw new Error('search: albumId param not provided')

  const clientCredentials = await spotifyApi.clientCredentialsGrant()
  spotifyApi.setAccessToken(clientCredentials.body.access_token)

  const album = await spotifyApi.getAlbum(albumId)
  const response = album.body

  return NextResponse.json(response)
}
