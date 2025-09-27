
import React from 'react';
import { SparklesIcon } from './shared/icons';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center border-b border-slate-700/50">
      <div className="flex items-center justify-center gap-3">
        <SparklesIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          AI Image Studio <span className="text-indigo-400">4K</span>
        </h1>
      </div>
      <p className="mt-3 text-lg text-slate-400">
        Generate, Edit, and Upscale with the power of AI.
      </p>
    </header>
  );
};

export default Header;
