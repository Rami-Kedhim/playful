
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
        <span className="font-bold text-xl text-white">U</span>
        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-rose-500 border-2 border-background"></div>
      </div>
      <span className="font-bold text-xl">
        UberEscorts
        <span className="text-primary">.</span>
      </span>
    </div>
  );
};

export default Logo;
