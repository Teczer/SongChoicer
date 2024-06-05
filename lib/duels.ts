import { Song } from '@/app/lib/types'
import { MAX_DUEL } from '@/config'
import { shuffleArray } from './utils'

// Must generate duels with at least all song
export function generateDuels(songs: Song[]): [Song, Song][] {
  const allPairs: [Song, Song][] = []
  const songCount = songs.length

  // Générer toutes les paires uniques possibles
  for (let i = 0; i < songCount; i++) {
    for (let j = i + 1; j < songCount; j++) {
      allPairs.push([songs[i], songs[j]])
    }
  }

  // Mélanger les paires pour une sélection aléatoire
  shuffleArray(allPairs)

  // Utiliser un Set pour suivre les chansons qui apparaissent déjà
  const usedSongs = new Set<Song>()
  const duels: [Song, Song][] = []

  // Sélectionner les duels pour garantir que chaque chanson apparaisse au moins une fois
  for (let i = 0; i < allPairs.length && usedSongs.size < songCount; i++) {
    const [song1, song2] = allPairs[i]
    if (!usedSongs.has(song1) || !usedSongs.has(song2)) {
      duels.push(allPairs[i])
      usedSongs.add(song1)
      usedSongs.add(song2)
    }
  }

  // Ajouter des duels supplémentaires jusqu'à atteindre le maximum
  for (
    let i = 0;
    i < allPairs.length && duels.length < MAX_DUEL(songs.length);
    i++
  ) {
    if (!duels.includes(allPairs[i])) {
      duels.push(allPairs[i])
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
