'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { compressToEncodedURIComponent } from 'lz-string'

import { calculateNewEloScore, revertEloScore } from '@/lib/calculate-elo-score'
import { generateDuels } from '@/lib/duels'
import { cn } from '@/lib/utils'

import { RxTrackPrevious } from 'react-icons/rx'
import { FaUndoAlt } from 'react-icons/fa'

import { AuroraBackground } from '../ui/aurora-background'
import { Button } from '@/components/ui/button'
import SongButton from '../SongButton'
import ThemeToggleButton from '../ThemeToggleButton'

const isBrowser = typeof window !== 'undefined'

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
  const router = useRouter()
  const [currentDuelIndex, setCurrentDuelIndex] = useState<number>(0)
  const [songsEloScores, setSongsEloScores] = useState(
    Object.fromEntries(songs.map((song) => [song.id, 1000]))
  )
  const [duels, setDuels] = useState<[Song, Song][]>(() => generateDuels(songs))

  const [voteHistory, setVoteHistory] = useState<
    {
      winnerId: number
      loserId: number
      previousWinnerElo: number
      previousLoserElo: number
    }[]
  >([])

  const getSimpleSongsRankings = (): SimpleSong[] => {
    return songs
      .map((song) => ({
        id: song.id,
        title: song.title,
      }))
      .sort((a, b) => songsEloScores[b.id] - songsEloScores[a.id])
  }

  const handleVote = (winnerId: number, loserId: number) => {
    const previousWinnerElo = songsEloScores[winnerId]
    const previousLoserElo = songsEloScores[loserId]
    const { newWinnerElo, newLoserElo } = calculateNewEloScore(
      previousWinnerElo,
      previousLoserElo
    )
    setSongsEloScores((prevEloScores) => ({
      ...prevEloScores,
      [winnerId]: newWinnerElo,
      [loserId]: newLoserElo,
    }))
    setVoteHistory((prevHistory) => [
      ...prevHistory,
      { winnerId, loserId, previousWinnerElo, previousLoserElo },
    ])
    const nextDuelIndex = currentDuelIndex + 1
    setCurrentDuelIndex(nextDuelIndex)

    // Vérifier si le classement est terminé et rediriger si nécessaire
    if (nextDuelIndex >= duels.length) {
      const simpleRankings = compressToEncodedURIComponent(
        JSON.stringify(getSimpleSongsRankings())
      )
      const createParams = `albumName=${compressToEncodedURIComponent(
        albumName
      )}&albumArtist=${compressToEncodedURIComponent(
        albumArtist
      )}&albumCover=${compressToEncodedURIComponent(
        albumCover
      )}&songsRanked=${simpleRankings}`
      router.push(`/resultcard?${createParams}`)
    }
  }

  const handleUndo = () => {
    if (currentDuelIndex > 0) {
      const lastVote = voteHistory[voteHistory.length - 1]
      const { winnerId, loserId, previousWinnerElo, previousLoserElo } =
        lastVote

      const { revertedWinnerElo, revertedLoserElo } = revertEloScore(
        previousWinnerElo,
        previousLoserElo
      )

      // Restaurer les scores ELO précédents en utilisant revertEloScore
      setSongsEloScores((prevEloScores) => ({
        ...prevEloScores,
        [winnerId]: revertedWinnerElo,
        [loserId]: revertedLoserElo,
      }))
      // Supprimer le dernier vote de l'historique
      setVoteHistory((prevHistory) => prevHistory.slice(0, -1))
      // Décrémenter l'index du duel
      setCurrentDuelIndex((prevIndex) => prevIndex - 1)
    }
  }

  const isRankingFinished: boolean = currentDuelIndex >= duels.length
  const [songA, songB] = isRankingFinished
    ? [null, null]
    : duels[currentDuelIndex]

  const completionPercentage = (currentDuelIndex / duels.length) * 100

  return (
    <AuroraBackground className="overflow-hidden pt-0 versuscontainer_pwa">
      <div className="hidden sm:block z-50 absolute top-10 right-20">
        <ThemeToggleButton />
      </div>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className={cn(
          'w-full h-[100svh] text-primary relative flex flex-col gap-4 sm:gap-20 items-center justify-center sm:justify-center'
        )}
      >
        {!isRankingFinished && (
          <>
            <div className="w-full flex justify-start items-center px-4 pl-11 gap-4 sm:justify-center">
              <a className="sm:absolute sm:top-10 sm:left-20" href={'/'}>
                <Button variant="outline" size="icon">
                  <RxTrackPrevious className="h-4 w-4" />
                </Button>
              </a>
              <h1 className="text-lg w-4/6 font-mono font-bold max-h-[40px] text-nowrap text-center overflow-hidden text-ellipsis sm:text-2xl sm:w-auto">
                {albumArtist} • {albumName}
              </h1>
            </div>
            <div className="w-full flex flex-col items-center gap-4">
              <p className="text-lg font-mono font-bold select-none">
                {completionPercentage.toFixed(0)} %
              </p>
              <div className="w-4/5 flex flex-col justify-around items-center gap-20 sm:flex-row">
                {songB && songA && (
                  <SongButton
                    key={songA.id}
                    song={songA}
                    onVote={() => handleVote(songA.id, songB.id)}
                    animationProps={{
                      initial: {
                        opacity: 0,
                        ...(isBrowser && window.innerWidth < 640
                          ? { x: 300 }
                          : { y: 500 }),
                      },
                      animate: { opacity: 1, x: 0, y: 0 },
                      transition: { duration: 0.5, ease: 'easeInOut' },
                    }}
                  />
                )}
                <Button
                  disabled={voteHistory.length === 0}
                  variant="outline"
                  onClick={handleUndo}
                  className="absolute flex items-center justify-start gap-3"
                >
                  <span className="select-none">Previous Duel</span>
                  <FaUndoAlt />
                </Button>
                {songB && songA && (
                  <SongButton
                    key={songB.id}
                    song={songB}
                    onVote={() => handleVote(songB.id, songA.id)}
                    animationProps={{
                      initial: {
                        opacity: 0,
                        ...(isBrowser && window.innerWidth < 640
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
      </motion.div>
    </AuroraBackground>
  )
}

export default SongRanker
