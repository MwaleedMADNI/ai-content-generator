'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type SavedScript = {
  id: string;
  topic: string;
  content: string;
  createdAt: string;
};

export default function SavedScripts() {
  const [scripts, setScripts] = useState<SavedScript[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('saved_scripts') || '[]');
    setScripts(existing);
  }, []);

  const deleteScript = (id: string) => {
    const updated = scripts.filter((s) => s.id !== id);
    setScripts(updated);
    localStorage.setItem('saved_scripts', JSON.stringify(updated));
  };

  const clearAll = () => {
    setScripts([]);
    localStorage.setItem('saved_scripts', JSON.stringify([]));
  };

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto flex flex-col">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Saved Scripts
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Aapke saved gaye scripts yahan mojood hain.
            </p>
          </div>
          {scripts.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-800/50 px-3 py-1.5 rounded-lg transition"
            >
              🗑️ Clear All
            </button>
          )}
        </div>

        {scripts.length === 0 ? (
          <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
            Abhi koi script save nahi ki gayi. Generator page par jaake koi script save karein.
          </div>
        ) : (
          <div className="space-y-4">
            {scripts.map((script) => (
              <div
                key={script.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
              >
                <div className="flex justify-between items-center">
                  <div
                    className="cursor-pointer flex-1"
                    onClick={() => setOpenId(openId === script.id ? null : script.id)}
                  >
                    <h2 className="font-semibold text-white">{script.topic}</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(script.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => setOpenId(openId === script.id ? null : script.id)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition"
                    >
                      {openId === script.id ? 'Hide' : 'View'}
                    </button>
                    <button
                      onClick={() => deleteScript(script.id)}
                      className="text-xs bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-800/50 px-3 py-1.5 rounded-lg transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                {openId === script.id && (
                  <div className="mt-4 pt-4 border-t border-slate-800 text-slate-200 leading-relaxed">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ ...props }) => (
                          <h1 className="text-xl font-bold text-purple-300 mt-4 mb-2 first:mt-0" {...props} />
                        ),
                        h2: ({ ...props }) => (
                          <h2 className="text-lg font-bold text-purple-300 mt-4 mb-2 first:mt-0" {...props} />
                        ),
                        h3: ({ ...props }) => (
                          <h3 className="text-base font-bold text-pink-400 mt-4 mb-2 first:mt-0" {...props} />
                        ),
                        p: ({ ...props }) => <p className="mb-2 text-sm" {...props} />,
                        ul: ({ ...props }) => (
                          <ul className="list-disc list-inside mb-3 space-y-1 text-sm" {...props} />
                        ),
                        ol: ({ ...props }) => (
                          <ol className="list-decimal list-inside mb-3 space-y-1 text-sm" {...props} />
                        ),
                        strong: ({ ...props }) => (
                          <strong className="font-semibold text-white" {...props} />
                        ),
                        table: ({ ...props }) => (
                          <div className="overflow-x-auto mb-3">
                            <table className="w-full text-xs border-collapse" {...props} />
                          </div>
                        ),
                        th: ({ ...props }) => (
                          <th className="border border-slate-700 bg-slate-800 px-2 py-1 text-left text-purple-300" {...props} />
                        ),
                        td: ({ ...props }) => (
                          <td className="border border-slate-700 px-2 py-1 align-top" {...props} />
                        ),
                      }}
                    >
                      {script.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-600 mt-16">
        Saved scripts sirf is browser mein store hote hain — dusre device par nahi dikhenge.
      </p>
    </main>
  );
}