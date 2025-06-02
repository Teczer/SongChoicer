// Renvoi le nombre de versus max.
// A un max de toute les paires possible.
// SongsLength a un minimum de 3 son -> A voir call api spotify, logiquement le minimum que ça peux retourner c'est le maximum de toute les paires pour 3 sons. (3 * 2 / 2 = 3)
// Le nombre retour est donc défini comme suit :
// - Pour toutes les entrée strictement inférieur à 15 on renvoi une sortie de MAX_POSSIBLE_PAIR plafonné à 45.
// - Si le nombre de songs est supérieur ou égale à 15 on renvoi une sortie 45 + 20 * (MAX_POSSIBLE_PAIR % 5)

// 15 -> 45
// 3 -> 3
// 4 -> 6
export const MAX_DUEL = (songsLength: number): number => {
  const maxPossiblePair = (songsLength * (songsLength - 1)) / 2;

  // Si y a 15 sons ou moins alors on retourne : nombre de son = s : s * (s - 1) / 2, tant que ça ne dépasse pas 45
  if (songsLength <= 14) {
    return Math.min(maxPossiblePair, 45);
  }

  // Problèmatique, faire un classement de 34 chansons avec 45 duels est impossible, on ne peut pas avoir un classement fiable avec aussi peu de duels, alors
  // Si il y a plus de 15 sons, on retourne : nombre de son = s : s * (s - 1) / 2, tant que ça ne dépasse pas maxDuels
  // maxDuels est un nombre qui s'incrémente de 20 en 20 tout les 5 sons

  let maxDuels;

  maxDuels = 45;

  if (songsLength >= 15 && songsLength <= 17) {
    maxDuels = 50;
  }

  if (songsLength >= 18 && songsLength <= 19) {
    maxDuels = 60;
  }

  for (let i = 20; i <= songsLength; i += 5) {
    maxDuels += 20;
  }

  // Retourne le minimum entre le nombre total de duels possibles (s * (s - 1) / 2) et le nombre maximal de duels calculé
  return Math.min(maxPossiblePair, maxDuels);
};
