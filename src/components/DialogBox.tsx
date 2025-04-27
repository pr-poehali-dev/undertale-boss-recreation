import React from 'react';
import TypingText from './TypingText';

interface DialogBoxProps {
  text: string;
  onComplete?: () => void;
  speed?: number;
  className?: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ 
  text, 
  onComplete, 
  speed = 50,
  className = '' 
}) => {
  return (
    <div className={`bg-black border-4 border-white p-4 ${className}`}>
      <TypingText text={text} speed={speed} onComplete={onComplete} />
    </div>
  );
};

export default DialogBox;
