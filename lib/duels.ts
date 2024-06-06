import { MAX_DUEL } from '@/config'
import { countHowMuchTimeThisSoungAppear, shuffleArray } from './utils'
import {
  findFirstDuelsOfASong,
  findFirstDuelsOfASongWithoutAnotherSongId,
  isSongInVersus,
} from './duel-song-search'

// - On part d'un tableau vide et on ajoute des duels jusqu'à atteindre le nombre max de duels
// - Si le nombre MAX_POSSIBLE_DUEL est inférieur ou égale au nombre MAX_DUEL on renvoi directement la liste
// TODO: - Si le nombre MAX_POSSIBLE_DUEL est supérieur au nombre MAX_DUEL, alors on commence à alimenter la liste avec TOUS les sons présent au moins 1 fois.
// TODO: - On comble le reste par des pair de sons qui sont le moins présent
export function generateDuels(songs: Song[]): Versus[] {
  const songCount = songs.length

  const allDuelsPossible: Versus[] =
    generateAllPossiblePairWithoutDuplicate(songs)

  shuffleArray(allDuelsPossible)

  if (allDuelsPossible.length <= MAX_DUEL(songCount)) {
    return allDuelsPossible
  }

  const duels: Versus[] = []
  const seenPairs = new Set<string>()

  songs.map((song) => {
    // const duel = findFirstDuelsOfASong(song.id)
    const duel = allDuelsPossible.find((versus) =>
      isSongInVersus(song.id, versus)
    )

    if (duel) {
      duels.push(duel)
      seenPairs.add(`${duel[0]?.id}-${duel[1]?.id}`)
      shuffleArray(allDuelsPossible)
    }
  })

  let trackSongUsed = countHowMuchTimeThisSoungAppear(duels)

  while (duels.length < MAX_DUEL(songCount)) {
    const minCount = Math.min(...Object.values(trackSongUsed))
    const maxCount = Math.max(...Object.values(trackSongUsed))
    const songIdsThatAppearTheLeast: number[] = Object.keys(trackSongUsed)
      .filter(
        (key) =>
          trackSongUsed[key as unknown as keyof typeof trackSongUsed] ===
          minCount
      )
      .map(Number)

    const songIdsThatAppearTheMost: number[] = Object.keys(trackSongUsed)
      .filter(
        (key) =>
          trackSongUsed[key as unknown as keyof typeof trackSongUsed] ===
          maxCount
      )
      .map(Number)

    const possiblePairToAdd = findFirstDuelsOfASongWithoutAnotherSongId(
      songIdsThatAppearTheLeast,
      songIdsThatAppearTheMost,
      allDuelsPossible
    )

    if (possiblePairToAdd) {
      duels.push(possiblePairToAdd)
      seenPairs.add(`${possiblePairToAdd[0].id}-${possiblePairToAdd[1].id}`)
      shuffleArray(allDuelsPossible)
      trackSongUsed = countHowMuchTimeThisSoungAppear(duels)
    }

    if (duels.length >= MAX_DUEL(songCount)) {
      break
    }
  }

  return duels
}

export function generateAllPossiblePairWithoutDuplicate(
  songs: Song[]
): Versus[] {
  const pairs: Versus[] = []

  for (let i = 0; i < songs.length; i++) {
    for (let j = i + 1; j < songs.length; j++) {
      pairs.push([songs[i], songs[j]])
    }
  }
  return pairs
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
