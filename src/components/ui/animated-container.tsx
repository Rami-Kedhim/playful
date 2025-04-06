
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fade' | 'slide-up' | 'slide-right' | 'scale';
}

export const AnimatedContainer = ({
  children,
  className,
  delay = 0,
  duration = 0.3,
  animation = 'fade'
}: AnimatedContainerProps) => {
  // Define animation variants
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    'slide-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    'slide-right': {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  return (
    <motion.div
      className={cn('transition-all', className)}
      initial="hidden"
      animate="visible"
      variants={variants[animation]}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
