// mensa-app-nextjs/app/menu/page.tsx
'use client';

import { useEffect, useState } from 'react';
import RatingForm from '@/components/RatingForm'; // 1. Make sure you import the component

// This type definition is now correct!
type Dish = {
    _id: string;
    name: string;
    price: string;
    description: string;
};

export default function MenuPage() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDishes() {
            const response = await fetch('/api/menu/heute');
            const data = await response.json();
            setDishes(data);
            setIsLoading(false);
        }
        fetchDishes();
    }, []);

    if (isLoading) {
        return <p>Loading menu...</p>;
    }

    return (
        <section className="dish-list">
            {dishes.map((dish) => (
                // 2. Use the unique dish._id for the key
                <article className="dish-item" key={dish._id}>
                    <h2>{dish.name}</h2>
                    <p className="price">{dish.price}</p>
                    <p className="description">{dish.description}</p>

                    {/* 3. Remove the old rating line and add the interactive form instead */}
                    <RatingForm menuEntryId={dish._id} />
                </article>
            ))}
        </section>
    );
}