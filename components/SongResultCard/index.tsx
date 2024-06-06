import React, { useRef } from 'react'

import * as htmlToImage from 'html-to-image'

import { Song } from '@/app/lib/types'

import { FaShareAlt } from 'react-icons/fa'
import { RankCard } from '../RankCard'
import { Button } from '../ui/button'

type SongResultCardProps = {
  albumArtist: string
  albumName: string
  albumCover: string
  songsRanked: Song[]
}
export default function SongResultCard({
  albumArtist,
  albumName,
  songsRanked,
  albumCover,
}: SongResultCardProps) {
  const rankCardRef = useRef<HTMLDivElement>(null)

  const downloadRankCardAsPNG = () => {
    if (rankCardRef.current) {
      htmlToImage
        .toPng(rankCardRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = `${albumArtist}_${albumName}_Card.png`
          link.href = dataUrl
          link.click()
        })
        .catch((error) => {
          console.error("Erreur lors de la création de l'image PNG:", error)
        })
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start gap-4 pt-14 px-2 sm:justify-center">
      <div className="w-full" key={albumName} ref={rankCardRef}>
        <RankCard
          albumName={albumName}
          albumArtist={albumArtist}
          songRanked={songsRanked}
          albumCover={`${albumCover}?v=${new Date().getTime()}`}
        />
      </div>
      <div className="hidden sm:flex items-center justify-center gap-2">
        <Button variant={'outline'} onClick={downloadRankCardAsPNG}>
          Download Card
        </Button>
        <Button size={'icon'} variant={'outline'}>
          <FaShareAlt />
        </Button>
      </div>
    </div>
  )
}
