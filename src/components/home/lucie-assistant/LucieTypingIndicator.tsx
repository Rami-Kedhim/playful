
import React from 'react';

const LucieTypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] p-3 rounded-lg bg-white/5 text-white flex items-center gap-1">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  );
};

export default LucieTypingIndicator;
