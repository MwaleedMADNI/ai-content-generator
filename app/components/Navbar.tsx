'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `relative px-3 py-2 text-sm font-medium transition ${
      pathname === href
        ? 'text-white'
        : 'text-slate-400 hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-pink-500 group-hover:to-purple-400 transition-all">
            ContentStudio AI
          </span>
        </Link>

        <div className="flex gap-2 bg-slate-900/60 border border-slate-800 rounded-full px-2 py-1.5">
          <Link href="/" className={linkClass('/')}>
            Generator
            {pathname === '/' && (
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
            )}
          </Link>
          <Link href="/saved" className={linkClass('/saved')}>
            Saved Scripts
            {pathname === '/saved' && (
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}