
import React, { useState } from 'react';
import { editImage } from '../../services/geminiService';
import ImageInput from '../shared/ImageInput';
import LoadingOverlay from '../shared/LoadingOverlay';
import ResultDisplay from '../shared/ResultDisplay';
import { fileToBase64 } from '../../utils/fileUtils';
import { BrushIcon } from '../shared/icons';

const EditPanel: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const base64Image = await fileToBase64(originalImage);
      const resultB64 = await editImage(base64Image, originalImage.type, prompt);
      setEditedImage(resultB64);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during editing.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setEditedImage(null);
    setError(null);
  }

  return (
    <div className="relative">
      {isLoading && <LoadingOverlay message="Applying AI magic..." />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <ImageInput onImageUpload={handleImageUpload} />
          {originalImage && (
            <>
              <div>
                <label htmlFor="edit-prompt" className="block text-sm font-medium text-slate-300 mb-2">
                  How should I edit this image?
                </label>
                <textarea
                  id="edit-prompt"
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="e.g., Make it look like a van Gogh painting"
                />
              </div>
              <button
                onClick={handleEdit}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg"
              >
                <BrushIcon className="w-5 h-5 mr-2" />
                Edit Image
              </button>
            </>
          )}
        </div>
        <div className="bg-slate-900/50 rounded-lg min-h-[300px] flex items-center justify-center border border-slate-700">
           {error && <p className="text-red-400 p-4">{error}</p>}
           {(originalImage || editedImage) && (
              <ResultDisplay
                originalImageUrl={originalImage ? URL.createObjectURL(originalImage) : undefined}
                resultImageUrl={editedImage ? `data:image/png;base64,${editedImage}` : undefined}
                resultFileName="edited-image.png"
              />
           )}
           {!originalImage && !editedImage && !error && !isLoading && (
              <div className="text-center text-slate-500 p-4">
                  <BrushIcon className="w-12 h-12 mx-auto mb-2" />
                  <p>Upload an image to start editing.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
