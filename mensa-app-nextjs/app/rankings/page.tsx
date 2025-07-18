'use client';

import { useEffect, useState } from 'react';

type RankedDish = {
    rank: number;
    name: string;
    rating: number;
    votes: number;
};

export default function RankingsPage() {
    const [rankedDishes, setRankedDishes] = useState<RankedDish[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRankings() {
            // Fetching from the new API route
            const response = await fetch('/api/rankings');
            const data = await response.json();
            setRankedDishes(data);
            setIsLoading(false);
        }
        fetchRankings();
    }, []);

    if (isLoading) {
        return <p>Loading rankings...</p>;
    }

    return (
        <section className="rankings-list">
            {rankedDishes.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Dish Name</th>
                            <th>Rating</th>
                            <th>Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedDishes.map((dish) => (
                            <tr key={dish.rank}>
                                <td>#{dish.rank}</td>
                                <td>{dish.name}</td>
                                <td>{dish.rating}</td>
                                <td>{dish.votes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No rankings available yet.</p>
            )}
        </section>
    );
}