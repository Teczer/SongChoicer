import React from "react";
import { Song } from "../lib/types";
import { Button } from "@/components/ui/button";

interface SongButtonProps {
  song: Song;
  onVote: (id: number) => void;
}

const SongButton: React.FC<SongButtonProps> = ({ song, onVote }) => {
  return (
    <Button variant={"outline"} onClick={() => onVote(song.id)}>
      {song.title}
    </Button>
  );
};

export default SongButton;
