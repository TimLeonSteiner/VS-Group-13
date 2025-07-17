
'use client';

import { useEffect, useState } from 'react';
import RatingForm from '@/components/RatingForm';


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

                <article className="dish-item" key={dish._id}>
                    <h2>{dish.name}</h2>
                    <p className="price">{dish.price}</p>
                    <p className="description">{dish.description}</p>


                    <RatingForm menuEntryId={dish._id} />
                </article>
            ))}
        </section>
    );
}