
import React from 'react';

/**
 * A component that displays a typing indicator for AI companions
 */
const AICompanionTypingIndicator: React.FC = () => {
  return (
    <div className="bg-muted p-2 rounded-lg inline-flex items-center">
      <div className="flex space-x-1">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  );
};

export default AICompanionTypingIndicator;
