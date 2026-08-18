export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            ContentStudio AI
          </span>
        </div>

        <p className="text-xs text-slate-500 text-center">
          Made with 💜 for creators &copy; {new Date().getFullYear()} — Powered by Groq AI
        </p>

        <div className="flex gap-4 text-xs text-slate-500">
          <span className="hover:text-purple-400 transition cursor-pointer">Generator</span>
          <span className="hover:text-purple-400 transition cursor-pointer">Saved Scripts</span>
        </div>
      </div>
    </footer>
  );
}