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

  const findFirstDuelsOfASongWithoutAnotherSongId = (
    desiredId: number[],
    avoidId: number[]
  ): [Song, Song] => {
    const pairSelectionned = allDuelsPossible.find(([songA, songB]) => {
      // Cas 1 magie, la pair est présente dans les 2 id les moin selectionné
      const bothPairIdWeWant =
        desiredId.includes(songA.id) && desiredId.includes(songB.id)
      if (bothPairIdWeWant) {
        return true
      }

      // Cas 2 :
      // La pair a un id qui est dans les moin sélectionné et l'autre id qui n'est pas dans les + selectionné
      const atLeastOneIdWeWant =
        desiredId.includes(songA.id) || desiredId.includes(songB.id)
      const idIsNotInBlackList =
        avoidId.includes(songA.id) || avoidId.includes(songB.id)

      if (atLeastOneIdWeWant && idIsNotInBlackList) {
        return true
      }
      // Cas 3 :
      // [] - [7, 8,]
      // Il n'y a pas de pair avec au moin 1 id des moins selectionné, on va donc chercher uniquement une pair dans les id qui sont pas le + selectionné
      if (idIsNotInBlackList) {
        return true
      }

      return false
    })

    return pairSelectionned
      ? pairSelectionned
      : findFirstDuelsOfASong(desiredId[0])

    // Cas 2:
    // Sad le cas 1 n'existe pas donc on veux un son qui est dans songIdsThatWeWant mais SURTOUT PAS dans songIdsThatWeDontWant
    const pairWithoutIdsThatWeDontWant = allDuelsPossible.find(
      ([songA, songB]) => {
        const isIdThatWeWant =
          songIdsThatWeWant.includes(songA.id) ||
          songIdsThatWeWant.includes(songB.id)
        const isIdThatWeDontWant =
          songIdsThatWeDontWant.includes(songA.id) ||
          songIdsThatWeDontWant.includes(songB.id)

        return isIdThatWeWant && !isIdThatWeDontWant
      }
    )

    return possiblePair
      ? possiblePair
      : findFirstDuelsOfASong(songIdsThatWeWant[0])
    // const possiblePair = allDuelsPossible.find(
    //   ([songA, songB]) =>
    //     (songA.id === songIdToFind || songB.id === songIdToFind) &&
    //     songA.id !== songIdToAvoid &&
    //     songB.id !== songIdToAvoid
    // )
    // return possiblePair ? possiblePair : findFirstDuelsOfASong(songIdToFind)
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
      songIdsThatAppearTheMost
    )
    console.group(`---- -----`)
    console.log(`L'id du son que apparait le moin`, songIdsThatAppearTheLeast)
    console.log(`L'id du son que apparait le +`, songIdsThatAppearTheMost)
    console.log(`Dans`, trackSongUsed)
    console.log(`Je vais donc ajouter : `, possiblePairToAdd)
    console.groupEnd()

    duels.push(
      findFirstDuelsOfASongWithoutAnotherSongId(
        songIdsThatAppearTheLeast,
        songIdsThatAppearTheMost
      )
    )
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
