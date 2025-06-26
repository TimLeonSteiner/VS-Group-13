// mensa-app-nextjs/app/api/rankings/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Rating } from '@/lib/models'; // Make sure you have created models.ts

export async function GET() {
  try {
    // Step 1: Connect to the database
    await dbConnect();

    // Step 2: Run the aggregation query to calculate average ratings
    const averageRatings = await Rating.aggregate([
      {
        $lookup: { // Join with menuentries to get dish IDs
          from: 'menuentries',
          localField: 'menuEntry',
          foreignField: '_id',
          as: 'menuEntryInfo',
        },
      },
      { $unwind: '$menuEntryInfo' },
      {
        $lookup: { // Join with dishes to get the dish names
          from: 'dishes',
          localField: 'menuEntryInfo.dish',
          foreignField: '_id',
          as: 'dishInfo',
        },
      },
      { $unwind: '$dishInfo' },
      {
        $group: { // Group by dish name and calculate average stars and count
          _id: '$dishInfo.name',
          averageStars: { $avg: '$stars' },
          count: { $sum: 1 },
        },
      },
      { $sort: { averageStars: -1 } }, // Sort by the best rating
    ]);

    // Step 3: Transform the data to match what the frontend expects
    const rankedDishes = averageRatings.map((dish, index) => ({
        rank: index + 1,
        name: dish._id,
        rating: dish.averageStars.toFixed(2), // Format to 2 decimal places
        votes: dish.count,
    }));

    // Step 4: Send the real, calculated data to the frontend
    return NextResponse.json(rankedDishes, { status: 200 });

  } catch (error) {
    console.error('API Error in /api/rankings:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}