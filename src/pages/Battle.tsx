import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DialogBox from '../components/DialogBox';
import PixelHeart from '../components/PixelHeart';
import BattleButton from '../components/BattleButton';

interface BossData {
  id: string;
  name: string;
  imageUrl: string;
  hp: number;
  attacks: string[];
  dialog: string[];
}

const Battle = () => {
  const { bossId } = useParams<{ bossId: string }>();
  const navigate = useNavigate();
  
  const [playerHp, setPlayerHp] = useState(20);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'battle' | 'menu'>('intro');
  const [dialogIndex, setDialogIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<'attack' | 'act' | 'item' | 'mercy' | null>(null);
  const [battleText, setBattleText] = useState('');
  const [items] = useState(['Мгнов. лапша', 'Легендарн. герой', 'Пирог ирис', 'Сок моря']);

  // Данные босса (в реальном приложении лучше хранить в отдельном файле)
  const bossesData: Record<string, BossData> = {
    'sans': {
      id: 'sans',
      name: 'Sans',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=100&h=100',
      hp: 1,
      attacks: ['Гастербластеры', 'Кости', 'Синяя атака'],
      dialog: [
        '* хех, привет, приятель.',
        '* ты выглядишь как человек, которому нечем заняться.',
        '* ну, давай повеселимся. я буду стараться не заснуть.'
      ]
    },
    'papyrus': {
      id: 'papyrus',
      name: 'Papyrus',
      imageUrl: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80&w=100&h=100',
      hp: 680,
      attacks: ['Синяя душа', 'Кости', 'Особая атака'],
      dialog: [
        '* НЬЕ-ХЕ-ХЕ! ЧЕЛОВЕК!',
        '* Я, ВЕЛИКИЙ ПАПИРУС, ПОЙМАЮ ТЕБЯ!',
        '* ПОДГОТОВЬСЯ К МОИМ ГОЛОВОЛОМКАМ И КОСТЯМ!'
      ]
    },
    'undyne': {
      id: 'undyne',
      name: 'Undyne',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=100&h=100',
      hp: 1500,
      attacks: ['Зелёная душа', 'Копья', 'Круговая атака'],
      dialog: [
        '* Семь душ. Нам нужно семь душ, и король Азгор станет богом.',
        '* Шесть. Вот сколько у нас есть. Понимаешь?',
        '* Твоя душа - последняя, что нам нужна. ПРИГОТОВЬСЯ!'
      ]
    }
  };

  const boss = bossesData[bossId || 'sans'];
  
  // Если босса не существует, перенаправляем на главную
  useEffect(() => {
    if (!boss) {
      navigate('/');
    }
  }, [boss, navigate]);

  // Обработчик завершения диалога
  const handleDialogComplete = () => {
    if (currentPhase === 'intro') {
      if (dialogIndex < boss.dialog.length - 1) {
        setDialogIndex(prevIndex => prevIndex + 1);
      } else {
        setCurrentPhase('menu');
        setBattleText(`* ${boss.name} блокирует путь!`);
      }
    }
  };

  // Обработчик кнопок действия
  const handleActionClick = (action: 'attack' | 'act' | 'item' | 'mercy') => {
    setSelectedAction(action);
    
    switch(action) {
      case 'attack':
        setBattleText(`* Вы атакуете ${boss.name}!`);
        // В реальном приложении здесь была бы механика атаки
        break;
      case 'act':
        setBattleText(`* Вы пытаетесь поговорить с ${boss.name}.`);
        break;
      case 'item':
        // Здесь не меняем текст, так как отобразим список предметов
        break;
      case 'mercy':
        setBattleText(`* Вы пытаетесь пощадить ${boss.name}.`);
        break;
    }
  };

  // Обработчик использования предмета
  const handleItemUse = (item: string) => {
    setBattleText(`* Вы используете ${item}. Восстановлено 10 HP!`);
    setPlayerHp(prev => Math.min(prev + 10, 20));
    setSelectedAction(null);
  };

  // Обработчик кнопки "Назад"
  const handleBack = () => {
    setSelectedAction(null);
  };

  // Кнопка возврата на главную
  const handleReturnToMain = () => {
    navigate('/');
  };

  if (!boss) return null;

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col">
      <div className="container mx-auto flex-grow">
        {/* Верхняя часть экрана - изображение босса */}
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-pixelated text-undertale-white mb-4">{boss.name}</h2>
          <img 
            src={boss.imageUrl} 
            alt={boss.name} 
            className="pixelated w-32 h-32 animate-float"
          />
        </div>
        
        {/* Средняя часть - диалог или область битвы */}
        <div className="mb-8">
          {currentPhase === 'intro' ? (
            <DialogBox 
              text={boss.dialog[dialogIndex]} 
              onComplete={handleDialogComplete}
              className="mb-4"
            />
          ) : (
            <div className="bg-black border-4 border-white p-6 flex flex-col items-center">
              {/* Здесь будет область битвы с сердцем */}
              <div className="w-full h-48 bg-black border border-white mb-4 flex justify-center items-center">
                <PixelHeart className="animate-heart-beat" />
              </div>
              
              {/* Текст битвы */}
              <div className="w-full">
                <DialogBox 
                  text={battleText || `* ${boss.name} ждёт вашего хода.`} 
                  className="mb-4"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Нижняя часть - кнопки действия */}
        {currentPhase === 'menu' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedAction === 'item' ? (
              <>
                {items.map((item, index) => (
                  <BattleButton 
                    key={index} 
                    text={item} 
                    onClick={() => handleItemUse(item)} 
                    color="white"
                  />
                ))}
                <BattleButton 
                  text="Назад" 
                  onClick={handleBack} 
                  color="white"
                  className="col-span-2 md:col-span-4 mt-2"
                />
              </>
            ) : (
              <>
                <BattleButton 
                  text="АТАКА" 
                  onClick={() => handleActionClick('attack')} 
                  color="red"
                />
                <BattleButton 
                  text="ДЕЙСТВИЕ" 
                  onClick={() => handleActionClick('act')} 
                  color="yellow"
                />
                <BattleButton 
                  text="ПРЕДМЕТЫ" 
                  onClick={() => handleActionClick('item')} 
                  color="yellow"
                />
                <BattleButton 
                  text="ПОЩАДА" 
                  onClick={() => handleActionClick('mercy')} 
                  color="green"
                />
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Информация о здоровье и кнопка возврата */}
      <div className="mt-auto pt-4 flex justify-between">
        <div>
          <p className="text-undertale-white">
            HP: {playerHp}/20
          </p>
        </div>
        <BattleButton 
          text="Вернуться" 
          onClick={handleReturnToMain} 
          color="white"
        />
      </div>
    </div>
  );
};

export default Battle;
