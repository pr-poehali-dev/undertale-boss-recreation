import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  src, 
  autoPlay = true, 
  loop = true, 
  volume = 0.5 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = volume;
    audio.loop = loop;
    
    if (autoPlay) {
      // Try to play audio - might fail due to browser autoplay policies
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay, loop, volume]);
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.log("Play prevented:", error));
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={src} preload="auto" />
      <button 
        onClick={togglePlay}
        className="bg-black border-2 border-white p-2 rounded-none"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </div>
  );
};

export default AudioPlayer;
