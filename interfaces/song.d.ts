import { AlbumDetailed } from 'ytmusic-api';

interface SimpleSong {
  id: number;
  title: string;
}

interface Song {
  id: number;
  title: string;
  image: {
    height?: number;
    url: string;
    width?: number;
  };
}

type Versus = [Song, Song];

type Album = AlbumDetailed;
