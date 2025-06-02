import { AlbumDetailed } from 'ytmusic-api';

type Response = AlbumDetailed[] | undefined;

export async function searchFromYtbmusicApi(query: string): Promise<Response> {
  const url = `/api/ytbmusic/search?q=${query}`;
  const res = await fetch(url);
  const search = await res.json();

  return search;
}
