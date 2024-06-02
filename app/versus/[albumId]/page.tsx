"use client";

import { songs } from "@/app/lib/constant";
import SongRanker from "@/components/SongRanker";
import { useQuery } from "@tanstack/react-query";
import { getAlbum } from "@/app/api/album/methods";

interface Props {
  params: {
    albumId: string;
  };
}

export default function Home({ params }: Props) {
  const staticSongs = songs;
  console.log("staticSongs", params.albumId);

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["album", params.albumId],
    queryFn: async () => {
      const res = await getAlbum(params.albumId);
      return res;
    },
  });

  console.log("res", results); // album from spotify

  return <SongRanker songs={staticSongs} />;
}
