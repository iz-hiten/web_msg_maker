
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
      AI Business Messenger
    </h1>
    <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
      Generate niche, personal, and professional messages to connect with any company.
    </p>
  </header>
);
