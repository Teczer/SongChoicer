import { MAX_DUEL } from '@/config'
import { countHowMuchTimeThisSoungAppear, shuffleArray } from './utils'

export function generateDuels(songs: Song[]): [Song, Song][] {
  const songCount = songs.length

  const allDuelsPossible: [Song, Song][] = Array.from({
    length: songCount,
  }).flatMap((_, i) =>
    Array.from({ length: songCount - i - 1 }, (_, j) => [
      songs[i],
      songs[i + j + 1],
    ])
  ) as [Song, Song][]
  shuffleArray(allDuelsPossible)

  const duels: [Song, Song][] = []
  const seenPairs = new Set<string>()

  const findFirstDuelsOfASong = (
    songIdToFind: number
  ): [Song, Song] | undefined =>
    allDuelsPossible.find(
      ([songA, songB]) =>
        (songA.id === songIdToFind || songB.id === songIdToFind) &&
        !seenPairs.has(`${songA.id}-${songB.id}`) &&
        !seenPairs.has(`${songB.id}-${songA.id}`)
    )

  function findPairWithDesiredIdsAndNoAvoidIds(
    desiredIds: number[],
    avoidIds: number[],
    allDuels: [Song, Song][]
  ): [Song, Song] | undefined {
    return allDuels.find(([songA, songB]) => {
      const includesDesiredId =
        desiredIds.includes(songA.id) || desiredIds.includes(songB.id)
      const noAvoidId =
        !avoidIds.includes(songA.id) && !avoidIds.includes(songB.id)
      const pairNotSeen =
        !seenPairs.has(`${songA.id}-${songB.id}`) &&
        !seenPairs.has(`${songB.id}-${songA.id}`)
      return includesDesiredId && noAvoidId && pairNotSeen
    })
  }

  function findPairWithOnlyDesiredIds(
    desiredIds: number[],
    allDuels: [Song, Song][]
  ): [Song, Song] | undefined {
    return allDuels.find(([songA, songB]) => {
      const bothDesiredIds =
        desiredIds.includes(songA.id) && desiredIds.includes(songB.id)
      const pairNotSeen =
        !seenPairs.has(`${songA.id}-${songB.id}`) &&
        !seenPairs.has(`${songB.id}-${songA.id}`)
      return bothDesiredIds && pairNotSeen
    })
  }

  function findPairWithNoAvoidIds(
    avoidIds: number[],
    allDuels: [Song, Song][]
  ): [Song, Song] | undefined {
    return allDuels.find(([songA, songB]) => {
      const noAvoidId =
        !avoidIds.includes(songA.id) && !avoidIds.includes(songB.id)
      const pairNotSeen =
        !seenPairs.has(`${songA.id}-${songB.id}`) &&
        !seenPairs.has(`${songB.id}-${songA.id}`)
      return noAvoidId && pairNotSeen
    })
  }

  function findFirstDuelsOfASongWithoutAnotherSongId(
    desiredIds: number[],
    avoidIds: number[],
    allDuels: [Song, Song][]
  ): [Song, Song] | undefined {
    let pair = findPairWithDesiredIdsAndNoAvoidIds(
      desiredIds,
      avoidIds,
      allDuels
    )
    if (pair) return pair

    pair = findPairWithOnlyDesiredIds(desiredIds, allDuels)
    if (pair) return pair

    pair = findPairWithNoAvoidIds(avoidIds, allDuels)
    if (pair) return pair

    return allDuels.find(
      ([songA, songB]) =>
        !seenPairs.has(`${songA.id}-${songB.id}`) &&
        !seenPairs.has(`${songB.id}-${songA.id}`)
    )
  }

  songs.map((song) => {
    const duel = findFirstDuelsOfASong(song.id)
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

// export function generateNextDuel(song: SongWithElo[]): [Song, Song] {
//   return [getSongWithoutElo(song[0]), getSongWithoutElo(song[1])]
// }
