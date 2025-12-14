
import React from 'react';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isZapier?: boolean;
  onClick?: () => void;
  actionLabel?: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
  title, 
  description, 
  icon, 
  isZapier, 
  onClick, 
  actionLabel,
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
      flex flex-col items-start rounded-lg p-6 relative cursor-pointer group transition-all duration-200
      bg-white border border-gray-200 hover:shadow-sm
      ${isZapier ? 'max-w-sm' : ''}
    `}>
      <div className="mb-4 transition-transform duration-200 group-hover:scale-105 origin-left">
        {icon}
      </div>
      <h3 className="font-semibold text-base mb-2 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      <button 
        className="text-sm font-medium mt-auto focus:outline-none flex items-center text-[#0052cc] hover:underline"
      >
        {actionLabel || "Connect Now"}
      </button>
    </div>
  );
};

export default IntegrationCard;
