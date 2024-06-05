import { Song } from '@/app/lib/types'
import { MAX_DUEL } from '@/config'
import { shuffleArray } from './utils'

export const countHowMuchTimeThisSoungAppear = (songs: [Song, Song][]) => {
  let idCount: Record<number, number> = {}
  songs.forEach((subArr) => {
    subArr.forEach((obj) => {
      if (idCount[obj.id]) {
        idCount[obj.id]++
      } else {
        idCount[obj.id] = 1
      }
    })
  })
  return idCount
}
// Must generate duels with at least all song
export function generateDuels(songs: Song[]): [Song, Song][] {
  const songCount = songs.length

  // Tout les duels possibles.
  // [QLF, Naha, Bene] ->
  // [QLF, Naha]
  // [QLF, Bene]
  // [Bene, Naha]
  const allDuelsPossible: [Song, Song][] = Array.from({
    length: songCount,
  }).flatMap((_, i) =>
    Array.from({ length: songCount - i - 1 }, (_, j) => [
      songs[i],
      songs[i + j + 1],
    ])
  ) as [Song, Song][]
  shuffleArray(allDuelsPossible)

  // On veux retourner MAX_N duel.
  // Avec au moin chaque son dans duels
  const duels: [Song, Song][] = []

  const findFirstDuelsOfASong = (songIdToFind: number): [Song, Song] =>
    allDuelsPossible.find(
      ([songA, songB]) => songA.id === songIdToFind || songB.id === songIdToFind
    ) as [Song, Song]

  // Trouve la première paire de chansons contenant au moins un ID désiré et aucun ID à éviter
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
      return includesDesiredId && noAvoidId
    })
  }

  // Trouve la première paire de chansons contenant uniquement des IDs désirés
  function findPairWithOnlyDesiredIds(
    desiredIds: number[],
    allDuels: [Song, Song][]
  ): [Song, Song] | undefined {
    return allDuels.find(([songA, songB]) => {
      const bothDesiredIds =
        desiredIds.includes(songA.id) && desiredIds.includes(songB.id)
      return bothDesiredIds
    })
  }

  // Trouve la première paire de chansons contenant uniquement des IDs non désirés
  function findPairWithNoAvoidIds(
    avoidIds: number[],
    allDuels: [Song, Song][]
  ): [Song, Song] | undefined {
    return allDuels.find(([songA, songB]) => {
      const noAvoidId =
        !avoidIds.includes(songA.id) && !avoidIds.includes(songB.id)
      return noAvoidId
    })
  }

  // Fonction principale pour trouver une paire de chansons en fonction des critères donnés
  function findFirstDuelsOfASongWithoutAnotherSongId(
    desiredIds: number[],
    avoidIds: number[],
    allDuels: [Song, Song][]
  ): [Song, Song] {
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

    // Si aucune paire n'est trouvée, renvoie simplement la première paire disponible
    return allDuels[0]
  }

  songs.map((song) => {
    duels.push(findFirstDuelsOfASong(song.id))
    shuffleArray(allDuelsPossible)
  })

  // At this stade we have songs.length as possible duel
  // So we need to fill maximumDuel - songs.length
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

    duels.push(possiblePairToAdd)
    shuffleArray(allDuelsPossible)
    trackSongUsed = countHowMuchTimeThisSoungAppear(duels)

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
