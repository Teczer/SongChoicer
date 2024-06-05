import { Song } from '@/app/lib/types'
import { MAX_DUEL } from '@/config'
import { countHowMuchTimeThisSoungAppear, generateDuels } from '@/lib/duels'
import '@testing-library/jest-dom'

jest.mock('@/config', () => ({
  MAX_DUEL: (length: number) => Math.min(10, (length * (length - 1)) / 2),
}))

describe('generateDuels', () => {
  const songs: Song[] = Array.from({ length: 10 })
    .fill(null)
    .map((_, index) => ({
      id: index,
      title: `Titre ${index}`,
      image: {
        url: 'https://i.scdn.co/image/ab67616d0000b2732ac57e231c742bda1ef89d3c',
        width: 640,
        height: 640,
      },
    }))

  it(`should have 10 songs`, () => {
    expect(songs.length).toBe(10)
  })

  it(`should generate less than ${MAX_DUEL(songs.length)}`, () => {
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
    // @ts-ignore
    expect([...appearedSongs].sort()).toEqual([...allSongs].sort())
  })

  it('should distribute song appearances approximately equally', () => {
    const duels = generateDuels(songs)
    const appearanceCount: { [key: number]: number } =
      countHowMuchTimeThisSoungAppear(duels)

    console.log(appearanceCount)
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
