
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { generateBusinessMessage } from './services/geminiService';
import type { FormData, GenerationResult } from './types';
import { Motives, Platforms, Tones } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    userRole: '',
    motive: Motives[0],
    platforms: [Platforms[0], Platforms[1]],
    tone: Tones[0],
    keyPoints: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.motive || !formData.userRole) {
        setError("Please fill in Company Name, Your Role, and Motive.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const generatedResults = await generateBusinessMessage(formData);
      setResults(generatedResults);
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the message. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <InputForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <ResultsDisplay
            results={results}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
