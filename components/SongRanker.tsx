'use client'

import { useState } from 'react'

import { Song } from '@/app/lib/types'

import { motion } from 'framer-motion'

import { ModeToggle } from './theme-toggle-button'

import SongButton from './SongButton'

import { Button } from '@/components/ui/button'
import { AuroraBackground } from './ui/aurora-background'

import { calculateNewEloScore } from '@/lib/calculate-elo-score'
import { generateDuels } from '@/lib/duels'
import { cn } from '@/lib/utils'
import { RxTrackPrevious } from 'react-icons/rx'
import SongResultCard from './SongResultCard'

interface SongRankerProps {
  songs: Song[]
  albumCover: string
  albumName: string
  albumArtist: string
}

const SongRanker: React.FC<SongRankerProps> = ({
  songs,
  albumCover,
  albumName,
  albumArtist,
}) => {
  const [currentDuelIndex, setCurrentDuelIndex] = useState<number>(0)
  const [songsEloScores, setSongsEloScores] = useState(
    Object.fromEntries(songs.map((song) => [song.id, 1000])),
  )

  const handleVote = (winnerId: number, loserId: number) => {
    const winnerElo = songsEloScores[winnerId]
    const loserElo = songsEloScores[loserId]
    const { newWinnerElo, newLoserElo } = calculateNewEloScore(
      winnerElo,
      loserElo,
    )
    setSongsEloScores((prevEloScores) => ({
      ...prevEloScores,
      [winnerId]: newWinnerElo,
      [loserId]: newLoserElo,
    }))

    setCurrentDuelIndex((prevIndex) => (prevIndex || 0) + 1)
  }

  // On fait en sorte qu'on vois au moins tout les sons.
  const duels: [Song, Song][] = generateDuels(songs)

  const [songA, songB] =
    currentDuelIndex === null ? [] : duels[currentDuelIndex]

  const getRankings = (): Song[] => {
    return songs.sort(
      (songA, songB) => songsEloScores[songB.id] - songsEloScores[songA.id],
    )
  }

  const completionPercentage =
    currentDuelIndex === null ? 100 : (currentDuelIndex / songs.length) * 100
  const isRankingFinished: boolean = currentDuelIndex === songs.length

  return (
    <AuroraBackground className="overflow-hidden">
      <div className="hidden sm:block z-50 absolute top-4 right-4 sm:top-10 sm:right-10">
        <ModeToggle />
      </div>
      <a className="z-50 absolute top-4 left-4 sm:top-10 sm:left-20" href={'/'}>
        <Button variant="outline" size="icon">
          <RxTrackPrevious className="h-4 w-4" />
        </Button>
      </a>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className={cn(
          'w-full min-h-screen text-primary relative flex flex-col gap-4 sm:gap-20 items-center pt-6 justify-start',
          {
            'sm:justify-center': isRankingFinished,
          },
        )}
      >
        {!isRankingFinished && (
          <>
            <h1 className="text-lg w-4/6 font-mono font-bold max-h-[40px] text-nowrap overflow-hidden text-ellipsis sm:text-2xl sm:w-auto">
              {albumArtist} • {albumName}
            </h1>
            <div className="w-full flex flex-col items-center gap-4">
              <p className="text-lg font-mono font-bold select-none">
                {completionPercentage.toFixed(2)} %
              </p>
              <div className="w-4/5 flex flex-col justify-around items-center gap-16 sm:gap-20 sm:flex-row">
                {songB && songA && (
                  <SongButton
                    key={songA.id}
                    song={songA}
                    onVote={() => handleVote(songA.id, songB.id)}
                    animationProps={{
                      initial: {
                        opacity: 0,
                        ...(window.innerWidth < 640 ? { x: 300 } : { y: 500 }),
                      },
                      animate: { opacity: 1, x: 0, y: 0 },
                      transition: { duration: 0.5, ease: 'easeInOut' },
                    }}
                  />
                )}

                {songB && songA && (
                  <SongButton
                    key={songB.id}
                    song={songB}
                    onVote={() => handleVote(songB.id, songA.id)}
                    animationProps={{
                      initial: {
                        opacity: 0,
                        ...(window.innerWidth < 640
                          ? { x: -300 }
                          : { y: -500 }),
                      },
                      animate: { opacity: 1, x: 0, y: 0 },
                      transition: { duration: 0.5, ease: 'easeInOut' },
                    }}
                  />
                )}
              </div>
            </div>
          </>
        )}

        {isRankingFinished && (
          <SongResultCard
            albumArtist={albumArtist}
            albumName={albumName}
            albumCover={albumCover}
            songsRanked={getRankings()}
          />
        )}
      </motion.div>
    </AuroraBackground>
  )
}

export default SongRanker
