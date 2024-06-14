import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface SongButtonProps {
  song: Song
  onVote: (id: number) => void
  animationProps: any
}

export const SongButton: React.FC<SongButtonProps> = ({
  song,
  onVote,
  animationProps,
}) => {
  const hoverAnimation = {
    y: -50,
    transition: { duration: 0.2 }, // Animation plus rapide
  }

  const initialAnimation = {
    y: 0,
    transition: { duration: 0.02 }, // Retour plus rapide
  }

  return (
    <motion.div
      className="w-full sm:w-1/4 flex select-none flex-col items-center justify-center rounded-lg p-2 gap-5 cursor-pointer grayscale hover:grayscale-0 hover:scale-105"
      onClick={() => onVote(song.id)}
      whileHover={hoverAnimation}
      initial={initialAnimation}
      animate={initialAnimation}
      {...animationProps}
    >
      <Image
        priority
        className="rounded-sm filter w-full h-[150px] object-cover sm:w-full sm:h-auto versusimage_pwa"
        src={song.image.url}
        alt={song.title}
        width={song.image.width}
        height={song.image.height}
      />
      <p className="font-bold text-lg">{song.title}</p>
    </motion.div>
  )
}

export default SongButton
