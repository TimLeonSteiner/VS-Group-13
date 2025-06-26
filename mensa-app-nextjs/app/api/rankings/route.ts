
import { NextResponse } from 'next/server';

const getRankedDishes = () => {

    return [
        { rank: 1, name: 'Rindergulasch', rating: 4.8, votes: 120 },
        { rank: 2, name: 'Vegetarisches Curry', rating: 4.5, votes: 95 },
        { rank: 3, name: 'Pasta mit Tomatensoße', rating: 4.1, votes: 210 },
    ];
};

export async function GET() {
    const rankedDishes = getRankedDishes();
    return NextResponse.json(rankedDishes);
}