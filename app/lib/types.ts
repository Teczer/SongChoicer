// Définition des types pour les chansons et les états
export interface Song {
  id: number;
  title: string;
  views: number;
}

export interface SongRankerProps {
  songs: Song[];
}
