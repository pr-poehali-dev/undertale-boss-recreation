import React from 'react';
import { Link } from 'react-router-dom';

interface BossCardProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

const BossCard: React.FC<BossCardProps> = ({ id, name, imageUrl, description }) => {
  return (
    <Link to={`/battle/${id}`} className="block">
      <div className="bg-black border-4 border-white p-4 cursor-pointer hover:bg-gray-900 transition-colors">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white mb-2 flex items-center justify-center">
            <span className="text-xl text-black">{name.charAt(0)}</span>
          </div>
          <h3 className="text-white text-xl mb-1">{name}</h3>
          <p className="text-white text-xs text-center">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default BossCard;
