import Image from 'next/image'
import React from 'react'
import { CardBody, CardContainer, CardItem } from '../ui/3d-card'

interface RankCardProps {
  songRanked: Song[]
  albumCover: string
  albumName: string
  albumArtist: string
}

export function RankCard({
  songRanked,
  albumCover,
  albumName,
  albumArtist,
}: RankCardProps) {
  return (
    <CardContainer className="w-full group rounded-xl select-none sm:w-auto">
      <CardBody className="bg-transparent h-auto border border-black/[0.1] relative group/card hover:shadow-2xl hover:shadow-yellow-500/[0.1] w-full sm:w-[35rem] rounded-xl p-6 dark:border-white/[0.1]">
        <Image
          src={albumCover}
          height="1000"
          width="1000"
          className="absolute blur-sm top-0 left-0 h-[100%] w-full object-cover rounded-xl shadow-xl"
          alt="thumbnail"
        />
        <div className="w-full flex items-center justify-center">
          <CardItem
            className="text-white h-fit text-sm mt-2 bg-black p-2 rounded-sm bg-opacity-30 font-bold font-mono text-clip text-center sm:text-lg mb-4"
            as="h1"
            translateZ="50"
          >
            {albumArtist} • {albumName}
          </CardItem>
        </div>
        <CardItem translateZ="100" className="w-full mb-4">
          <Image
            src={albumCover}
            alt={`Cover`}
            width={500}
            height={500}
            className="h-32 w-full object-cover rounded-xl group-hover/card:shadow-xl sm:h-60"
          />
        </CardItem>

        <ul className="flex flex-col items-start justify-center w-full h-auto gap-2">
          {songRanked.map((song, index) => {
            // Définit la largeur à 10% pour les indices supérieurs à 8
            const widthPercentage =
              index > 4 ? '60%' : `${Math.max(100 - (index % 10) * 10, 10)}%`

            return (
              <CardItem
                className="text-white flex items-center justify-start gap-2 rounded-lg shadow-lg bg-black bg-opacity-50 border border-white/[0.2] py-1 px-2 sm:px-6"
                as="li"
                key={song.title}
                style={{ width: widthPercentage }} // Utilise la propriété style pour appliquer les styles
                translateZ="50"
              >
                <span>{index + 1}. </span>
                <p>{song.title}</p>
              </CardItem>
            )
          })}
        </ul>
        <p className="rounded-sm p-1 bg-black bg-opacity-30 font-mono absolute bottom-8 right-3 text-white text-opacity-70 text-wrap text-xs sm:text-sm">
          songchoicer.com
        </p>
      </CardBody>
    </CardContainer>
  )
}
