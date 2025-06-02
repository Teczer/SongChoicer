'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AlbumFull } from 'ytmusic-api';

import { getAlbumFromYtbmusicApi } from '@/app/api/ytbmusic/album/method';
import SongRanker from '@/components/SongRanker';
import { VersusSkeletonLoader } from '@/components/VersusSkeletonLoader';
import { Song } from '@/interfaces/song';

interface Props {
  params: {
    albumId: string;
  };
}

export default function Home({ params }: Props) {
  const {
    data: albumData,
    isError,
    isLoading,
  } = useQuery<AlbumFull | undefined>({
    queryFn: async () => {
      const res = await getAlbumFromYtbmusicApi(params.albumId);
      return res;
    },
    queryKey: ['album', params.albumId],
  });

  console.log('albumData', albumData);
  const songs: Song[] | undefined = useMemo(
    () =>
      albumData?.songs.map((track, index) => {
        return {
          id: index + 1,
          image: track?.thumbnails[3] ?? '',
          title: track.name,
        };
      }),
    [albumData?.songs, albumData?.thumbnails],
  );

  const album = {
    albumArtist: albumData?.artist.name ?? '',
    albumCover: albumData?.thumbnails[3].url ?? '',
    albumName: albumData?.name ?? '',
  };

  if (isLoading || !albumData) return <VersusSkeletonLoader />;

  if (isError) return <div>An error occured</div>;

  return <SongRanker songs={songs ?? []} album={album} />;
}
