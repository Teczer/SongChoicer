import Image from 'next/image';
import { AlbumDetailed } from 'ytmusic-api';

import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

export function AlbumCard({ album }: { album: AlbumDetailed }) {
  return (
    <CardContainer className="group rounded-xl select-none">
      <CardBody className="bg-transparent h-auto border border-black/[0.1] relative group/card hover:shadow-2xl hover:shadow-yellow-500/[0.1] w-auto sm:w-[25rem] rounded-xl p-6 dark:border-white/[0.1]">
        <Image
          src={album.thumbnails[3].url || 'http://via.placeholder.com/500x500'}
          height="1000"
          width="1000"
          className="absolute blur-sm top-0 left-0 h-[100%] w-full object-cover rounded-xl shadow-xl"
          alt="thumbnail"
        />
        <div className="flex items-center justify-between">
          <CardItem
            as="p"
            translateZ="50"
            className="text-white text-sm mt-2 bg-black p-2 rounded-sm bg-opacity-30 font-bold max-w-[130px] sm:text-lg sm:max-w-[250px] max-h-[40px] text-nowrap overflow-hidden text-ellipsis"
          >
            {album.name}
          </CardItem>
          {/* <CardItem
            as="p"
            translateZ="50"
            className="text-white h-fit text-xs mt-2 bg-black p-2 rounded-sm bg-opacity-30 font-bold"
          >
            {album.total_tracks} tracks
          </CardItem> */}
        </div>
        <div className="flex items-center justify-between">
          <CardItem
            key={album.artist.artistId}
            as="p"
            translateZ="60"
            className="text-white h-fit text-sm mt-2 bg-black p-2 rounded-sm bg-opacity-30"
          >
            {album.artist.name}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-white h-fit text-sm mt-2 bg-black p-2 rounded-sm bg-opacity-30"
          >
            {album.year}
          </CardItem>
        </div>

        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={album.thumbnails[3].url || 'http://via.placeholder.com/500x500'}
            alt={`Cover of ${album.name}`}
            width={500}
            height={500}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
