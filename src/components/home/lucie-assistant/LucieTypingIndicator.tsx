
import React from 'react';

interface LucieTypingIndicatorProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const LucieTypingIndicator = ({
  className = "",
  size = "medium"
}: LucieTypingIndicatorProps) => {
  const dotSize = {
    small: "w-1 h-1 mx-[1px]",
    medium: "w-1.5 h-1.5 mx-[2px]",
    large: "w-2 h-2 mx-[3px]"
  }[size];

  return (
    <div className={`flex items-center ${className}`} aria-label="Lucie is typing">
      <div className="h-8 w-8 mr-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm">
        L
      </div>
      <div className="flex items-center space-x-0.5">
        <div className={`rounded-full bg-white/80 ${dotSize} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
        <div className={`rounded-full bg-white/80 ${dotSize} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
        <div className={`rounded-full bg-white/80 ${dotSize} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default LucieTypingIndicator;
