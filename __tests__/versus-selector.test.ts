import {
  findFirstDuelsOfASong,
  isSongInVersus,
  isSongIdSameAsSong,
  findPairWithOnlyDesiredIds,
  findPairWithNoAvoidIds,
  findPairWithDesiredIdsAndNoAvoidIds,
  findFirstDuelsOfASongWithoutAnotherSongId,
} from '@/lib/duel-song-search'

describe('songFunctions', () => {
  const song1: Song = { id: 1, title: 'Song 1', image: { url: 'url1' } }
  const song2: Song = { id: 2, title: 'Song 2', image: { url: 'url2' } }
  const song3: Song = { id: 3, title: 'Song 3', image: { url: 'url3' } }
  const song4: Song = { id: 4, title: 'Song 4', image: { url: 'url4' } }

  const versus1: Versus = [song1, song2]
  const versus2: Versus = [song3, song4]
  const allDuels = [versus1, versus2]

  describe('findFirstDuelsOfASong', () => {
    it('should return true if the songId is in the versus', () => {
      expect(findFirstDuelsOfASong(versus1, 1)).toBe(true)
      expect(findFirstDuelsOfASong(versus1, 2)).toBe(true)
    })

    it('should return false if the songId is not in the versus', () => {
      expect(findFirstDuelsOfASong(versus1, 3)).toBe(false)
    })
  })

  describe('isSongInVersus', () => {
    it('should return true if the songId is in the versus', () => {
      expect(isSongInVersus(1, versus1)).toBe(true)
      expect(isSongInVersus(2, versus1)).toBe(true)
    })

    it('should return false if the songId is not in the versus', () => {
      expect(isSongInVersus(3, versus1)).toBe(false)
    })
  })

  describe('isSongIdSameAsSong', () => {
    it('should return true if the songId matches the song id', () => {
      expect(isSongIdSameAsSong(1, song1)).toBe(true)
    })

    it('should return false if the songId does not match the song id', () => {
      expect(isSongIdSameAsSong(2, song1)).toBe(false)
    })
  })

  describe('findPairWithOnlyDesiredIds', () => {
    it('should return a pair with both desired ids', () => {
      expect(findPairWithOnlyDesiredIds([1, 2], allDuels)).toEqual(versus1)
    })

    it('should return undefined if no pair with both desired ids exists', () => {
      expect(findPairWithOnlyDesiredIds([1, 3], allDuels)).toBeUndefined()
    })
  })

  describe('findPairWithNoAvoidIds', () => {
    it('should return a pair with no avoid ids', () => {
      expect(findPairWithNoAvoidIds([3, 4], allDuels)).toEqual(versus1)
    })

    it('should return undefined if all pairs contain avoid ids', () => {
      expect(findPairWithNoAvoidIds([1, 2, 3, 4], allDuels)).toBeUndefined()
    })
  })

  describe('findPairWithDesiredIdsAndNoAvoidIds', () => {
    it('should return a pair with desired ids and no avoid ids', () => {
      expect(
        findPairWithDesiredIdsAndNoAvoidIds([1], [3, 4], allDuels),
      ).toEqual(versus1)
    })

    it('should return undefined if no pair with desired ids and no avoid ids exists', () => {
      expect(
        findPairWithDesiredIdsAndNoAvoidIds([1, 2], [1, 2], allDuels),
      ).toBeUndefined()
    })
  })

  describe('findFirstDuelsOfASongWithoutAnotherSongId', () => {
    it('should return a pair with desired ids and no avoid ids', () => {
      expect(
        findFirstDuelsOfASongWithoutAnotherSongId([1], [3, 4], allDuels),
      ).toEqual(versus1)
    })

    it('should return a pair with only desired ids if no pair with desired ids and no avoid ids exists', () => {
      expect(
        findFirstDuelsOfASongWithoutAnotherSongId([3, 4], [1, 2], allDuels),
      ).toEqual(versus2)
    })

    it('should return a pair with no avoid ids if no pair with desired ids exists', () => {
      expect(
        findFirstDuelsOfASongWithoutAnotherSongId([], [1, 2], allDuels),
      ).toEqual(versus2)
    })

    it('should return the first pair if no other criteria are met', () => {
      expect(
        findFirstDuelsOfASongWithoutAnotherSongId([], [], allDuels),
      ).toEqual(versus1)
    })
  })
})
