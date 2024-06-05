import { Song } from '@/app/lib/types'
import { MAX_DUEL } from '@/config'
import { generateDuels } from '@/lib/duels'
import '@testing-library/jest-dom'

jest.mock('@/config', () => ({
  MAX_DUEL: (length: number) => Math.min(10, (length * (length - 1)) / 2),
}))

describe('generateDuels', () => {
  const songs: Song[] = [
    { id: 1, title: 'Song 1', image: { url: 'url1' } },
    { id: 2, title: 'Song 2', image: { url: 'url2' } },
    { id: 3, title: 'Song 3', image: { url: 'url3' } },
  ]

  it('should generate the correct number of duels', () => {
    const duels = generateDuels(songs)
    expect(duels.length).toBeLessThanOrEqual(MAX_DUEL(songs.length))
  })

  it('should ensure each song appears at least once', () => {
    const duels = generateDuels(songs)
    const allSongs = new Set(songs.map((song) => song.id))
    const appearedSongs = new Set<number>()

    duels.forEach(([song1, song2]) => {
      appearedSongs.add(song1.id)
      appearedSongs.add(song2.id)
    })

    expect(appearedSongs.size).toBe(allSongs.size)
    expect([...appearedSongs].sort()).toEqual([...allSongs].sort())
  })

  it('should distribute song appearances approximately equally', () => {
    const duels = generateDuels(songs)
    const appearanceCount: { [key: number]: number } = {}

    songs.forEach((song) => {
      appearanceCount[song.id] = 0
    })

    duels.forEach(([song1, song2]) => {
      appearanceCount[song1.id]++
      appearanceCount[song2.id]++
    })

    const counts = Object.values(appearanceCount)
    const maxCount = Math.max(...counts)
    const minCount = Math.min(...counts)

    expect(maxCount - minCount).toBeLessThanOrEqual(1)
  })

  it('should not exceed the maximum number of duels', () => {
    const duels = generateDuels(songs)
    expect(duels.length).toBeLessThanOrEqual(MAX_DUEL(songs.length))
  })
})
