/** @jest-environment node */
import { createRating } from '@/lib/services/ratingsService'
import Rating from '@/lib/models/Rating'

jest.mock('@/lib/models/Rating')

describe('ratingsService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sollte ein Rating erstellen', async () => {
    ;(Rating.create as jest.Mock).mockResolvedValue({ _id: '123', stars: 5 })
    const result = await createRating('menu123', 'user123', 5)
    expect(Rating.create).toHaveBeenCalledWith({
      menuEntry: 'menu123',
      user: 'user123',
      stars: 5,
    })
    expect(result._id).toBe('123')
  })

  it('sollte Fehler werfen bei fehlenden Feldern', async () => {
    await expect(createRating('', 'user123', 5)).rejects.toThrow('Missing required fields')
  })
})
