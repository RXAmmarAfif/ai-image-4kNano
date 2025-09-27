
import React, { useState } from 'react';
import { AppMode } from './types';
import Header from './components/Header';
import TabSelector from './components/TabSelector';
import GeneratePanel from './components/panels/GeneratePanel';
import EditPanel from './components/panels/EditPanel';
import UpscalePanel from './components/panels/UpscalePanel';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.GENERATE);

  const renderPanel = () => {
    switch (mode) {
      case AppMode.GENERATE:
        return <GeneratePanel />;
      case AppMode.EDIT:
        return <EditPanel />;
      case AppMode.UPSCALE:
        return <UpscalePanel />;
      default:
        return <GeneratePanel />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TabSelector activeMode={mode} onSelectMode={setMode} />
        <div className="mt-8 bg-slate-800/50 rounded-2xl shadow-2xl p-4 sm:p-8 border border-slate-700">
          {renderPanel()}
        </div>
      </main>
       <footer className="text-center py-6 text-slate-500 text-sm">
          <p>Powered by Gemini AI. Created for incredible visual experiences.</p>
        </footer>
    </div>
  );
};

export default App;
