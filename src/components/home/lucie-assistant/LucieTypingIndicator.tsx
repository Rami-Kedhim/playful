
import React from 'react';

interface LucieTypingIndicatorProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  avatarSize?: 'small' | 'medium' | 'large';
  showName?: boolean;
  animationStyle?: 'bounce' | 'pulse' | 'wave';
}

const LucieTypingIndicator = ({
  className = "",
  size = "medium",
  avatarSize = "medium",
  showName = true,
  animationStyle = "bounce"
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

  const getAnimationStyle = () => {
    switch(animationStyle) {
      case "pulse":
        return "animate-[pulse_1.5s_ease-in-out_infinite]";
      case "wave":
        return "animate-[wave_1.2s_ease-in-out_infinite]";
      case "bounce":
      default:
        return "animate-bounce";
    }
  };

  const animation = getAnimationStyle();

  return (
    <div 
      className={`flex items-center ${className}`} 
      aria-label="Lucie is typing"
      role="status"
    >
      <div className={`${avatar} rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-md`}>
        <span className="relative z-10">L</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse opacity-50"></div>
      </div>
      <div className="flex flex-col">
        {showName && <span className="text-xs text-white/70 mb-1 font-medium">Lucie</span>}
        <div className="flex items-center space-x-0.5 bg-black/20 px-3 py-1.5 rounded-xl">
          <div className={`rounded-full bg-white/80 ${dotSize} ${animation}`} style={{ animationDelay: '0ms' }}></div>
          <div className={`rounded-full bg-white/80 ${dotSize} ${animation}`} style={{ animationDelay: '150ms' }}></div>
          <div className={`rounded-full bg-white/80 ${dotSize} ${animation}`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LucieTypingIndicator;
