import { NextResponse } from "next/server";
import { MusicBrainzApi, CoverArtArchiveApi } from "musicbrainz-api";

const mbApi = new MusicBrainzApi({
  appName: "Song Choicer",
  appVersion: "1.0",
  appContactInfo: "mehdi.hattou1@gmail.com",
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const artistName = searchParams.get("artistName");
  const albumName = searchParams.get("albumName");

  if (!artistName && !albumName)
    throw new Error("monthlyListeners: artist id not provided");

  console.log("artist", artistName);
  console.log("album", albumName);
  try {
    let results: any[] = [];

    if (artistName && albumName) {
      // Recherche par artiste et album
      const searchQuery = `release:${albumName} AND artist:${artistName}`;
      const searchResults = await mbApi.search("release", {
        query: searchQuery,
        limit: 5,
      });
      results = await Promise.all(
        searchResults.releases.map(async (release: any) => {
          const coverArtArchiveApiClient = new CoverArtArchiveApi();
          const releaseCoverInfo =
            await coverArtArchiveApiClient.getReleaseCovers(release.id);
          return { ...release, coverInfo: releaseCoverInfo };
        })
      );
    } else if (artistName) {
      // Recherche uniquement par artiste
      // Retourne tous les albums de l'artiste
      const searchResults = await mbApi.search("release", {
        query: `artist:${artistName}`,
        limit: 100, // Augmentez la limite pour obtenir tous les albums
      });
      results = await Promise.all(
        searchResults.releases.map(async (release: any) => {
          const coverArtArchiveApiClient = new CoverArtArchiveApi();
          const releaseCoverInfo =
            await coverArtArchiveApiClient.getReleaseCovers(release.id);
          return { ...release, coverInfo: releaseCoverInfo };
        })
      );
    } else if (albumName) {
      // Recherche uniquement par album
      const searchResults = await mbApi.search("release", {
        query: `release:${albumName}`,
        limit: 8,
      });
      results = await Promise.all(
        searchResults.releases.map(async (release: any) => {
          const coverArtArchiveApiClient = new CoverArtArchiveApi();
          const releaseCoverInfo =
            await coverArtArchiveApiClient.getReleaseCovers(release.id);
          return { ...release, coverInfo: releaseCoverInfo };
        })
      );
    }

    console.log("results", results);
    return NextResponse.json({ results });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      message: "Erreur lors de la recherche des données",
    });
  }
}
