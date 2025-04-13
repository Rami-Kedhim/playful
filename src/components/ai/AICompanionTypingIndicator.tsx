
import React from 'react';

interface AICompanionTypingIndicatorProps {
  className?: string;
  dotColor?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * A component that displays a typing indicator for AI companions
 * Can be customized with different sizes and colors
 */
const AICompanionTypingIndicator: React.FC<AICompanionTypingIndicatorProps> = ({ 
  className = "",
  dotColor = "bg-white/80",
  size = "medium"
}) => {
  // Determine size classes based on the size prop
  const dotSizeClasses = {
    small: "w-1.5 h-1.5",
    medium: "w-2 h-2",
    large: "w-2.5 h-2.5"
  };
  
  const containerClasses = {
    small: "p-1.5",
    medium: "p-2",
    large: "p-3"
  };
  
  const dotSize = dotSizeClasses[size];
  const containerSize = containerClasses[size];
  
  return (
    <div className={`bg-muted/30 ${containerSize} rounded-lg inline-flex items-center ${className}`}>
      <div className="flex space-x-1">
        <div className={`typing-dot ${dotColor} ${dotSize} rounded-full`}></div>
        <div className={`typing-dot ${dotColor} ${dotSize} rounded-full`}></div>
        <div className={`typing-dot ${dotColor} ${dotSize} rounded-full`}></div>
      </div>
      <style>
        {`
          @keyframes typing {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(-5px); opacity: 1; }
          }
          .typing-dot {
            animation: typing 1s infinite ease-in-out;
          }
          .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
          }
          .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
          }
        `}
      </style>
    </div>
  );
};

export default AICompanionTypingIndicator;
