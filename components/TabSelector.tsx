
import React from 'react';
import { AppMode } from '../types';
import { WandSparklesIcon, BrushIcon, ArrowUpIcon } from './shared/icons';

interface TabSelectorProps {
  activeMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

const tabs = [
  { mode: AppMode.GENERATE, label: 'Generate', icon: <WandSparklesIcon className="w-5 h-5 mr-2" /> },
  { mode: AppMode.EDIT, label: 'Edit', icon: <BrushIcon className="w-5 h-5 mr-2" /> },
  { mode: AppMode.UPSCALE, label: 'Upscale', icon: <ArrowUpIcon className="w-5 h-5 mr-2" /> },
];

const TabSelector: React.FC<TabSelectorProps> = ({ activeMode, onSelectMode }) => {
  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 bg-slate-800 p-2 rounded-xl max-w-md mx-auto">
      {tabs.map(({ mode, label, icon }) => (
        <button
          key={mode}
          onClick={() => onSelectMode(mode)}
          className={`
            flex-1 flex items-center justify-center px-4 py-2.5 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500
            ${
              activeMode === mode
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-transparent text-slate-300 hover:bg-slate-700/50'
            }
          `}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
