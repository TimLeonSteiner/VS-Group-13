
import { NextResponse } from 'next/server';

const getMenuFromDB = () => {

    return [
        {
            name: 'Spaghetti Carbonara',
            price: '€12.50',
            description: 'Creamy pasta with pancetta and pecorino.',
            rating: '4.8/5'
        },
        {
            name: 'Margherita Pizza',
            price: '€10.00',
            description: 'Classic pizza with tomato, mozzarella, and basil.',
            rating: '4.5/5'
        },
        {
            name: 'Caesar Salad',
            price: '€9.00',
            description: 'Crisp romaine lettuce with Caesar dressing and croutons.',
            rating: '4.2/5'
        },
    ];
};

export async function GET() {
    const menuData = getMenuFromDB();
    return NextResponse.json(menuData);
}