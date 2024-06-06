import React, { useRef } from 'react'

import * as htmlToImage from 'html-to-image'
import { FaShareAlt } from 'react-icons/fa'
import { Button } from '../ui/button'
import { RankCard } from '../RankCard'

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

  const generateImg = async (rankCardRef: any) => {
    let dataUrl = ''
    const minDataLength = 2000000
    let i = 0
    const maxAttempts = 10

    while (dataUrl.length < minDataLength && i < maxAttempts) {
      dataUrl = await htmlToImage.toPng(rankCardRef)
      i += 1
    }

    return dataUrl
  }

  const downloadRankCardAsPNG = async () => {
    if (rankCardRef.current) {
      const dataUrl = await generateImg(rankCardRef.current)
      const link = document.createElement('a')
      link.download = `${albumArtist}_${albumName}_Card.png`
      link.href = dataUrl
      link.click()
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
      <div className="flex items-center justify-center gap-2">
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
