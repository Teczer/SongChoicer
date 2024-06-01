"use client";

import React, { useState, useEffect } from "react";
import SongButton from "./SongButton";
import { Song, SongRankerProps } from "../lib/types";
import { Button } from "@/components/ui/button";

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
      const tiedSongs = [];
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
    <div className="min-h-screen max-w-screen-2xl mx-auto flex flex-col items-center justify-center gap-28 border border-gray-200 rounded-md p-4">
      <h1 className="text-2xl font-bold">Votez pour votre chanson préférée</h1>
      <p className="text-lg">
        Progression : {completionPercentage.toFixed(2)}%
      </p>
      {currentPairIndex < pairs.length ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            {pairs[currentPairIndex].map((song) => (
              <SongButton
                key={song.id}
                song={song}
                onVote={() => handleVote(song.id)}
              />
            ))}
            {!isTieBreaking && (
              <>
                <Button
                  variant={"secondary"}
                  onClick={() => handleSpecialVote("both")}
                >
                  J&apos;aime les deux
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => handleSpecialVote("none")}
                >
                  Sans opinion
                </Button>
              </>
            )}
          </div>
          <Button variant={"destructive"} onClick={handleUndo}>
            Retour
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
    </div>
  );
};

export default SongRanker;
