
import React from 'react';

interface OptionSelectorProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({ options, selected, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {options.map(option => (
      <button
        key={option}
        onClick={() => onSelect(option)}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
          selected === option ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        {option}
      </button>
    ))}
  </div>
);
