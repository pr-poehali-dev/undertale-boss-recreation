import React, { useState, useEffect } from 'react';
import PixelHeart from './PixelHeart';

interface Bullet {
  id: number;
  x: number;
  y: number;
  type: 'bone' | 'spear' | 'blaster';
  direction: 'up' | 'down' | 'left' | 'right';
}

interface BattleAreaProps {
  bossId: string;
  onHit: () => void;
  isAttacking: boolean;
}

const BattleArea: React.FC<BattleAreaProps> = ({ bossId, onHit, isAttacking }) => {
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [bulletId, setBulletId] = useState(0);
  
  // Boss-specific attack patterns
  useEffect(() => {
    if (!isAttacking) {
      setBullets([]);
      return;
    }
    
    let attackInterval: NodeJS.Timeout;
    
    switch(bossId) {
      case 'sans':
        // Sans attacks with bones moving horizontally
        attackInterval = setInterval(() => {
          const newBullet = {
            id: bulletId,
            x: Math.random() * 100,
            y: Math.random() * 100,
            type: 'bone' as const,
            direction: Math.random() > 0.5 ? 'left' as const : 'right' as const
          };
          
          setBullets(prev => [...prev, newBullet]);
          setBulletId(prev => prev + 1);
          
          // Remove bullet after animation completes
          setTimeout(() => {
            setBullets(prev => prev.filter(b => b.id !== newBullet.id));
          }, 2000);
        }, 800);
        break;
        
      case 'papyrus':
        // Papyrus attacks with bones moving vertically
        attackInterval = setInterval(() => {
          const newBullet = {
            id: bulletId,
            x: Math.random() * 100,
            y: -10,
            type: 'bone' as const,
            direction: 'down' as const
          };
          
          setBullets(prev => [...prev, newBullet]);
          setBulletId(prev => prev + 1);
          
          // Remove bullet after animation completes
          setTimeout(() => {
            setBullets(prev => prev.filter(b => b.id !== newBullet.id));
          }, 2000);
        }, 1000);
        break;
        
      case 'undyne':
        // Undyne attacks with spears from all directions
        attackInterval = setInterval(() => {
          const directions = ['up', 'down', 'left', 'right'];
          const direction = directions[Math.floor(Math.random() * directions.length)] as 'up' | 'down' | 'left' | 'right';
          
          let x = 50;
          let y = 50;
          
          if (direction === 'up') y = 110;
          if (direction === 'down') y = -10;
          if (direction === 'left') x = 110;
          if (direction === 'right') x = -10;
          
          const newBullet = {
            id: bulletId,
            x,
            y,
            type: 'spear' as const,
            direction
          };
          
          setBullets(prev => [...prev, newBullet]);
          setBulletId(prev => prev + 1);
          
          // Remove bullet after animation completes
          setTimeout(() => {
            setBullets(prev => prev.filter(b => b.id !== newBullet.id));
          }, 2000);
        }, 1200);
        break;
    }
    
    return () => clearInterval(attackInterval);
  }, [bossId, bulletId, isAttacking]);
  
  // Check for collision with player heart
  useEffect(() => {
    // In a real implementation, we would check for collisions here
    // and call onHit() when a collision is detected
    const collisionCheckInterval = setInterval(() => {
      if (bullets.length > 0 && Math.random() < 0.2) {
        onHit();
      }
    }, 1000);
    
    return () => clearInterval(collisionCheckInterval);
  }, [bullets, onHit]);
  
  return (
    <div className="w-full h-48 bg-black border border-white mb-4 battle-area">
      {bullets.map(bullet => (
        <div 
          key={bullet.id}
          className="bullet"
          style={{ 
            left: `${bullet.x}%`, 
            top: `${bullet.y}%` 
          }}
        ></div>
      ))}
      <PixelHeart controlled className="animate-heart-beat" />
    </div>
  );
};

export default BattleArea;
