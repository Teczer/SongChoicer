import { Album } from "@/app/lib/types";
import { NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) throw new Error("search: query param not provided");

  const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  };

  const spotifyApi = new SpotifyWebApi(credentials);
  const clientCredentials = await spotifyApi.clientCredentialsGrant();

  spotifyApi.setAccessToken(clientCredentials.body.access_token);

  const search = await spotifyApi.search(query, ["album"]);

  const response = search.body.albums?.items;
  return NextResponse.json(response);
}
