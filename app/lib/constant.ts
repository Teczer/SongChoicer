import { Album } from "./types";

export const fakeResults: Album[] = [
  {
    id: "1",
    title: "Futée",
    "artist-credit": [{ name: "Zinée" }],
    date: "2021-06-01",
    coverInfo: {
      images: [
        {
          front: true,
          image:
            "https://musicbrainz.org/release/7fc50d05-4d6b-4f78-91c1-28f8751c1a79/24626714653.jpg",
        },
      ],
    },
    "track-count": 10,
  },
  {
    id: "2",
    title: "Cobalt",
    "artist-credit": [{ name: "Zinée" }],
    date: "2022-06-02",
    coverInfo: {
      images: [
        {
          front: true,
          image:
            "https://images.genius.com/61393fc6c11d021fde417d4baf45d9c9.600x600x1.jpg",
        },
      ],
    },
    "track-count": 10,
  },
  {
    id: "3",
    title: "Osmin",
    "artist-credit": [{ name: "Zinée" }],
    date: "2024-06-03",
    coverInfo: {
      images: [
        {
          front: true,
          image:
            "https://images.genius.com/ec3f6328b2325f883eec46f22eb6ffa3.1000x1000x1.jpg",
        },
      ],
    },
    "track-count": 10,
  },
];
