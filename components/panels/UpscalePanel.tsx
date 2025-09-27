
import React, { useState } from 'react';
import { upscaleImage } from '../../services/geminiService';
import ImageInput from '../shared/ImageInput';
import LoadingOverlay from '../shared/LoadingOverlay';
import ResultDisplay from '../shared/ResultDisplay';
import { fileToBase64 } from '../../utils/fileUtils';
import { ArrowUpIcon } from '../shared/icons';

const UpscalePanel: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpscale = async () => {
    if (!originalImage) {
      setError('Please upload an image to upscale.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setUpscaledImage(null);

    try {
      const base64Image = await fileToBase64(originalImage);
      const resultB64 = await upscaleImage(base64Image, originalImage.type);
      setUpscaledImage(resultB64);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during upscaling.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setUpscaledImage(null);
    setError(null);
  };

  return (
    <div className="relative">
      {isLoading && <LoadingOverlay message="Enhancing to 4K quality..." />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <ImageInput onImageUpload={handleImageUpload} />
          {originalImage && (
            <>
              <p className="text-slate-400 text-sm text-center">
                Image ready. Click the button below to enhance its quality to 4K.
              </p>
              <button
                onClick={handleUpscale}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg"
              >
                <ArrowUpIcon className="w-5 h-5 mr-2" />
                Upscale to 4K
              </button>
            </>
          )}
        </div>
        <div className="bg-slate-900/50 rounded-lg min-h-[300px] flex items-center justify-center border border-slate-700">
           {error && <p className="text-red-400 p-4">{error}</p>}
           {(originalImage || upscaledImage) && (
              <ResultDisplay
                originalImageUrl={originalImage ? URL.createObjectURL(originalImage) : undefined}
                resultImageUrl={upscaledImage ? `data:image/png;base64,${upscaledImage}` : undefined}
                resultFileName="upscaled-image.png"
              />
           )}
           {!originalImage && !upscaledImage && !error && !isLoading && (
              <div className="text-center text-slate-500 p-4">
                  <ArrowUpIcon className="w-12 h-12 mx-auto mb-2" />
                  <p>Upload an image to upscale to 4K.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default UpscalePanel;
