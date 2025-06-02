import { Song, Versus } from '@/interfaces/song';

export function findFirstDuelsOfASong(versus: Versus, songIdToFind: number): boolean {
  const [songA, songB] = versus;
  return songA.id === songIdToFind || songB.id === songIdToFind;
}

export function isSongInVersus(songId: number, versus: Versus): boolean {
  const [songA, songB] = versus;
  return songA.id === songId || songB.id === songId;
}

export function isSameDuel(duel1: Versus, duel2: Versus): boolean {
  const [song1a, song1b] = duel1;
  const [song2a, song2b] = duel2;
  return (song1a.id === song2a.id && song1b.id === song2b.id) || (song1a.id === song2b.id && song1b.id === song2a.id);
}

export function isDuelInList(duel: Versus, list: Versus[]): boolean {
  return list.some(d => isSameDuel(d, duel));
}

export function isSongIdSameAsSong(songId: number, song: Song): boolean {
  return song.id === songId;
}

function containsDesiredId(desiredIds: number[], song: Song): boolean {
  return desiredIds.includes(song.id);
  //   return desiredIds.some((id) => isSongIdSameAsSong(id, song))
}
// desiredId = [1, 2]
// isSongInVersus()
// const duels.find()
export function findPairWithOnlyDesiredIds(desiredIds: number[], allDuels: Versus[]): Versus | undefined {
  return allDuels.find((versus: Versus) => {
    const [songA, songB] = versus;
    const bothDesiredIds = containsDesiredId(desiredIds, songA) && containsDesiredId(desiredIds, songB);
    return bothDesiredIds;
  });
}

export function findPairWithNoAvoidIds(avoidIds: number[], allDuels: Versus[]): Versus | undefined {
  return allDuels.find((versus: Versus) => {
    const [songA, songB] = versus;
    const noAvoidId = !containsDesiredId(avoidIds, songA) && !containsDesiredId(avoidIds, songB);
    return noAvoidId;
  });
}

export function findPairWithDesiredIdsAndNoAvoidIds(
  desiredIds: number[],
  avoidIds: number[],
  allDuels: Versus[],
): Versus | undefined {
  return allDuels.find(([songA, songB]) => {
    const includesDesiredId = containsDesiredId(desiredIds, songA) || containsDesiredId(desiredIds, songB);
    const noAvoidId = !containsDesiredId(avoidIds, songA) && !containsDesiredId(avoidIds, songB);

    return includesDesiredId && noAvoidId;
  });
}

export function findFirstDuelsOfASongWithoutAnotherSongId(
  desiredIds: number[],
  avoidIds: number[],
  allDuels: Versus[],
): Versus | undefined {
  let pair = findPairWithDesiredIdsAndNoAvoidIds(desiredIds, avoidIds, allDuels);
  if (pair) return pair;

  pair = findPairWithOnlyDesiredIds(desiredIds, allDuels);
  if (pair) return pair;

  pair = findPairWithNoAvoidIds(avoidIds, allDuels);
  if (pair) return pair;

  return allDuels[0];
}
