import React from 'react';

interface PixelHeartProps {
  className?: string;
}

const PixelHeart: React.FC<PixelHeartProps> = ({ className = '' }) => {
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
