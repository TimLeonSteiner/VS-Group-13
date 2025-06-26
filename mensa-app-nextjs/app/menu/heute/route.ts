import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { MenuEntry } from '@/lib/models';

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const menuItems = await MenuEntry.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate({ path: 'dish', model: 'Dish' }); // Populate dish details

    // Transform data to match frontend expectations
    const formattedMenu = menuItems.map(item => ({
        name: (item.dish as any).name,
        description: (item.dish as any).description,
        price: '€5.50', // Example price, you can add this to your model
        rating: 'N/A' // You would need a separate query for this
    }));

    return NextResponse.json(formattedMenu, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}