import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-900 border-b border-slate-800 text-white">
      <div className="text-xl font-bold text-purple-400">ContentStudio AI</div>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-purple-400 transition">Generator</Link>
        <Link href="/saved" className="hover:text-purple-400 transition">Saved Scripts</Link>
      </div>
    </nav>
  );
}