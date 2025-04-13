
import React from 'react';
import AICompanionTypingIndicator from '@/components/ai/AICompanionTypingIndicator';

const LucieTypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <AICompanionTypingIndicator 
        className="bg-white/5 text-white"
        size="small"
      />
    </div>
  );
};

export default LucieTypingIndicator;
