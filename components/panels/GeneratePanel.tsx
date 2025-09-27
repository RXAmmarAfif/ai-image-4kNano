
import React, { useState } from 'react';
import { generateImage } from '../../services/geminiService';
import { AspectRatio } from '../../types';
import LoadingOverlay from '../shared/LoadingOverlay';
import ResultDisplay from '../shared/ResultDisplay';
import { WandSparklesIcon } from '../shared/icons';

const aspectRatios: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3', '3:4'];

const GeneratePanel: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const imageB64 = await generateImage(prompt, aspectRatio);
      setGeneratedImage(imageB64);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {isLoading && <LoadingOverlay message="Generating your 4K masterpiece..." />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
              Describe the image you want to create
            </label>
            <textarea
              id="prompt"
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="e.g., A majestic lion wearing a crown, sitting on a throne in a futuristic city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-5 gap-2">
              {aspectRatios.map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 ${
                    aspectRatio === ratio
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg"
          >
            <WandSparklesIcon className="w-5 h-5 mr-2" />
            Generate
          </button>
        </div>
        
        {/* Display */}
        <div className="bg-slate-900/50 rounded-lg min-h-[300px] flex items-center justify-center border border-slate-700">
          {error && <p className="text-red-400 p-4">{error}</p>}
          {generatedImage && (
            <ResultDisplay resultImageUrl={`data:image/jpeg;base64,${generatedImage}`} resultFileName="generated-image.jpg" />
          )}
          {!generatedImage && !error && !isLoading && (
            <div className="text-center text-slate-500">
              <WandSparklesIcon className="w-12 h-12 mx-auto mb-2" />
              <p>Your generated image will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePanel;
