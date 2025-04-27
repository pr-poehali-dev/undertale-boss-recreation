import React, { useState, useEffect } from 'react';
import BossCard from '../components/BossCard';
import TypingText from '../components/TypingText';
import DialogBox from '../components/DialogBox';
import PixelHeart from '../components/PixelHeart';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  
  const bosses = [
    {
      id: 'sans',
      name: 'Sans',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=100&h=100',
      description: 'Лёгкий противник. Всего 1 HP, но уворачивается от всех атак. Имеет особую атаку КАРМЫ.'
    },
    {
      id: 'papyrus',
      name: 'Papyrus',
      imageUrl: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80&w=100&h=100',
      description: 'Очень приветливый скелет. Превращает вашу душу в синюю и атакует костями.'
    },
    {
      id: 'undyne',
      name: 'Undyne',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=100&h=100',
      description: 'Капитан королевской гвардии. Превращает вашу душу в зелёную и атакует копьями со всех сторон.'
    }
  ];

  const introTexts = [
    "* Добро пожаловать в UNDERTALEBOSS.",
    "* Здесь ты можешь сразиться с любым из боссов UNDERTALE.",
    "* Выбери босса, и начнётся битва.",
    "* Удачи тебе... ты будешь нуждаться в РЕШИМОСТИ."
  ];

  const handleIntroComplete = () => {
    if (introStep < introTexts.length - 1) {
      setIntroStep(prevStep => prevStep + 1);
    } else {
      setShowIntro(false);
    }
  };

  const playTitleMusic = () => {
    // В реальном приложении здесь был бы код для воспроизведения музыки
    console.log("Playing title music");
  };

  useEffect(() => {
    playTitleMusic();
  }, []);

  if (showIntro) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
        <h1 className="text-5xl font-pixelated text-undertale-white mb-8">UNDERTALEBOSS</h1>
        <div className="w-full max-w-md">
          <DialogBox 
            text={introTexts[introStep]} 
            onComplete={handleIntroComplete}
            className="mb-4"
          />
          <div className="text-right">
            <button 
              onClick={handleIntroComplete}
              className="text-undertale-white border-b-2 border-undertale-white"
            >
              {'>>'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-pixelated text-undertale-white">UNDERTALEBOSS</h1>
          <PixelHeart className="animate-heart-beat" />
        </div>
        
        <div className="mb-8">
          <DialogBox 
            text="* Выбери босса, с которым хочешь сразиться. Твоя РЕШИМОСТЬ будет проверена." 
            className="mb-4"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default Index;
