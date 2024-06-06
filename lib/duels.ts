import { MAX_DUEL } from '@/config'
import { countHowMuchTimeThisSoungAppear, shuffleArray } from './utils'
import {
  findFirstDuelsOfASong,
  findFirstDuelsOfASongWithoutAnotherSongId,
  isSongInVersus,
} from './duel-song-search'

export function generateDuels(songs: Song[]): Versus[] {
  const songCount = songs.length

  const allDuelsPossible: Versus[] = Array.from({
    length: songCount,
  }).flatMap((_, i) =>
    Array.from({ length: songCount - i - 1 }, (_, j) => [
      songs[i],
      songs[i + j + 1],
    ])
  ) as Versus[]
  shuffleArray(allDuelsPossible)

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
