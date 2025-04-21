
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/270a89d4-565b-4654-b8ae-20b959208800.png" 
        alt="UberEscorts Logo" 
        className="h-8 w-8"
        loading="lazy"
        decoding="async"
      />
      <span className="font-bold text-xl text-primary">
        UberEscorts
        <span className="text-yellow-500">.</span>
      </span>
    </div>
  );
};

export default Logo;

