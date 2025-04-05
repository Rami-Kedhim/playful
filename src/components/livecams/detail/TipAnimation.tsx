
import React, { useState, useEffect } from "react";
import { Gift } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface TipAnimationProps {
  username: string;
  amount: number;
  onComplete?: () => void;
}

const TipAnimation: React.FC<TipAnimationProps> = ({ 
  username, 
  amount,
  onComplete 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Hide the animation after 3 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [onComplete]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-black/70 text-white px-6 py-4 rounded-lg text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-green-500 rounded-full p-3">
                <Gift className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold">{username}</h3>
            <p className="text-3xl font-bold text-green-400">${amount}</p>
            <p className="text-sm opacity-80">Thanks for the tip!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TipAnimation;
