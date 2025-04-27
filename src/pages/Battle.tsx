import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DialogBox from '../components/DialogBox';
import PixelHeart from '../components/PixelHeart';
import BattleButton from '../components/BattleButton';
import HPBar from '../components/HPBar';
import BattleArea from '../components/BattleArea';
import AudioPlayer from '../components/AudioPlayer';

interface BossData {
  id: string;
  name: string;
  hp: number;
  attacks: string[];
  dialog: string[];
  music: string;
  attackRate: number;
}

const Battle = () => {
  const { bossId } = useParams<{ bossId: string }>();
  const navigate = useNavigate();
  
  const [playerHp, setPlayerHp] = useState(20);
  const [bossHp, setBossHp] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'battle' | 'menu' | 'bossAttack'>('intro');
  const [dialogIndex, setDialogIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<'attack' | 'act' | 'item' | 'mercy' | null>(null);
  const [battleText, setBattleText] = useState('');
  const [items] = useState(['Мгнов. лапша', 'Легендарн. герой', 'Пирог ирис', 'Сок моря']);
  const [isBossAttacking, setIsBossAttacking] = useState(false);

  // Sound effects
  const hitSound = "https://example.com/hit.mp3";
  const healSound = "https://example.com/heal.mp3";
  
  // Data for bosses
  const bossesData: Record<string, BossData> = {
    'sans': {
      id: 'sans',
      name: 'Sans',
      hp: 1,
      attacks: ['Гастербластеры', 'Кости', 'Синяя атака'],
      dialog: [
        '* хех, привет, приятель.',
        '* ты выглядишь как человек, которому нечем заняться.',
        '* ну, давай повеселимся. я буду стараться не заснуть.'
      ],
      music: "https://example.com/megalovania.mp3",
      attackRate: 0.8
    },
    'papyrus': {
      id: 'papyrus',
      name: 'Papyrus',
      hp: 680,
      attacks: ['Синяя душа', 'Кости', 'Особая атака'],
      dialog: [
        '* НЬЕ-ХЕ-ХЕ! ЧЕЛОВЕК!',
        '* Я, ВЕЛИКИЙ ПАПИРУС, ПОЙМАЮ ТЕБЯ!',
        '* ПОДГОТОВЬСЯ К МОИМ ГОЛОВОЛОМКАМ И КОСТЯМ!'
      ],
      music: "https://example.com/bonetrousle.mp3",
      attackRate: 0.6
    },
    'undyne': {
      id: 'undyne',
      name: 'Undyne',
      hp: 1500,
      attacks: ['Зелёная душа', 'Копья', 'Круговая атака'],
      dialog: [
        '* Семь душ. Нам нужно семь душ, и король Азгор станет богом.',
        '* Шесть. Вот сколько у нас есть. Понимаешь?',
        '* Твоя душа - последняя, что нам нужна. ПРИГОТОВЬСЯ!'
      ],
      music: "https://example.com/spear-of-justice.mp3",
      attackRate: 0.9
    }
  };

  const boss = bossesData[bossId || 'sans'];
  
  // Initialize boss HP when component mounts
  useEffect(() => {
    if (boss) {
      setBossHp(boss.hp);
    }
  }, [boss]);
  
  // If boss doesn't exist, redirect to home
  useEffect(() => {
    if (!boss) {
      navigate('/');
    }
  }, [boss, navigate]);

  // Handle player damage
  const handlePlayerHit = () => {
    if (playerHp > 0) {
      setPlayerHp(prev => Math.max(0, prev - 1));
      
      // Play hit sound
      const audio = new Audio(hitSound);
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Error playing sound:", e));
      
      // If player dies
      if (playerHp <= 1) {
        setBattleText("* ИГРА ОКОНЧЕНА");
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    }
  };
  
  // Handle dialog completion
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
  
  // Handle boss attack phase
  const startBossAttack = () => {
    setCurrentPhase('bossAttack');
    setIsBossAttacking(true);
    
    // Show attack text
    setBattleText(`* ${boss.name} атакует!`);
    
    // End attack after some time
    setTimeout(() => {
      setIsBossAttacking(false);
      setCurrentPhase('menu');
      setBattleText(`* Ход ${boss.name} завершён.`);
    }, 5000);
  };

  // Handle action buttons
  const handleActionClick = (action: 'attack' | 'act' | 'item' | 'mercy') => {
    setSelectedAction(action);
    
    switch(action) {
      case 'attack':
        setBattleText(`* Вы атакуете ${boss.name}!`);
        
        // Calculate damage (random between 5-10)
        const damage = Math.floor(Math.random() * 6) + 5;
        
        // Update boss HP
        setBossHp(prev => Math.max(0, prev - damage));
        
        // Play attack sound
        const audio = new Audio(hitSound);
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Error playing sound:", e));
        
        // If boss is defeated
        if (bossHp <= damage) {
          setBattleText(`* Вы победили ${boss.name}!`);
          setTimeout(() => {
            navigate('/');
          }, 3000);
          return;
        }
        
        // Start boss attack after delay
        setTimeout(() => {
          setSelectedAction(null);
          startBossAttack();
        }, 1500);
        break;
        
      case 'act':
        const acts = [
          `* Вы рассказываете ${boss.name} шутку.`,
          `* Вы пытаетесь поговорить с ${boss.name}.`,
          `* Вы улыбаетесь ${boss.name}.`
        ];
        const randomAct = acts[Math.floor(Math.random() * acts.length)];
        setBattleText(randomAct);
        
        // Start boss attack after delay
        setTimeout(() => {
          setSelectedAction(null);
          startBossAttack();
        }, 1500);
        break;
        
      case 'item':
        // Show items menu, don't start boss attack yet
        break;
        
      case 'mercy':
        const mercyTexts = [
          `* Вы пытаетесь пощадить ${boss.name}.`,
          `* ${boss.name} не выглядит готовым к пощаде.`,
          `* Вы предлагаете закончить битву мирно.`
        ];
        const randomMercy = mercyTexts[Math.floor(Math.random() * mercyTexts.length)];
        setBattleText(randomMercy);
        
        // Start boss attack after delay
        setTimeout(() => {
          setSelectedAction(null);
          startBossAttack();
        }, 1500);
        break;
    }
  };

  // Handle item use
  const handleItemUse = (item: string) => {
    // Different healing amount based on item
    let healAmount = 10;
    if (item === 'Легендарн. герой') healAmount = 15;
    if (item === 'Пирог ирис') healAmount = 20;
    if (item === 'Сок моря') healAmount = 8;
    
    setBattleText(`* Вы используете ${item}. Восстановлено ${healAmount} HP!`);
    setPlayerHp(prev => Math.min(prev + healAmount, 20));
    
    // Play heal sound
    const audio = new Audio(healSound);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Error playing sound:", e));
    
    // Start boss attack after delay
    setTimeout(() => {
      setSelectedAction(null);
      startBossAttack();
    }, 1500);
  };

  // Handle back button in item menu
  const handleBack = () => {
    setSelectedAction(null);
  };

  // Button to return to main menu
  const handleReturnToMain = () => {
    navigate('/');
  };

  if (!boss) return null;

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col">
      <AudioPlayer src={boss.music} />
      
      <div className="container mx-auto flex-grow">
        {/* Boss info section */}
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-pixelated text-white mb-4">{boss.name}</h2>
          <div className="w-32 h-32 bg-white flex items-center justify-center mb-2">
            <span className="text-4xl text-black">{boss.name.charAt(0)}</span>
          </div>
          
          {/* Boss HP bar */}
          {currentPhase !== 'intro' && (
            <HPBar currentHP={bossHp} maxHP={boss.hp} className="mt-2" />
          )}
        </div>
        
        {/* Battle area section */}
        <div className="mb-8">
          {currentPhase === 'intro' ? (
            <DialogBox 
              text={boss.dialog[dialogIndex]} 
              onComplete={handleDialogComplete}
              className="mb-4"
            />
          ) : (
            <div className="bg-black border-4 border-white p-6 flex flex-col items-center">
              {/* Battle area with heart */}
              {currentPhase === 'bossAttack' ? (
                <BattleArea 
                  bossId={boss.id} 
                  onHit={handlePlayerHit}
                  isAttacking={isBossAttacking}
                />
              ) : (
                <div className="w-full h-48 bg-black border border-white mb-4 flex justify-center items-center">
                  <PixelHeart className="animate-heart-beat" />
                </div>
              )}
              
              {/* Battle text */}
              <div className="w-full">
                <DialogBox 
                  text={battleText || `* ${boss.name} ждёт вашего хода.`} 
                  className="mb-4"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
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
      
      {/* Player HP and return button */}
      <div className="mt-auto pt-4 flex justify-between items-center">
        <HPBar currentHP={playerHp} maxHP={20} />
        
        <BattleButton 
          text="Вернуться" 
          onClick={handleReturnToMain} 
          color="white"
        />
      </div>
      
      {/* Controls help */}
      <div className="mt-4 text-gray-400 text-xs text-center">
        Управление: Стрелки для перемещения сердца, Z для подтверждения, X для отмены
      </div>
    </div>
  );
};

export default Battle;
