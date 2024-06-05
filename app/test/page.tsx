"use client"

import { Song } from "@/app/lib/types"

import SongRanker from "@/components/SongRanker"

export default function Home() {
  const songs: Song[] = Array.from({ length: 10 })
    .fill(null)
    .map((_, index) => ({
      id: index,
      title: `Titre ${index}`,
      image: {
        url: "https://i.scdn.co/image/ab67616d0000b2732ac57e231c742bda1ef89d3c",
        width: 640,
        height: 640,
      },
    }))

  return (
    <SongRanker
      songs={songs}
      albumCover={
        "https://i.scdn.co/image/ab67616d0000b2732ac57e231c742bda1ef89d3c"
      }
      albumName={"Que la famille"}
      albumArtist={"PNL"}
    />
  )
}
