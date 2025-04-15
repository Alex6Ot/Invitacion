import React, { useEffect, useRef, useState } from 'react';
import { Music, Music2 } from 'lucide-react'; // o cualquier ícono que uses

const [playingMusic, setPlayingMusic] = useState(false);
const audioRef = useRef<HTMLAudioElement | null>(null);

useEffect(() => {
  audioRef.current = new Audio('/music/fiesta.mp3');
  audioRef.current.loop = true; // Opcional: para que siga sonando
}, []);

useEffect(() => {
  if (audioRef.current) {
    if (playingMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }
}, [playingMusic]);
