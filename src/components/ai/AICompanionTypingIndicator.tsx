
import React from 'react';

interface AICompanionTypingIndicatorProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const AICompanionTypingIndicator: React.FC<AICompanionTypingIndicatorProps> = ({ 
  className = "", 
  size = "medium" 
}) => {
  const getDotSize = () => {
    switch(size) {
      case 'small':
        return 'w-1 h-1 mx-[1px]';
      case 'large':
        return 'w-2.5 h-2.5 mx-[3px]';
      case 'medium':
      default:
        return 'w-2 h-2 mx-[2px]';
    }
  };
  
  return (
    <div 
      className={`flex items-center ${className}`}
      aria-label="AI is typing"
    >
      <div className={`rounded-full bg-current ${getDotSize()} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`rounded-full bg-current ${getDotSize()} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`rounded-full bg-current ${getDotSize()} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

export default AICompanionTypingIndicator;
