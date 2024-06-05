"use client"

import { useState, useEffect, useRef } from "react"
import * as htmlToImage from "html-to-image"

import Link from "next/link"

import { Song } from "@/app/lib/types"

import { motion } from "framer-motion"

import { ModeToggle } from "./theme-toggle-button"

import SongButton from "./SongButton"

import { AuroraBackground } from "./ui/aurora-background"
import { Button } from "@/components/ui/button"
import { RankCard } from "./ui/rankCard"

import { FaShareAlt } from "react-icons/fa"
import { RxTrackPrevious } from "react-icons/rx"
import { GrFormPreviousLink } from "react-icons/gr"

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
  const [currentPairIndex, setCurrentPairIndex] = useState(0)
  const [songPoints, setSongPoints] = useState<Record<number, number>>({})
  const [pairs, setPairs] = useState<Song[][]>([])
  const [voteHistory, setVoteHistory] = useState<number[]>([])
  const rankCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const allPairs = generateAllPairs(songs)
    setPairs(shuffleArray(allPairs))
    initializePoints(songs)
  }, [songs])

  function generateAllPairs(songs: Song[]): Song[][] {
    let pairs = []
    for (let i = 0; i < songs.length; i++) {
      for (let j = i + 1; j < songs.length; j++) {
        pairs.push([songs[i], songs[j]])
      }
    }
    return pairs
  }

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  function initializePoints(songs: Song[]) {
    const points: Record<number, number> = {}
    songs.forEach((song) => {
      points[song.id] = 0
    })
    setSongPoints(points)
  }

  function handleVote(winnerId: number) {
    setSongPoints((prevPoints) => ({
      ...prevPoints,
      [winnerId]: (prevPoints[winnerId] || 0) + 1,
    }))
    setCurrentPairIndex((prevIndex) => prevIndex + 1)
    setVoteHistory((prevHistory) => [...prevHistory, winnerId])
  }

  function handleUndo() {
    if (currentPairIndex > 0) {
      const lastVote = voteHistory[voteHistory.length - 1]
      setVoteHistory((prevHistory) => prevHistory.slice(0, -1))
      setSongPoints((prevPoints) => ({
        ...prevPoints,
        [lastVote]: (prevPoints[lastVote] || 0) - 1,
      }))
      setCurrentPairIndex((prevIndex) => prevIndex - 1)
    }
  }

  function getRankings() {
    return songs.sort(
      (a, b) => (songPoints[b.id] || 0) - (songPoints[a.id] || 0)
    )
  }

  const downloadRankCardAsPNG = () => {
    if (rankCardRef.current) {
      htmlToImage
        .toPng(rankCardRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a")
          link.download = `${albumArtist}_${albumName}_Card.png`
          link.href = dataUrl
          link.click()
        })
        .catch((error) => {
          console.error("Erreur lors de la création de l'image PNG:", error)
        })
    }
  }

  const completionPercentage = (currentPairIndex / pairs.length) * 100

  return (
    <AuroraBackground className="overflow-hidden">
      <div className="hidden sm:block z-50 absolute top-4 right-4 sm:top-10 sm:right-10">
        <ModeToggle />
      </div>
      <a className="z-50 absolute top-4 left-4 sm:top-10 sm:left-20" href={"/"}>
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
          ease: "easeInOut",
        }}
        className={`w-full min-h-screen text-primary relative flex flex-col gap-4 sm:gap-20 items-center pt-6 ${
          currentPairIndex < pairs.length
            ? "justify-start sm:justify-center"
            : "justify-start"
        }`}
      >
        {currentPairIndex < pairs.length ? (
          <>
            <h1 className="text-lg w-4/6 font-mono font-bold max-h-[40px] text-nowrap overflow-hidden text-ellipsis sm:text-2xl sm:w-auto">
              {albumArtist} • {albumName}
            </h1>
            <div className="w-full flex flex-col items-center gap-4">
              <p className="text-lg font-mono font-bold select-none">
                {completionPercentage.toFixed(0)} %
              </p>
              <div className="w-4/5 flex flex-col justify-around items-center gap-16 sm:gap-20 sm:flex-row">
                {pairs[currentPairIndex].map((song, index) => {
                  return (
                    <SongButton
                      key={song.id}
                      song={song}
                      onVote={() => handleVote(song.id)}
                      animationProps={{
                        initial: {
                          opacity: 0,
                          ...(window.innerWidth < 640
                            ? { x: index % 2 === 0 ? 300 : -300 }
                            : { y: index % 2 === 0 ? 500 : -500 }),
                        },
                        animate: { opacity: 1, x: 0, y: 0 },
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                    />
                  )
                })}
                <Button
                  size={"icon"}
                  className="absolute"
                  variant={"outline"}
                  onClick={handleUndo}
                >
                  <GrFormPreviousLink />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 p-10">
            <div key={albumName} ref={rankCardRef}>
              <RankCard
                albumName={albumName}
                albumArtist={albumArtist}
                songPoints={songPoints}
                ranking={getRankings()}
                albumCover={`${albumCover}?v=${new Date().getTime()}`}
              />
            </div>
            <div className="hidden sm:flex items-center justify-center gap-2">
              <Button variant={"outline"} onClick={downloadRankCardAsPNG}>
                Download Card
              </Button>
              <Button size={"icon"} variant={"outline"}>
                <FaShareAlt />
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </AuroraBackground>
  )
}

export default SongRanker
