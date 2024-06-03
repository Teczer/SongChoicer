export type AlbumResponse = SpotifyApi.SingleAlbumResponse | undefined;

export async function getAlbum(albumId: string): Promise<AlbumResponse> {
  const url = `/api/album?albumId=${albumId}`;
  const res = await fetch(url);
  const search = await res.json();

  return search;
}
