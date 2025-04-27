import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BossCard from '../components/BossCard';
import DialogBox from '../components/DialogBox';
import TypingText from '../components/TypingText';
import AudioPlayer from '../components/AudioPlayer';

interface Boss {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

const Index = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showBosses, setShowBosses] = useState(false);
  
  const bosses: Boss[] = [
    {
      id: 'sans',
      name: 'Sans',
      imageUrl: '',
      description: 'Самый легкий босс. Или... нет?'
    },
    {
      id: 'papyrus',
      name: 'Papyrus',
      imageUrl: '',
      description: 'ВЕЛИКИЙ ПАПИРУС ПОЙМАЕТ ТЕБЯ, ЧЕЛОВЕК!'
    },
    {
      id: 'undyne',
      name: 'Undyne',
      imageUrl: '',
      description: 'Глава Королевской Стражи. Не сдаётся никогда.'
    }
  ];
  
  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 1000);
    
    const bossesTimer = setTimeout(() => {
      setShowBosses(true);
    }, 3000);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(bossesTimer);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <AudioPlayer src="https://example.com/menu-theme.mp3" />
      
      {showTitle && (
        <div className="mb-12 mt-8 text-center animate-fade-in">
          <h1 className="text-6xl font-pixelated mb-2 text-yellow-300">UNDERTALEBOSS</h1>
          <p className="text-white text-xl">Выберите босса для битвы</p>
        </div>
      )}
      
      {showBosses && (
        <>
          <div className="w-full max-w-3xl mb-8">
            <DialogBox 
              text="* Это не настоящая UNDERTALE. Но мы очень старались!"
              className="mb-4"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {bosses.map(boss => (
              <BossCard
                key={boss.id}
                id={boss.id}
                name={boss.name}
                imageUrl={boss.imageUrl}
                description={boss.description}
              />
            ))}
          </div>
          
          <div className="mt-12">
            <p className="text-gray-400 text-sm">
              Управление: стрелки для движения, Z для подтверждения, X для отмены
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
