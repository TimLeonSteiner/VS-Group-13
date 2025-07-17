import { NextResponse } from 'next/server';
import { createRating } from '@/lib/services/ratingsService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { menuEntry, user, stars } = body;

    const newRating = await createRating(menuEntry, user, stars);
    return NextResponse.json(newRating, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Missing required fields') {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
