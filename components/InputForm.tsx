
import React from 'react';
import type { FormData } from '../types';
import { Motives, Platforms, Tones } from '../constants';
import { OptionSelector } from './OptionSelector';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleInputChange = <K extends keyof FormData,>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePlatformChange = (platform: string) => {
    const newPlatforms = formData.platforms.includes(platform)
        ? formData.platforms.filter(p => p !== platform)
        : [...formData.platforms, platform];
    handleInputChange('platforms', newPlatforms);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 sm:p-8 shadow-lg backdrop-blur-sm">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="e.g., Google"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
            />
          </div>
          <div>
            <label htmlFor="userRole" className="block text-sm font-medium text-slate-300 mb-2">Your Role / Title</label>
            <input
              type="text"
              id="userRole"
              value={formData.userRole}
              onChange={(e) => handleInputChange('userRole', e.target.value)}
              placeholder="e.g., Frontend Developer"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-300 mb-2">Motive</h3>
          <OptionSelector
            options={Motives}
            selected={formData.motive}
            onSelect={(option) => handleInputChange('motive', option)}
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-300 mb-2">Platform (select multiple)</h3>
          <div className="flex flex-wrap gap-2">
            {Platforms.map(platform => (
              <button
                key={platform}
                onClick={() => handlePlatformChange(platform)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${formData.platforms.includes(platform) ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-300 mb-2">Tone</h3>
          <OptionSelector
            options={Tones}
            selected={formData.tone}
            onSelect={(option) => handleInputChange('tone', option)}
          />
        </div>

        <div>
          <label htmlFor="keyPoints" className="block text-sm font-medium text-slate-300 mb-2">Key Points to Include (Optional)</label>
          <textarea
            id="keyPoints"
            rows={3}
            value={formData.keyPoints}
            onChange={(e) => handleInputChange('keyPoints', e.target.value)}
            placeholder="e.g., Mention my recent project on X, ask about their new Y initiative..."
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150 resize-y"
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon />
                Generate Messages
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
