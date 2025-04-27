import React, { useState, useEffect } from 'react';
import TypingText from './TypingText';

interface DialogBoxProps {
  text: string;
  className?: string;
  onComplete?: () => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ text, className = '', onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setShowContinue(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  const handleTypingComplete = () => {
    setIsComplete(true);
  };

  const handleClick = () => {
    if (isComplete && onComplete) {
      onComplete();
      setIsComplete(false);
      setShowContinue(false);
    }
  };

  return (
    <div 
      className={`dialog-box relative ${className}`}
      onClick={handleClick}
    >
      <TypingText 
        text={text} 
        speed={30} 
        onComplete={handleTypingComplete}
      />
      {showContinue && (
        <div className="absolute bottom-2 right-4 animate-pulse">
          <span className="text-white">▼</span>
        </div>
      )}
    </div>
  );
};

export default DialogBox;
