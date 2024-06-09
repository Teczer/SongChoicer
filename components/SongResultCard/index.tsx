'use client'

import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'

import * as htmlToImage from 'html-to-image'

import { FaShareAlt } from 'react-icons/fa'
import { RxTrackPrevious } from 'react-icons/rx'

import { Button } from '../ui/button'
import { RankCard } from '../RankCard'
import ThemeToggleButton from '../ThemeToggleButton'

export default function SongResultCard() {
  const searchParams = useSearchParams()
  const albumName = searchParams.get('albumName') || ''
  const albumArtist = searchParams.get('albumArtist') || ''
  const albumCover = searchParams.get('albumCover') || ''
  const songsRanked = JSON.parse(searchParams.get('songsRanked') || '[]')

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

  // STATIC DATA
  // const albumname = 'W.A.R'
  // const albumArtist = 'Roshi'
  // const albumCover =
  //   'https://i.scdn.co/image/ab67616d0000b2732ac57e231c742bda1ef89d3c'
  // const songsRanked = [
  //   { id: 0, title: 'Titre 1' },
  //   { id: 1, title: 'Titre 2' },
  //   { id: 2, title: 'Titre 3' },
  // ]

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start gap-4 px-2">
      <div className="w-full flex justify-between items-center px-4">
        <a className="sm:absolute sm:w-auto sm:top-10 sm:left-16" href={'/'}>
          <Button variant="outline" size="icon">
            <RxTrackPrevious className="h-4 w-4" />
          </Button>
        </a>
        <div className="sm:z-50 sm:absolute sm:top-10 sm:right-10">
          <ThemeToggleButton />
        </div>
      </div>
      <div className="w-full" key={albumName} ref={rankCardRef}>
        <RankCard
          albumName={albumName}
          albumArtist={albumArtist}
          songsRanked={songsRanked}
          albumCover={albumCover}
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
