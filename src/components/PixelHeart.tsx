import React, { useEffect, useState } from 'react';

interface PixelHeartProps {
  className?: string;
  controlled?: boolean;
}

const PixelHeart: React.FC<PixelHeartProps> = ({ className = '', controlled = false }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  
  useEffect(() => {
    if (!controlled) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      
      setPosition(prev => {
        const step = 10;
        switch (e.key) {
          case 'ArrowUp':
            return { ...prev, y: Math.max(0, prev.y - step) };
          case 'ArrowDown':
            return { ...prev, y: Math.min(100, prev.y + step) };
          case 'ArrowLeft':
            return { ...prev, x: Math.max(0, prev.x - step) };
          case 'ArrowRight':
            return { ...prev, x: Math.min(100, prev.x + step) };
          default:
            return prev;
        }
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controlled]);
  
  if (controlled) {
    return (
      <div 
        className={`w-6 h-6 heart-controlled ${className}`} 
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      >
        <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="2" width="2" height="2" fill="#FF0000" />
          <rect x="7" y="2" width="2" height="2" fill="#FF0000" />
          <rect x="11" y="2" width="2" height="2" fill="#FF0000" />
          <rect x="9" y="2" width="2" height="2" fill="#FF0000" />
          <rect x="3" y="4" width="2" height="2" fill="#FF0000" />
          <rect x="5" y="4" width="2" height="2" fill="#FF0000" />
          <rect x="7" y="4" width="2" height="2" fill="#FF0000" />
          <rect x="9" y="4" width="2" height="2" fill="#FF0000" />
          <rect x="11" y="4" width="2" height="2" fill="#FF0000" />
          <rect x="13" y="4" width="2" height="2" fill="#FF0000" />
          <rect x="3" y="6" width="2" height="2" fill="#FF0000" />
          <rect x="5" y="6" width="2" height="2" fill="#FF0000" />
          <rect x="7" y="6" width="2" height="2" fill="#FF0000" />
          <rect x="9" y="6" width="2" height="2" fill="#FF0000" />
          <rect x="11" y="6" width="2" height="2" fill="#FF0000" />
          <rect x="13" y="6" width="2" height="2" fill="#FF0000" />
          <rect x="5" y="8" width="2" height="2" fill="#FF0000" />
          <rect x="7" y="8" width="2" height="2" fill="#FF0000" />
          <rect x="9" y="8" width="2" height="2" fill="#FF0000" />
          <rect x="11" y="8" width="2" height="2" fill="#FF0000" />
          <rect x="7" y="10" width="2" height="2" fill="#FF0000" />
          <rect x="9" y="10" width="2" height="2" fill="#FF0000" />
          <rect x="9" y="12" width="2" height="2" fill="#FF0000" />
        </svg>
      </div>
    );
  }
  
  return (
    <div className={`w-6 h-6 ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="2" width="2" height="2" fill="#FF0000" />
        <rect x="7" y="2" width="2" height="2" fill="#FF0000" />
        <rect x="11" y="2" width="2" height="2" fill="#FF0000" />
        <rect x="9" y="2" width="2" height="2" fill="#FF0000" />
        <rect x="3" y="4" width="2" height="2" fill="#FF0000" />
        <rect x="5" y="4" width="2" height="2" fill="#FF0000" />
        <rect x="7" y="4" width="2" height="2" fill="#FF0000" />
        <rect x="9" y="4" width="2" height="2" fill="#FF0000" />
        <rect x="11" y="4" width="2" height="2" fill="#FF0000" />
        <rect x="13" y="4" width="2" height="2" fill="#FF0000" />
        <rect x="3" y="6" width="2" height="2" fill="#FF0000" />
        <rect x="5" y="6" width="2" height="2" fill="#FF0000" />
        <rect x="7" y="6" width="2" height="2" fill="#FF0000" />
        <rect x="9" y="6" width="2" height="2" fill="#FF0000" />
        <rect x="11" y="6" width="2" height="2" fill="#FF0000" />
        <rect x="13" y="6" width="2" height="2" fill="#FF0000" />
        <rect x="5" y="8" width="2" height="2" fill="#FF0000" />
        <rect x="7" y="8" width="2" height="2" fill="#FF0000" />
        <rect x="9" y="8" width="2" height="2" fill="#FF0000" />
        <rect x="11" y="8" width="2" height="2" fill="#FF0000" />
        <rect x="7" y="10" width="2" height="2" fill="#FF0000" />
        <rect x="9" y="10" width="2" height="2" fill="#FF0000" />
        <rect x="9" y="12" width="2" height="2" fill="#FF0000" />
      </svg>
    </div>
  );
};

export default PixelHeart;
