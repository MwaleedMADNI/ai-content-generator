'use client';
import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setCopied(false);
    setSaved(false);
    setOutput('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      setOutput(data.result || 'No content generated.');
    } catch (err) {
      setOutput('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToLibrary = () => {
    const existing = JSON.parse(localStorage.getItem('saved_scripts') || '[]');
    localStorage.setItem('saved_scripts', JSON.stringify([output, ...existing]));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="text-center my-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          AI Social Media Content Studio
        </h1>
        <p className="text-slate-400 mt-2">
          Topic daalein aur Viral Hooks, Hashtags, Script aur CTA ek click mein hasil karein!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Real Estate Marketing, Python Tips, AI Tools..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Content'}
        </button>
      </form>

      {output && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
            <span className="text-xs font-semibold uppercase text-purple-400 tracking-wider">
              Generated Result
            </span>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition"
              >
                {copied ? '✓ Copied!' : '📋 Copy All'}
              </button>
              <button
                onClick={saveToLibrary}
                className="text-xs bg-purple-900/50 hover:bg-purple-800/50 text-purple-300 border border-purple-700/50 px-3 py-1.5 rounded-lg transition"
              >
                {saved ? '✓ Saved!' : '💾 Save Script'}
              </button>
            </div>
          </div>
          <div className="whitespace-pre-wrap text-slate-200 leading-relaxed font-sans">
            {output}
          </div>
        </div>
      )}
    </main>
  );
}