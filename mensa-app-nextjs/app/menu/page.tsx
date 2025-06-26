
'use client';

import { useEffect, useState } from 'react';


type Dish = {
    name: string;
    price: string;
    description: string;
    rating: string;
};

export default function MenuPage() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDishes() {
            // Ruft die API-Route auf, die wir in Schritt 1 erstellt haben
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
                // Wichtig: React braucht einen "key" für jedes Element in einer Liste
                <article className="dish-item" key={dish.name}>
                    <h2>{dish.name}</h2>
                    <p className="price">{dish.price}</p>
                    <p className="description">{dish.description}</p>
                    <p className="rating">Rating: {dish.rating}</p>
                </article>
            ))}
        </section>
    );
}