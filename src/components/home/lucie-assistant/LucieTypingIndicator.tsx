
import React from 'react';

const LucieTypingIndicator = () => {
  return (
    <div className="flex justify-start p-3 rounded-lg bg-white/5">
      <div className="flex items-center space-x-1">
        <div className="h-8 w-8 mr-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm">
          L
        </div>
        <div className="flex space-x-1">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LucieTypingIndicator;
