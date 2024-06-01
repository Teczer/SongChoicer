"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Song } from "./lib/types";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/theme-toggle-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const songs: Song[] = [
  { id: 1, title: "Fortnight (Ft. Post Malone)", views: 3.2 },
  { id: 2, title: "The Tortured Poets Department", views: 2.5 },
  { id: 3, title: "My Boy Only Breaks His Favorite Toys", views: 1.8 },
  { id: 4, title: "Down Bad", views: 2.4 },
  // { id: 5, title: "So Long, London", views: 2.6 },
  // { id: 6, title: "But Daddy I Love Him", views: 2.4 },
  // { id: 7, title: "Fresh Out The Slammer", views: 1.5 },
  // { id: 8, title: "Florida!!! (Ft. Florence + the Machine)", views: 1.7 },
  // { id: 9, title: "Guilty as Sin?", views: 2 },
  // { id: 10, title: "Who's Afraid of Little Old Me?", views: 1.9 },
  // { id: 11, title: "I Can Fix Him (No Really I Can)", views: 1.3 },
  // { id: 12, title: "loml", views: 2.3 },
  // { id: 13, title: "I Can Do It With A Broken Heart", views: 2.1 },
  // { id: 14, title: "The Smallest Man Who Ever Lived", views: 2 },
  // { id: 15, title: "The Alchemy", views: 1.9 },
  // { id: 16, title: "Clara Bow", views: 1.4 },
  // { id: 17, title: "The Black Dog (First Draft Phone Memo)", views: 1.7 },
];

export default function Home() {
  return (
    <AuroraBackground className="bg-background">
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
          Welcome to Song Choicer !
        </h1>
        <p className="text-md md:text-lg text-center dark:text-white">
          Make a ranking of songs of an album easly!
        </p>
        <div className="w-1/2 flex flex-col gap-8">
          <div className="text-primary flex flex-col justify-center items-start gap-2">
            <Label htmlFor="artist">Artist</Label>
            <Input placeholder="Artist" type="text" />
          </div>
          <div className="text-primary flex flex-col justify-center items-start gap-2">
            <Label htmlFor="album">Album</Label>
            <Input placeholder="Album" type="text" />
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
