'use client'

import SongRanker from '@/components/SongRanker'

export default function Home() {
  const songs: Song[] = Array.from({ length: 4 })
    .fill(null)
    .map((_, index) => ({
      id: index,
      title: `Titre ${index}`,
      image: {
        url: 'https://i.scdn.co/image/ab67616d0000b2732ac57e231c742bda1ef89d3c',
        width: 640,
        height: 640,
      },
    }))

  const album = {
    albumName: 'Que la famille',
    albumArtist: 'PNL',
    albumCover:
      'https://i.scdn.co/image/ab67616d0000b2732ac57e231c742bda1ef89d3c',
  }

  return <SongRanker songs={songs} album={album} />
}
