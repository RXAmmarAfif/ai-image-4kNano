
import React from 'react';
import { LoaderCircleIcon } from './icons';

interface LoadingOverlayProps {
  message: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm flex flex-col justify-center items-center z-10 rounded-2xl">
      <LoaderCircleIcon className="w-12 h-12 text-indigo-400 animate-spin" />
      <p className="mt-4 text-lg font-semibold text-slate-200">{message}</p>
    </div>
  );
};

export default LoadingOverlay;
