
import React from 'react';
import { DownloadIcon } from './icons';

interface ResultDisplayProps {
  originalImageUrl?: string;
  resultImageUrl?: string;
  resultFileName: string;
}

const ImageCard: React.FC<{ label: string; imageUrl: string }> = ({ label, imageUrl }) => (
  <div className="flex flex-col items-center gap-2">
    <p className="font-semibold text-slate-400">{label}</p>
    <img src={imageUrl} alt={label} className="rounded-lg shadow-lg max-w-full h-auto object-contain max-h-96" />
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImageUrl, resultImageUrl, resultFileName }) => {
  const hasBothImages = originalImageUrl && resultImageUrl;

  return (
    <div className="w-full p-4 flex flex-col items-center gap-4">
      <div className={`grid ${hasBothImages ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4 w-full`}>
        {originalImageUrl && <ImageCard label="Original" imageUrl={originalImageUrl} />}
        {resultImageUrl && <ImageCard label="Result" imageUrl={resultImageUrl} />}
      </div>
      {resultImageUrl && (
        <a
          href={resultImageUrl}
          download={resultFileName}
          className="mt-4 inline-flex items-center justify-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors duration-300 shadow-md"
        >
          <DownloadIcon className="w-5 h-5 mr-2" />
          Download Result
        </a>
      )}
    </div>
  );
};

export default ResultDisplay;
