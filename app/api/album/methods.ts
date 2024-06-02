type Response = SpotifyApi.SingleAlbumResponse | undefined;

export async function getAlbum(albumId: string): Promise<Response> {
  const url = `/api/album?albumId=${albumId}`;
  const res = await fetch(url);
  const search = await res.json();

  return search;
}
