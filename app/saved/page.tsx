'use client';
import { useState, useEffect } from 'react';

export default function SavedPage() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('saved_scripts') || '[]');
    setSaved(items);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-purple-400">Saved Content Library</h1>
      {saved.length === 0 ? (
        <p className="text-slate-400">Abhi tak koi script save nahi ki.</p>
      ) : (
        <div className="grid gap-4">
          {saved.map((script, index) => (
            <div key={index} className="p-4 bg-slate-900 rounded-xl border border-slate-800 whitespace-pre-wrap text-slate-200">
              {script}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}