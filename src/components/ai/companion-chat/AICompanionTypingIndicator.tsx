
import React from 'react';

interface AICompanionTypingIndicatorProps {
  className?: string;
}

/**
 * A component that displays a typing indicator for AI companions
 */
const AICompanionTypingIndicator: React.FC<AICompanionTypingIndicatorProps> = ({ 
  className = ""
}) => {
  return (
    <div className={`bg-muted/30 p-2 rounded-lg inline-flex items-center ${className}`}>
      <div className="flex space-x-1">
        <div className="typing-dot bg-white/80 w-2 h-2 rounded-full"></div>
        <div className="typing-dot bg-white/80 w-2 h-2 rounded-full"></div>
        <div className="typing-dot bg-white/80 w-2 h-2 rounded-full"></div>
      </div>
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default AICompanionTypingIndicator;
