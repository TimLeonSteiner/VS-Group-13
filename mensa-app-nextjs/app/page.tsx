import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <p>Welcome to the HTW Mensa App!</p>
      <p>Use the navigation above to check out today&apos;s menu or see the top-rated dishes.</p>
      <ul>
        <li><Link href="/menu">View Today&apos;s Menu</Link></li>
        <li><Link href="/rankings">View Dish Rankings</Link></li>
      </ul>
    </div>
  );
}