import React from 'react';

interface BattleButtonProps {
  text: string;
  onClick: () => void;
  color?: 'red' | 'yellow' | 'green' | 'white';
  className?: string;
}

const BattleButton: React.FC<BattleButtonProps> = ({ 
  text, 
  onClick, 
  color = 'white',
  className = ''
}) => {
  const colorClasses = {
    red: 'text-undertale-red border-undertale-red hover:bg-red-900',
    yellow: 'text-undertale-yellow border-undertale-yellow hover:bg-yellow-900',
    green: 'text-green-500 border-green-500 hover:bg-green-900',
    white: 'text-undertale-white border-undertale-white hover:bg-gray-800',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border-2 bg-black font-pixelated text-sm transition-colors ${colorClasses[color]} ${className}`}
    >
      {text}
    </button>
  );
};

export default BattleButton;
