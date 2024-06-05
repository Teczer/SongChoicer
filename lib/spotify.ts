import SpotifyWebApi from 'spotify-web-api-node'

const credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
}

export const spotifyApi = new SpotifyWebApi(credentials)
