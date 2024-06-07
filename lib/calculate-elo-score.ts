export function calculateNewEloScore(
  winnerElo: number,
  loserElo: number
): {
  newWinnerElo: number
  newLoserElo: number
} {
  const kFactor = 32 // Facteur de pondération
  const expectedScoreWinner = 1 / (1 + 10 ** ((loserElo - winnerElo) / 400))
  const expectedScoreLoser = 1 - expectedScoreWinner
  const newWinnerElo = winnerElo + kFactor * (1 - expectedScoreWinner)
  const newLoserElo = loserElo + kFactor * (0 - expectedScoreLoser)
  return { newWinnerElo, newLoserElo }
}

export function revertEloScore(
  previousWinnerElo: number,
  previousLoserElo: number
): {
  revertedWinnerElo: number
  revertedLoserElo: number
} {
  return {
    revertedWinnerElo: previousWinnerElo,
    revertedLoserElo: previousLoserElo,
  }
}
