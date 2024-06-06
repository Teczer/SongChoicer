interface Song {
  id: number
  title: string
  image: {
    height?: number
    url: string
    width?: number
  }
}

type Album = SpotifyApi.AlbumObjectSimplified
