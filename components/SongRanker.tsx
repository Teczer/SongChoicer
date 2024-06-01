"use client";

import React, { useState, useEffect } from "react";
import SongButton from "./SongButton";
import { Button } from "@/components/ui/button";
import { Song, SongRankerProps } from "@/app/lib/types";
import { AuroraBackground } from "./ui/aurora-background";
import { motion } from "framer-motion";
import { RxTrackPrevious } from "react-icons/rx";
import Link from "next/link";

const SongRanker: React.FC<SongRankerProps> = ({ songs }) => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [songPoints, setSongPoints] = useState<Record<number, number>>({});
  const [pairs, setPairs] = useState<Song[][]>([]);
  const [voteHistory, setVoteHistory] = useState<(number | "both" | "none")[]>(
    []
  ); // Historique des votes pour permettre le retour en arrière
  const [isTieBreaking, setIsTieBreaking] = useState(false);

  useEffect(() => {
    const allPairs = generateAllPairs(songs);
    setPairs(allPairs);
    initializePoints(songs);
  }, [songs]);

  function generateAllPairs(songs: Song[]): Song[][] {
    let pairs = [];
    for (let i = 0; i < songs.length; i++) {
      for (let j = i + 1; j < songs.length; j++) {
        pairs.push([songs[i], songs[j]]);
      }
    }
    return pairs;
  }

  function initializePoints(songs: Song[]) {
    const points: Record<number, number> = {};
    songs.forEach((song) => {
      points[song.id] = 0;
    });
    setSongPoints(points);
  }

  function handleVote(winnerId: number) {
    setSongPoints((prevPoints) => ({
      ...prevPoints,
      [winnerId]: (prevPoints[winnerId] || 0) + 1,
    }));
    setCurrentPairIndex((prevIndex) => prevIndex + 1);
    setVoteHistory((prevHistory) => [...prevHistory, winnerId]);
  }

  function handleSpecialVote(type: "both" | "none") {
    if (type === "both") {
      const currentSongs = pairs[currentPairIndex];
      setSongPoints((prevPoints) => ({
        ...prevPoints,
        [currentSongs[0].id]: (prevPoints[currentSongs[0].id] || 0) + 1,
        [currentSongs[1].id]: (prevPoints[currentSongs[1].id] || 0) + 1,
      }));
    }
    // 'none' ne change pas les points
    setCurrentPairIndex((prevIndex) => prevIndex + 1);
    setVoteHistory((prevHistory) => [...prevHistory, type]);
  }

  function handleUndo() {
    if (currentPairIndex > 0) {
      const lastVote = voteHistory[voteHistory.length - 1];
      setVoteHistory((prevHistory) => prevHistory.slice(0, -1));

      if (lastVote !== "none" && lastVote !== "both") {
        setSongPoints((prevPoints) => ({
          ...prevPoints,
          [lastVote]: (prevPoints[lastVote] || 0) - 1,
        }));
      } else if (lastVote === "both") {
        const currentSongs = pairs[currentPairIndex - 1];
        setSongPoints((prevPoints) => ({
          ...prevPoints,
          [currentSongs[0].id]: (prevPoints[currentSongs[0].id] || 0) - 1,
          [currentSongs[1].id]: (prevPoints[currentSongs[1].id] || 0) - 1,
        }));
      }
      setCurrentPairIndex((prevIndex) => prevIndex - 1);
    }
  }

  function getRankings() {
    return songs.sort(
      (a, b) => (songPoints[b.id] || 0) - (songPoints[a.id] || 0)
    );
  }

  function checkForTies() {
    const rankings = getRankings();
    const scores = rankings.map((song) => songPoints[song.id]);
    const uniqueScores = new Set(scores);

    if (uniqueScores.size !== rankings.length) {
      // Il y a des égalités
      const tiedSongs: Song[][] = [];
      uniqueScores.forEach((score) => {
        const songsWithSameScore = rankings.filter(
          (song) => songPoints[song.id] === score
        );
        if (songsWithSameScore.length > 1) {
          // Créer toutes les paires possibles pour les chansons à égalité
          for (let i = 0; i < songsWithSameScore.length; i++) {
            for (let j = i + 1; j < songsWithSameScore.length; j++) {
              tiedSongs.push([songsWithSameScore[i], songsWithSameScore[j]]);
            }
          }
        }
      });
      setPairs(tiedSongs);
      setCurrentPairIndex(0); // Réinitialiser l'index pour le vote de départage
      setIsTieBreaking(true);
    }
  }

  const completionPercentage = (currentPairIndex / pairs.length) * 100;

  return (
    <AuroraBackground>
      {/* BUTTON LEAVE */}
      <Link className="absolute top-6 left-6 sm:top-10 sm:left-20" href={"/"}>
        <Button variant="outline" size="icon">
          <RxTrackPrevious className="h-4 w-4" />
        </Button>
      </Link>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="w-full text-primary relative flex flex-col gap-8 items-center justify-center px-4"
      >
        <h1 className="text-2xl font-bold">Vote for your favorite song</h1>
        <p className="text-lg">
          Progression : {completionPercentage.toFixed(2)}%
        </p>
        {currentPairIndex < pairs.length ? (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-4/5 flex justify-around items-center">
              {pairs[currentPairIndex].map((song) => (
                <SongButton
                  key={song.id}
                  song={song}
                  onVote={() => handleVote(song.id)}
                />
              ))}
              {!isTieBreaking && (
                <div className="absolute flex gap-2">
                  <Button
                    variant={"secondary"}
                    onClick={() => handleSpecialVote("both")}
                  >
                    I like both
                  </Button>
                  <Button
                    variant={"secondary"}
                    onClick={() => handleSpecialVote("none")}
                  >
                    No opinion
                  </Button>
                </div>
              )}
            </div>
            <Button variant={"destructive"} onClick={handleUndo}>
              Back
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mt-4">Classement</h2>
            <ul>
              {getRankings().map((song) => (
                <li key={song.id} className="list-disc">
                  {song.title} : {songPoints[song.id]}
                </li>
              ))}
            </ul>
            <h1>YOOOO</h1>
            <Button variant={"outline"} onClick={checkForTies}>
              Vérifier les égalités
            </Button>
          </div>
        )}
      </motion.div>
    </AuroraBackground>
  );
};

export default SongRanker;
