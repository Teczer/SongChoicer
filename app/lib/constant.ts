import { Album, Song } from "./types";

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

export const songs: Song[] = [
  { id: 1, title: "Fortnight (Ft. Post Malone)", views: 3.2 },
  { id: 2, title: "The Tortured Poets Department", views: 2.5 },
  { id: 3, title: "My Boy Only Breaks His Favorite Toys", views: 1.8 },
  { id: 4, title: "Down Bad", views: 2.4 },
  { id: 5, title: "So Long, London", views: 2.6 },
  { id: 6, title: "But Daddy I Love Him", views: 2.4 },
  { id: 7, title: "Fresh Out The Slammer", views: 1.5 },
  // { id: 8, title: "Florida!!! (Ft. Florence + the Machine)", views: 1.7 },
  // { id: 9, title: "Guilty as Sin?", views: 2 },
  // { id: 10, title: "Who's Afraid of Little Old Me?", views: 1.9 },
  // { id: 11, title: "I Can Fix Him (No Really I Can)", views: 1.3 },
  // { id: 12, title: "loml", views: 2.3 },
  // { id: 13, title: "I Can Do It With A Broken Heart", views: 2.1 },
  // { id: 14, title: "The Smallest Man Who Ever Lived", views: 2 },
  // { id: 15, title: "The Alchemy", views: 1.9 },
  // { id: 16, title: "Clara Bow", views: 1.4 },
  // { id: 17, title: "The Black Dog (First Draft Phone Memo)", views: 1.7 },
];
