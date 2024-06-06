import { MAX_DUEL } from '@/config'
import {
  findFirstDuelsOfASongWithoutAnotherSongId,
  isDuelInList,
} from './duel-song-search'
import { countHowMuchTimeThisSoungAppear, shuffleArray } from './utils'

// - On part d'un tableau vide et on ajoute des duels jusqu'à atteindre le nombre max de duels
// - Si le nombre MAX_POSSIBLE_DUEL est inférieur ou égale au nombre MAX_DUEL on renvoi directement la liste
// - On boucle jusqu'à avoir MAX_DUEL et on pioche dans les duels qui ne sont pas encore présent en priorisant les sons les moins présent.
export function generateDuels(songs: Song[]): Versus[] {
  const songCount = songs.length

  const allDuelsPossible: Versus[] =
    generateAllPossiblePairWithoutDuplicate(songs)

  shuffleArray(allDuelsPossible)

  if (allDuelsPossible.length <= MAX_DUEL(songCount)) {
    return allDuelsPossible
  }

  const duels: Versus[] = []

  for (let i = 0; i < MAX_DUEL(songCount); i++) {
    const { min: songThatAppearTheLeast, max: songThatAppearTheMost } =
      getTheMinAndMostSongThatAppear(duels)
    const remainingDuels = allDuelsPossible.filter(
      (possibleDuel) => !isDuelInList(possibleDuel, duels),
    )

    const nextDuel = findFirstDuelsOfASongWithoutAnotherSongId(
      songThatAppearTheLeast,
      songThatAppearTheMost,
      remainingDuels,
    )

    if (nextDuel) {
      duels.push(nextDuel)
    }
  }

  return duels
}

export function generateAllPossiblePairWithoutDuplicate(
  songs: Song[],
): Versus[] {
  const pairs: Versus[] = []

  for (let i = 0; i < songs.length; i++) {
    for (let j = i + 1; j < songs.length; j++) {
      pairs.push([songs[i], songs[j]])
    }
  }
  return pairs
}

function getTheMinAndMostSongThatAppear(duels: Versus[]): {
  min: number[]
  max: number[]
} {
  const trackSongUsed = countHowMuchTimeThisSoungAppear(duels)
  const minCount = Math.min(...Object.values(trackSongUsed))
  const maxCount = Math.max(...Object.values(trackSongUsed))
  const songIdsThatAppearTheLeast: number[] = Object.keys(trackSongUsed)
    .filter(
      (key) =>
        trackSongUsed[key as unknown as keyof typeof trackSongUsed] ===
        minCount,
    )
    .map(Number)

  const songIdsThatAppearTheMost: number[] = Object.keys(trackSongUsed)
    .filter(
      (key) =>
        trackSongUsed[key as unknown as keyof typeof trackSongUsed] ===
        maxCount,
    )
    .map(Number)

  return {
    min: songIdsThatAppearTheLeast,
    max: songIdsThatAppearTheMost,
  }
}

// Gonna be implement in v2 when we take account of precedent rank
// type SongWithElo = Song & {
//   scoreElo: number
// }

// const getSongWithoutElo = (songWithElo: SongWithElo): Song => {
//   const { scoreElo, ...song } = songWithElo
//   return song
// }

// export function generateNextDuel(song: SongWithElo[]): Versus {
//   return [getSongWithoutElo(song[0]), getSongWithoutElo(song[1])]
// }
