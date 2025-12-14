
import React from 'react';
import { X, Plus } from 'lucide-react';

interface NudgePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRequest: () => void;
}

const NudgePopup: React.FC<NudgePopupProps> = ({ isOpen, onClose, onRequest }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-[480px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-gray-100 p-8 animate-fade-in-up">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
      >
        <X size={20} />
      </button>
      
      <div className="pr-2 text-center">
        <h3 className="text-gray-900 font-bold text-lg mb-3">
          Can’t find the integration you need?
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Request it and we’ll get back to you soon.
        </p>
        
        <button
          onClick={onRequest}
          className="w-full flex items-center justify-center px-6 py-3 bg-[#0052cc] text-white rounded-lg text-base font-bold hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} className="mr-2" />
          Request Integration
        </button>
      </div>
    </div>
  );
};

export default NudgePopup;
