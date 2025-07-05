// app/layout.tsx - FINAL VERSION WITH THE FIX

import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import './style.css';


export const metadata: Metadata = {
  title: 'Mensa App',
  description: 'HTW Mensa App by VS-Group-13',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {}
      <body suppressHydrationWarning={true}>
        <header>
          <nav>
            <Link href="/">Home</Link> |{' '}
            <Link href="/menu">Today&apos;s Menu</Link> |{' '}
            <Link href="/rankings">Dish Rankings</Link>
          </nav>
          <h1>Mensa App</h1>
        </header>

        <main>
          {children}
        </main>

        <footer>
          <p>© 2025 Mensa App - VS-Group-13</p>
        </footer>
      </body>
    </html>
  );
}