'use client';

import { useState } from 'react';

interface RatingFormProps {
  menuEntryId: string;
}

export default function RatingForm({ menuEntryId }: RatingFormProps) {
  const [stars, setStars] = useState(0);
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('Submitting...');

    if (stars === 0) {
      setStatus('Please select a star rating first.');
      return;
    }

    try {
      const testUserId = "60c72b2f9b1d8c001f8e4c6b";

      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          menuEntry: menuEntryId,
          user: testUserId,
          stars: stars,
        }),
      });

      if (!response.ok) throw new Error('Rating submission failed.');

      setStatus(`Thank you for your ${stars}-star rating!`);
      // Prevent further submissions after success
    } catch (error) {
      console.error(error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <div>
        <strong>Rate this:</strong>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setStars(star)}
            style={{ cursor: 'pointer', fontSize: '2rem', color: star <= stars ? 'gold' : 'lightgray' }}
          >
            ★
          </span>
        ))}
      </div>
      <button type="submit" disabled={!stars || status.startsWith('Thank you')}>
        Submit Rating
      </button>
      {status && <p style={{ marginTop: '0.5rem' }}>{status}</p>}
    </form>
  );
}