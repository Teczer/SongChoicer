import { AlbumFull } from 'ytmusic-api';

type Response = AlbumFull | undefined;

export async function getAlbumFromYtbmusicApi(albumId: string): Promise<Response> {
  console.log('albumIdFROM', albumId);
  const url = `/api/ytbmusic/album?albumId=${albumId}`;
  const res = await fetch(url);
  const search = await res.json();

  return search;
}
