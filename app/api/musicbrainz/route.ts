import { NextResponse } from "next/server";
import { CoverArtArchiveApi, MusicBrainzApi } from "musicbrainz-api";

const mbApi = new MusicBrainzApi({
  appName: "Song Choicer",
  appVersion: "1.0",
  appContactInfo: "mehdi.hattou1@gmail.com",
});

function removeDuplicates(results: any[]) {
  const seen = new Set();
  return results.filter((release) => {
    const key = `${
      release["artist-credit"][0].name
    }-${release.title.toLowerCase()}-${release["track-count"]}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

async function removeAlbumsWithoutCover(results: any[]) {
  const withCover = await Promise.all(
    results.map(async (release: any) => {
      try {
        const coverArtArchiveApiClient = new CoverArtArchiveApi();
        const releaseCoverInfo =
          await coverArtArchiveApiClient.getReleaseCovers(release.id);
        return { ...release, coverInfo: releaseCoverInfo };
      } catch (coverError) {
        console.error(
          `Failed to fetch cover for release ID ${release.id}`,
          coverError
        );
        return { ...release, coverInfo: null };
      }
    })
  );

  return withCover.filter((release) => release.coverInfo !== null);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const artistName = searchParams.get("artistName");
  const albumName = searchParams.get("albumName");

  if (!artistName && !albumName) {
    return NextResponse.json(
      { message: "artistName or albumName must be provided" },
      { status: 400 }
    );
  }

  console.log("artist", artistName);
  console.log("album", albumName);

  try {
    let results: any[] = [];

    if (artistName && albumName) {
      const searchQuery = `release:${albumName} AND artist:${artistName}`;
      const { releases } = await mbApi.search("release", {
        query: searchQuery,
        limit: 5,
      });
      results = releases;
    } else if (artistName) {
      const { releases } = await mbApi.search("release", {
        query: `artist:${artistName}`,
        limit: 100,
      });
      results = releases;
    } else if (albumName) {
      const { releases } = await mbApi.search("release", {
        query: `release:${albumName}`,
        limit: 8,
      });
      results = releases;
    }

    // Remove albums without cover
    const withCover = await removeAlbumsWithoutCover(results);

    // Remove duplicates
    const uniqueResults = removeDuplicates(withCover);

    console.log("uniqueResults", uniqueResults);
    return NextResponse.json({ results: uniqueResults });
  } catch (error) {
    console.error("Failed to fetch data from MusicBrainz API", error);
    return NextResponse.json(
      { message: "Error occurred during data fetching" },
      { status: 500 }
    );
  }
}
