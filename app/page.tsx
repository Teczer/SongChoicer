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
import { Album } from "./lib/types";
import { AlbumCardSkeleton } from "@/components/ui/loader/AlbumCardSkeleton";
import { fakeResults } from "./lib/constant";

export default function Home() {
  const [artist, setArtist] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [results, setResults] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!artist && !album) {
      setIsError(true);
      return;
    }
    setResults([]);
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getAlbums(artist, album);
      if (response.length === 0) {
        setIsError(true);
      }
      console.log("response", response);
      setResults(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("results", results);

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
        <div className="w-full flex flex-wrap justify-center items-center gap-6">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <AlbumCardSkeleton key={index} />
            ))}
        </div>
        {isError && (
          <p className="text-red-600 font-bold">
            No album found. Please check if the artist name or album title is
            correct.
          </p>
        )}
        <ul className="w-full flex flex-wrap justify-center items-center gap-6">
          {results &&
            results.map((result) => (
              <li key={result.id}>
                <AlbumCard result={result} />
              </li>
            ))}
        </ul>
      </motion.div>
    </AuroraBackground>
  );
}
