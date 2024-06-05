type Response = SpotifyApi.AlbumObjectSimplified[] | undefined

export async function searchFromApi(query: string): Promise<Response> {
  const url = `/api/search?query=${query}`
  const res = await fetch(url)
  const search = await res.json()

  return search
}
