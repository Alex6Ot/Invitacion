import React, { useState, useEffect, useRef } from 'react';
import { Music, Music2 } from 'lucide-react'; // Asegúrate de tener estos íconos

const VSCodeEditor: React.FC = () => {
  const [tiempoRestante, setTiempoRestante] = useState('');
  const [playingMusic, setPlayingMusic] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reproduce música al cargar
  useEffect(() => {
    audioRef.current = new Audio('/music/fiesta.mp3');
    audioRef.current.loop = true;

    const autoPlay = async () => {
      try {
        await audioRef.current?.play();
      } catch (err) {
        console.warn('Autoplay bloqueado');
      }
    };

    autoPlay();

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Reproduce o pausa según el estado playingMusic
  useEffect(() => {
    if (!audioRef.current) return;

    if (playingMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playingMusic]);

  function getTiempoHastaFiesta(): string {
    const fechaFiesta = new Date('2025-04-20T16:00:00');
    const ahora = new Date();
    const diferencia = fechaFiesta.getTime() - ahora.getTime();

    if (diferencia <= 0) return "¡La fiesta ya comenzó!";

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    return `${dias} días, ${horas} horas, ${minutos} minutos`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTiempoRestante(getTiempoHastaFiesta());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const partyDetails = `
// Código de fiesta de Alexei
const fiestaAlexei = {
  fecha: "Domingo, 20 de abril de 2025",
  hora: "4:00 PM",
  lugar: "Sayulteca 13, Carlos Zapata Vela, CDMX"
};

// Detalles adicionales
const detallesFiesta = {
  tema: "¡Familia y Diversión! 👨‍👩‍👧‍👦🎉",
  dresscode: "Como quieran 👕",
  regalo: "Tu presencia es el mejor regalo 🎁",
  extras: [
    "Habrá snacks 🍟",
    "Bebidas refrescantes 🥤",
    "¡Y Pozole! 🍲 "
  ]
};
`;

  return (
    <div className="relative bg-[#1e1e1e] text-white font-mono min-h-screen p-8">
      {/* Cabecera tipo VSCode */}
      <div className="bg-[#333333] text-[#d4d4d4] px-4 py-2 rounded-t-md flex justify-between items-center">
        <div className="text-xl text-green-400 font-semibold">Están cordialmente invitados 🎉</div>
        <div className="text-sm text-gray-400">Cuenta regresiva: {tiempoRestante}</div>
      </div>

      {/* Editor de código */}
      <div className="relative bg-[#1e1e1e] border border-gray-700 rounded-b-md shadow-lg overflow-auto">
        <div className="absolute left-0 top-0 px-3 py-4 text-gray-600 select-none">
          {partyDetails.split('\n').map((_, i) => (
            <div key={i} className="h-[1.5rem] leading-[1.5rem]">{i + 1}</div>
          ))}
        </div>

        <div className="ml-12 p-4 whitespace-pre-wrap">
          <pre>
            <code
              dangerouslySetInnerHTML={{
                __html: partyDetails
                  .replace(/const/g, '<span class="text-blue-400">const</span>')
                  .replace(/function/g, '<span class="text-blue-400">function</span>')
                  .replace(/"[^"]*"/g, match => `<span class="text-green-400">${match}</span>`)
                  .replace(/\/\/ .*$/gm, match => `<span class="text-gray-500">${match}</span>`)
              }}
            />
          </pre>
        </div>
      </div>

      {/* Status Bar con control de música */}
      <div className="bg-[#007acc] text-white px-4 py-1 flex justify-between items-center mt-2 rounded-b-md">
        <div className="flex items-center space-x-4">
          <span>npm run fiesta</span>
        </div>
        <button
          onClick={() => setPlayingMusic(!playingMusic)}
          className="flex items-center space-x-2 hover:bg-[#1177bb] px-2 py-1 rounded"
        >
          {playingMusic ? <Music2 size={16} /> : <Music size={16} />}
          <span className="text-sm">
            {playingMusic ? 'Pausar Música' : 'Reproducir Música'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default VSCodeEditor;
