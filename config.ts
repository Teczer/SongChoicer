export const MAX_DUEL = (songsLength: number): number => {
  // Si y a 15 sons ou moins alors on retourne : nombre de son = s : s * (s - 1) / 2, tant que ça ne dépasse pas 45
  if (songsLength <= 14) {
    return Math.min((songsLength * (songsLength - 1)) / 2, 45)
  }

  // Problèmatique, faire un classement de 34 chansons avec 45 duels est impossible, on ne peut pas avoir un classement fiable avec aussi peu de duels, alors
  // Si il y a plus de 15 sons, on retourne : nombre de son = s : s * (s - 1) / 2, tant que ça ne dépasse pas maxDuels
  // maxDuels est un nombre qui s'incrémente de 20 en 20 tout les 5 sons

  let maxDuels

  maxDuels = 45

  if (songsLength >= 15 && songsLength <= 17) {
    maxDuels = 50
  }

  if (songsLength >= 18 && songsLength <= 19) {
    maxDuels = 60
  }

  for (let i = 20; i <= songsLength; i += 5) {
    maxDuels += 20
  }
  // Retourne le minimum entre le nombre total de duels possibles (s * (s - 1) / 2) et le nombre maximal de duels calculé
  return Math.min((songsLength * (songsLength - 1)) / 2, maxDuels)
}
