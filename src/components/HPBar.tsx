import React from 'react';

interface HPBarProps {
  currentHP: number;
  maxHP: number;
  className?: string;
}

const HPBar: React.FC<HPBarProps> = ({ currentHP, maxHP, className = '' }) => {
  const percentage = Math.max(0, Math.min(100, (currentHP / maxHP) * 100));
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="text-white">HP</div>
      <div className="w-full max-w-[200px] h-6 bg-gray-800 border-2 border-white">
        <div 
          className="hp-bar h-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        >
          <div className="hp-bar-text flex justify-center items-center h-full">
            {currentHP} / {maxHP}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HPBar;
