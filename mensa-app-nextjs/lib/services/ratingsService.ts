import Rating from '@/lib/models/Rating'

export async function createRating(menuEntry: string, user: string, stars: number) {
  if (!menuEntry || !user || stars == null) {
    throw new Error('Missing required fields')
  }
  return await Rating.create({ menuEntry, user, stars })
}
