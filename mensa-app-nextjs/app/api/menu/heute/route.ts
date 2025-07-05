import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MenuEntry from '@/lib/models/MenuEntry';
import '@/lib/models/Dish';

interface IDish {
  _id: string;
  name: string;
  description: string;
  category: 'vegan' | 'vegetarian' | 'meat';
}

interface IMenuEntryPopulated {
  _id: string;
  date: Date;
  dish: IDish;
}

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const menuItems = await MenuEntry.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate('dish');

    const formattedMenu = menuItems.map(item => {
        const populatedItem = item as unknown as IMenuEntryPopulated;
        return {
            _id: populatedItem._id,
            name: populatedItem.dish.name,
            description: populatedItem.dish.description,
            category: populatedItem.dish.category,
            price: '€5.50',
        }
    });

    return NextResponse.json(formattedMenu, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}