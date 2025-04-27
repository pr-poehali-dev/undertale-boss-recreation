import React from 'react';

interface BattleButtonProps {
  text: string;
  onClick: () => void;
  color: 'red' | 'yellow' | 'green' | 'white' | 'blue';
  className?: string;
}

const BattleButton: React.FC<BattleButtonProps> = ({ text, onClick, color, className = '' }) => {
  const colorClasses = {
    red: 'text-red-500 border-red-500 hover:bg-red-900 hover:bg-opacity-20',
    yellow: 'text-yellow-300 border-yellow-300 hover:bg-yellow-900 hover:bg-opacity-20',
    green: 'text-green-500 border-green-500 hover:bg-green-900 hover:bg-opacity-20',
    white: 'text-white border-white hover:bg-gray-700 hover:bg-opacity-20',
    blue: 'text-blue-400 border-blue-400 hover:bg-blue-900 hover:bg-opacity-20',
  };

  return (
    <button
      onClick={onClick}
      className={`border-2 py-2 px-4 bg-black font-pixelated transition-colors ${colorClasses[color]} ${className}`}
    >
      {text}
    </button>
  );
};

export default BattleButton;
