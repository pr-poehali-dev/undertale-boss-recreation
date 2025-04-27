import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 50,
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        // Add next character
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // Play typing sound (except for spaces)
        if (text[currentIndex] !== ' ') {
          const audio = new Audio('/sounds/typing.mp3');
          audio.volume = 0.2;
          audio.play().catch(e => console.log("Error playing sound:", e));
        }
      }, speed);
      
      return () => clearTimeout(typingTimer);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);
  
  // For instant display on click
  const completeTyping = () => {
    if (!isComplete) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
    }
  };
  
  return (
    <div onClick={completeTyping}>
      {displayedText}
    </div>
  );
};

export default TypingText;
