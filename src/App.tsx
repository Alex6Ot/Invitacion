import React, { useState, useEffect } from 'react';
import { Terminal, Music, Music2 } from 'lucide-react';
import VSCodeEditor from './components/VSCodeEditor';
import MatrixRain from './components/MatrixRain';
import { useTypewriter } from './hooks/useTypewriter';

function App() {
  const [showMatrix, setShowMatrix] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [playingMusic, setPlayingMusic] = useState(false);
  
  const title = useTypewriter("// 🎉 ¡Feliz Cumpleaños, Alexei! 🎂", 100);

  const handleRSVP = () => {
    setShowMatrix(true);
    setTimeout(() => {
      setShowThanks(true);
    }, 3000);
    setTimeout(() => {
      setShowMatrix(false);
      setShowThanks(false);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-300 flex flex-col">
      {/* VS Code Header */}
      <div className="bg-[#252526] p-2 flex items-center border-b border-[#3c3c3c]">
        <div className="flex space-x-2">
          <div className="px-4 py-1 bg-[#1e1e1e] text-white">fiesta.js</div>
          <div className="px-4 py-1 text-gray-500">cuentaRegresiva.js</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-48 bg-[#252526] border-r border-[#3c3c3c] p-2 hidden md:block">
          <div className="text-sm">
            <div className="mb-2 text-gray-500">EXPLORER</div>
            <div className="cursor-pointer hover:bg-[#37373d] p-1">📁 src</div>
            <div className="cursor-pointer hover:bg-[#37373d] p-1 pl-4">📄 fiesta.js</div>
            <div className="cursor-pointer hover:bg-[#37373d] p-1 pl-4">📄 cuentaRegresiva.js</div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-auto relative">
          <VSCodeEditor/>
          
          {/* RSVP Button */}
          <div className="fixed bottom-12 right-12">
            <button
              onClick={handleRSVP}
              className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-6 py-3 rounded 
                       transform hover:scale-105 transition-all duration-200 
                       flex items-center space-x-2"
            >
              <Terminal size={20} />
              <span>CONFIRMAR</span>
            </button>
          </div>

          {/* Matrix Effect */}
          {showMatrix && <MatrixRain />}
          
          {/* Thank You Message */}
          {showThanks && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
              <h1 className="text-4xl font-bold text-green-400 text-center animate-fade-in">
                ¡Gracias, los esperamos! 🎉
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;