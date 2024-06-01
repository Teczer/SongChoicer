// Définition des types pour les chansons et les états
export interface Song {
  id: number;
  title: string;
  views: number;
}

export interface SongRankerProps {
  songs: Song[];
}

export interface Album {
  id: string;
  title: string;
  "artist-credit": { name: string }[];
  date: string;
  coverInfo: {
    images: { front: boolean; image: string }[];
  };
  "track-count": number;
}
