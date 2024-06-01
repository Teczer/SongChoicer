"use client";

import SongRanker from "@/components/SongRanker";
import { songs } from "../lib/constant";

export default function Home() {
  const staticSongs = songs;
  console.log("staticSongs", staticSongs);

  return <SongRanker songs={staticSongs} />;
}
