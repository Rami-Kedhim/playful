
import React from 'react';

interface LucieTypingIndicatorProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  avatarSize?: 'small' | 'medium' | 'large';
  showName?: boolean;
}

const LucieTypingIndicator = ({
  className = "",
  size = "medium",
  avatarSize = "medium",
  showName = true
}: LucieTypingIndicatorProps) => {
  const dotSize = {
    small: "w-1 h-1 mx-[1px]",
    medium: "w-1.5 h-1.5 mx-[2px]",
    large: "w-2 h-2 mx-[3px]"
  }[size];

  const avatar = {
    small: "h-6 w-6 mr-2 text-xs",
    medium: "h-8 w-8 mr-2 text-sm",
    large: "h-10 w-10 mr-3 text-base"
  }[avatarSize];

  return (
    <div 
      className={`flex items-center ${className}`} 
      aria-label="Lucie is typing"
      role="status"
    >
      <div className={`${avatar} rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-md`}>
        L
      </div>
      <div className="flex flex-col">
        {showName && <span className="text-xs text-white/70 mb-1 font-medium">Lucie</span>}
        <div className="flex items-center space-x-0.5 bg-black/20 px-3 py-1.5 rounded-xl">
          <div className={`rounded-full bg-white/80 ${dotSize} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
          <div className={`rounded-full bg-white/80 ${dotSize} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
          <div className={`rounded-full bg-white/80 ${dotSize} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LucieTypingIndicator;
