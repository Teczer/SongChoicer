import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import { Song } from '@/interfaces/song';

interface SongButtonProps {
  song: Song;
  onVote: () => void;
  animationProps: any;
}

export const SongButton: React.FC<SongButtonProps> = ({ animationProps, onVote, song }) => {
  const hoverAnimation = {
    transition: { duration: 0.2 }, // Animation plus rapide
    y: -50,
  };

  const initialAnimation = {
    transition: { duration: 0.02 }, // Retour plus rapide
    y: 0,
  };

  return (
    <motion.div
      className="w-full sm:w-1/4 flex select-none flex-col items-center justify-center rounded-lg p-2 gap-5 cursor-pointer grayscale hover:grayscale-0 hover:scale-105"
      onClick={onVote}
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
  );
};

export default SongButton;
