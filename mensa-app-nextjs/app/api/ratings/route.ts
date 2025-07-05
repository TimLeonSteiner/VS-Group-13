import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Rating from '@/lib/models/Rating';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { menuEntry, user, stars } = body;

    if (!menuEntry || !user || !stars) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newRating = new Rating({ menuEntry, user, stars });
    await newRating.save();

    return NextResponse.json(newRating, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}