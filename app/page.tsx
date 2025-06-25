'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { parseAsString, useQueryStates } from 'nuqs';
import { AlbumDetailed } from 'ytmusic-api';

import { AlbumCard } from '@/components/AlbumCard';
import { AlbumCardSkeleton } from '@/components/AlbumCardSkeleton';
import FooterCopyrights from '@/components/FooterCopyrights';
import HeroSectionImage from '@/components/HeroSectionImage';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDebounce from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

import { searchFromYtbmusicApi } from './api/ytbmusic/search/method';

export default function Home() {
  const [{ album, artist }, setSearchParams] = useQueryStates(
    {
      album: parseAsString.withDefault(''),
      artist: parseAsString.withDefault(''),
    },
    {
      history: 'push',
      shallow: false,
    },
  );

  const debouncedQuery = useDebounce([artist, album], 500);

  const {
    data: albums,
    isError,
    isLoading,
  } = useQuery<AlbumDetailed[] | undefined>({
    enabled: Boolean(debouncedQuery[0]) || Boolean(debouncedQuery[1]),
    queryFn: () => searchFromYtbmusicApi(`${debouncedQuery[0]} ${debouncedQuery[1]}`),
    queryKey: ['albums', ...debouncedQuery],
  });

  const handleArtistChange = (value: string) => {
    setSearchParams({ artist: value });
  };

  const handleAlbumChange = (value: string) => {
    setSearchParams({ album: value });
  };

  return (
    <AuroraBackground className="pt-4 homepagecontainer_pwa">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative w-full min-h-screen flex flex-col gap-4 items-center justify-start py-16 px-4 sm:py-0 sm:justify-center sm:gap-6"
      >
        <div className="z-50 absolute top-4 left-4 sm:top-10 sm:right-10 sm:left-auto">
          <ThemeToggleButton />
        </div>
        <Image
          src="/android-chrome-512x512.png"
          alt="Song Choicer Logo"
          width={512}
          height={512}
          className="absolute top-4 right-4 sm:top-10 sm:left-10 w-10 border border-black border-opacity-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] rounded-sm dark:border-white dark:border-opacity-10 dark:drop-shadow-[0_1px_4px_rgba(255,255,255,0.1)]"
        />
        <h1 className="text-3xl md:text-7xl font-bold dark:text-white text-center mb-2">Welcome to Song Choicer!</h1>
        <p className="text-md md:text-lg text-center dark:text-white">
          Make a ranking of songs of an album easily and share it !
        </p>
        <form className="w-full flex flex-col gap-8 md:py-4 md:px-[30%] md:w-full">
          <div className="text-primary flex flex-col justify-center items-start gap-2">
            <Label htmlFor="artist">Artist</Label>
            <Input
              id="artist"
              placeholder="Taylor Swift, Drake, etc..."
              type="text"
              value={artist}
              onChange={e => handleArtistChange(e.target.value)}
            />
          </div>
          <div className="text-primary flex flex-col justify-center items-start gap-2">
            <Label htmlFor="album">Album</Label>
            <Input
              id="album"
              placeholder="Lover, Scorpion, etc..."
              type="text"
              value={album}
              onChange={e => handleAlbumChange(e.target.value)}
            />
          </div>
        </form>
        {isLoading && (
          <div className="w-full flex flex-wrap justify-center items-center gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <AlbumCardSkeleton key={index} />
            ))}
          </div>
        )}
        {isError && (
          <p className="text-red-600 font-bold">
            No album found. Please check if the artist name or album title is correct.
          </p>
        )}
        {!isLoading && !albums && <HeroSectionImage />}
        <ul className={cn(`w-full flex flex-wrap justify-center items-center gap-6 ${albums ? '' : 'hidden'}`)}>
          {albums &&
            albums.map(album => (
              <li key={album.albumId}>
                <Link href={`/versus/${album.albumId}`}>
                  <AlbumCard album={album} />
                </Link>
              </li>
            ))}
        </ul>
        <FooterCopyrights />
      </motion.div>
    </AuroraBackground>
  );
}
