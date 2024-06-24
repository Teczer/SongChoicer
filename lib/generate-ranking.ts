import { compressToEncodedURIComponent } from 'lz-string'

export const generateSongsRankingURI = (
  songsWithEloScores: SongWithEloScore[],
  albumInfos: {
    albumName: string
    albumArtist: string
    albumCover: string
  }
) => {
  const songRanking = songsWithEloScores
    .map(({ song }) => ({
      id: song.id,
      title: song.title,
    }))
    .sort(
      (a, b) =>
        songsWithEloScores.find(({ song }) => song.id === b.id)!.eloScore -
        songsWithEloScores.find(({ song }) => song.id === a.id)!.eloScore
    )

  const simpleRankings = compressToEncodedURIComponent(
    JSON.stringify(songRanking)
  )

  const albumNameCompress = compressToEncodedURIComponent(albumInfos.albumName)
  const albumArtistCompress = compressToEncodedURIComponent(
    albumInfos.albumArtist
  )
  const albumCoverCompress = compressToEncodedURIComponent(
    albumInfos.albumCover
  )
  const createParams = `albumName=${albumNameCompress}&albumArtist=${albumArtistCompress}&albumCover=${albumCoverCompress}&songsRanked=${simpleRankings}`

  return createParams
}
