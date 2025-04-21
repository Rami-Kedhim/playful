
import React from 'react';

interface LucieTypingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  animationStyle?: 'bounce' | 'wave' | 'pulse';
}

const LucieTypingIndicator: React.FC<LucieTypingIndicatorProps> = ({ 
  size = 'medium',
  showName = true,
  animationStyle = 'bounce'
}) => {
  const dotSize = {
    small: 'w-1.5 h-1.5',
    medium: 'w-2 h-2',
    large: 'w-2.5 h-2.5'
  };

  const containerSize = {
    small: 'h-5',
    medium: 'h-6',
    large: 'h-7'
  };

  const animationClass = {
    bounce: 'typing-dot',
    wave: 'typing-dot-wave',
    pulse: 'typing-dot-pulse'
  };

  return (
    <div className="flex items-center">
      {showName && (
        <div className="flex items-center mr-2">
          <div className="h-6 w-6 mr-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs">
            L
          </div>
          <span className="text-xs font-medium">Lucie</span>
        </div>
      )}
      <div className={`flex items-center space-x-1 ${containerSize[size]}`}>
        <div className={`${dotSize[size]} rounded-full ${animationClass[animationStyle]}`} />
        <div className={`${dotSize[size]} rounded-full ${animationClass[animationStyle]}`} />
        <div className={`${dotSize[size]} rounded-full ${animationClass[animationStyle]}`} />
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .typing-dot {
          background-color: currentColor;
          border-radius: 50%;
          animation: typingBounce 1s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        .typing-dot-wave {
          background-color: currentColor;
          border-radius: 50%;
          animation: typingWave 1.2s infinite ease-in-out;
        }
        
        .typing-dot-wave:nth-child(1) { animation-delay: 0s; }
        .typing-dot-wave:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot-wave:nth-child(3) { animation-delay: 0.3s; }
        
        .typing-dot-pulse {
          background-color: currentColor;
          border-radius: 50%;
          animation: typingPulse 1.5s infinite ease-in-out;
        }
        
        .typing-dot-pulse:nth-child(1) { animation-delay: 0s; }
        .typing-dot-pulse:nth-child(2) { animation-delay: 0.25s; }
        .typing-dot-pulse:nth-child(3) { animation-delay: 0.5s; }
        
        @keyframes typingBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }
        
        @keyframes typingWave {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          25% {
            transform: translateY(-3px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(0);
            opacity: 1;
          }
          75% {
            transform: translateY(3px);
            opacity: 0.8;
          }
        }
        
        @keyframes typingPulse {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      ` }} />
    </div>
  );
};

export default LucieTypingIndicator;
