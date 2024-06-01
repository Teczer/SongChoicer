import React from "react";
import { Song } from "@/app/lib/types";
import Image from "next/image";

interface SongButtonProps {
  song: Song;
  onVote: (id: number) => void;
}

const SongButton: React.FC<SongButtonProps> = ({ song, onVote }) => {
  return (
    <div
      className="w-1/4 flex flex-col items-center justify-center border rounded-lg p-10 gap-5 transition-all cursor-pointer hover:scale-105 dark:border-white/[0.1]"
      onClick={() => onVote(song.id)}
    >
      <Image
        className="rounded-sm"
        src={
          "https://images.genius.com/9bbc999c233ae1793aab2167c0202ae7.1000x1000x1.png"
        }
        alt={song.title}
        width={400}
        height={400}
      />
      <p className="font-bold text-lg">{song.title}</p>
    </div>
  );
};

export default SongButton;
