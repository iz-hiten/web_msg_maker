
import React, { useState } from 'react';
import type { GenerationResult } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ResultsDisplayProps {
  results: GenerationResult | null;
  isLoading: boolean;
  error: string | null;
}

const ResultCard: React.FC<{ platform: string, subject?: string | null, body: string }> = ({ platform, subject, body }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = subject ? `Subject: ${subject}\n\n${body}` : body;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg shadow-md p-5 relative group">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold bg-indigo-500/20 text-indigo-300 py-1 px-3 rounded-full">{platform}</span>
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-opacity duration-200"
                >
                    <ClipboardIcon />
                    {copied && <span className="absolute top-0 right-0 -mt-8 mr-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-md">Copied!</span>}
                </button>
            </div>
            {subject && <p className="text-slate-300 font-semibold mb-2"><span className="text-slate-400">Subject:</span> {subject}</p>}
            <p className="text-slate-300 whitespace-pre-wrap">{body}</p>
        </div>
    );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="mt-10 space-y-8 animate-fade-in">
        <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 mb-4">Suggested Contacts</h2>
            <div className="bg-slate-800/60 border border-slate-700 rounded-lg shadow-md p-5">
                <p className="text-slate-300">{results.contacts.suggestions}</p>
                {results.contacts.sources.length > 0 && (
                     <div className="mt-4 border-t border-slate-700 pt-3">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sources:</h4>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {results.contacts.sources.map((source, index) => source.web && (
                                <li key={index} className="text-sm">
                                    <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors">
                                        {source.web.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 mb-4">Generated Messages</h2>
            <div className="space-y-6">
                {results.messages.map((msg, index) => (
                    <ResultCard key={index} platform={msg.platform} subject={msg.subject} body={msg.body} />
                ))}
            </div>
        </div>
    </div>
  );
};
