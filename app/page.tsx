"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/theme-toggle-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { getAlbums } from "./api/musicbrainz/method";
import { useQuery } from "@tanstack/react-query";
import { AlbumCard } from "@/components/ui/albumCard";
import { SpinnerLoader } from "@/components/ui/loader/SpinnerLoader";

export interface Album {
  id: string;
  title: string;
  "artist-credit": { name: string }[];
  date: string;
  coverInfo: {
    images: { front: boolean; image: string }[];
  };
  "track-count": number;
}

export default function Home() {
  const [artist, setArtist] = useState<string>("");
  const [album, setAlbum] = useState<string>("");

  const {
    data: results,
    isLoading,
    isError,
    refetch,
  } = useQuery<Album[]>({
    queryKey: ["albums", artist, album],
    queryFn: async () => {
      if (artist && album) {
        return await getAlbums(artist, album);
      }
      return [];
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await refetch();
  };

  return (
    <AuroraBackground>
      <ModeToggle />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-8 items-center justify-center px-4"
      >
        <h1 className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Welcome to Song Choicer!
        </h1>
        <p className="text-md md:text-lg text-center dark:text-white">
          Make a ranking of songs of an album easily!
        </p>
        <form className="w-1/2 flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="text-primary flex flex-col justify-center items-start gap-2">
            <Label htmlFor="artist">Artist</Label>
            <Input
              placeholder="Artist"
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="text-primary flex flex-col justify-center items-start gap-2">
            <Label htmlFor="album">Album</Label>
            <Input
              placeholder="Album"
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
        {isLoading && <SpinnerLoader />}
        {isError && (
          <p className="text-red-600 font-bold">Error fetching data</p>
        )}
        <div className="w-full flex flex-wrap justify-center items-center gap-6">
          {results &&
            results.map((result) => (
              <Link key={result.id} href={`/album/${result.id}`}>
                <AlbumCard result={result} />
              </Link>
            ))}
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
