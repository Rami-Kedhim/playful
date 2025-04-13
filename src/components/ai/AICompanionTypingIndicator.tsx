
import React from 'react';

interface TypeIndicatorProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * A component that displays a typing indicator animation
 */
const AICompanionTypingIndicator: React.FC<TypeIndicatorProps> = ({
  className = "",
  size = "medium"
}) => {
  // Determine dot size based on the size prop
  const getDotSize = () => {
    switch(size) {
      case 'small': return 'w-1 h-1';
      case 'large': return 'w-2.5 h-2.5';
      case 'medium':
      default: return 'w-2 h-2';
    }
  };

  // Determine container padding based on the size prop
  const getContainerSize = () => {
    switch(size) {
      case 'small': return 'p-2';
      case 'large': return 'p-4';
      case 'medium':
      default: return 'p-3';
    }
  };

  const dotSize = getDotSize();
  const containerSize = getContainerSize();

  return (
    <div className={`flex items-center ${containerSize} rounded-md bg-muted ${className}`}>
      <div className="flex space-x-1.5">
        <div className={`${dotSize} rounded-full bg-foreground/70 animate-bounce`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${dotSize} rounded-full bg-foreground/70 animate-bounce`} style={{ animationDelay: '150ms' }}></div>
        <div className={`${dotSize} rounded-full bg-foreground/70 animate-bounce`} style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default AICompanionTypingIndicator;
