// Définition des types pour les chansons et les états
export interface Song {
  id: number;
  title: string;
  image: {
    height?: number;
    url: string;
    width?: number;
  };
}

export type Album = SpotifyApi.AlbumObjectSimplified;
