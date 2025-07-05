import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Rating from '@/lib/models/Rating';

export async function GET() {
  try {
    await dbConnect();

    const averageRatings = await Rating.aggregate([
      {
        $lookup: { //
          from: 'menuentries',
          localField: 'menuEntry',
          foreignField: '_id',
          as: 'menuEntryInfo',
        },
      },
      { $unwind: '$menuEntryInfo' },
      {
        $lookup: {
          from: 'dishes',
          localField: 'menuEntryInfo.dish',
          foreignField: '_id',
          as: 'dishInfo',
        },
      },
      { $unwind: '$dishInfo' },
      {
        $group: {
          _id: '$dishInfo.name',
          averageStars: { $avg: '$stars' },
          count: { $sum: 1 },
        },
      },
      { $sort: { averageStars: -1 } },
    ]);


    const rankedDishes = averageRatings.map((dish, index) => ({
        rank: index + 1,
        name: dish._id,
        rating: dish.averageStars.toFixed(2),
        votes: dish.count,
    }));


    return NextResponse.json(rankedDishes, { status: 200 });

  } catch (error) {
    console.error('API Error in /api/rankings:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}