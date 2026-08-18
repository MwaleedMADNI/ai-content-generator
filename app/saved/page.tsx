'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    const entry = {
      id: Date.now().toString(),
      topic,
      content: output,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('saved_scripts', JSON.stringify([entry, ...existing]));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto flex flex-col">
      <div className="flex-1">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest text-purple-400 uppercase mb-3">
            AI-Powered Content Generator
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 leading-tight">
            AI Social Media Content Studio
          </h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Topic daalein aur viral hooks, hashtags, caption, Instagram reel scripts aur CTA ek click mein hasil karein.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-10">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Real Estate Marketing, Python Tips, AI Tools..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50 shadow-lg shadow-purple-900/30"
          >
            {loading ? 'Generating...' : 'Generate Content'}
          </button>
        </form>

        {!output && !loading && (
          <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
            Apna topic likh kar shuru karein — aapka result yahan dikhega.
          </div>
        )}

        {output && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative shadow-xl shadow-black/20">
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
            <div className="text-slate-200 leading-relaxed font-sans">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-2xl font-bold text-purple-300 mt-6 mb-3 first:mt-0" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-xl font-bold text-purple-300 mt-6 mb-3 first:mt-0" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-lg font-bold text-pink-400 mt-6 mb-3 first:mt-0" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="mb-3 text-slate-200" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc list-inside mb-4 space-y-1.5 text-slate-200" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-1.5 text-slate-200" {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="ml-2" {...props} />
                  ),
                  strong: ({ ...props }) => (
                    <strong className="font-semibold text-white" {...props} />
                  ),
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm border-collapse" {...props} />
                    </div>
                  ),
                  th: ({ ...props }) => (
                    <th className="border border-slate-700 bg-slate-800 px-3 py-2 text-left text-purple-300" {...props} />
                  ),
                  td: ({ ...props }) => (
                    <td className="border border-slate-700 px-3 py-2 align-top" {...props} />
                  ),
                  hr: () => <hr className="border-slate-700 my-4" />,
                }}
              >
                {output}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-600 mt-16">
        Har script Groq AI se real-time generate hota hai — apne brand ki tone ke mutabiq edit kar ke use karein.
      </p>
    </main>
  );
}