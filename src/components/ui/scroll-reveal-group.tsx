import React, { createContext, useContext, useRef } from 'react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

// Type for the animation options
export type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale-in' | 'zoom-in';

// Context to share group configuration with child ScrollReveal components
interface ScrollRevealContextType {
  animation: AnimationType;
  baseDelay: number;
  staggerDelay: number;
  threshold: number;
  duration: number;
  childCounter: React.MutableRefObject<number>;
}

const ScrollRevealContext = createContext<ScrollRevealContextType | null>(null);

export const useScrollRevealContext = () => {
  const context = useContext(ScrollRevealContext);
  if (!context) {
    throw new Error('useScrollRevealContext must be used within a ScrollRevealGroup');
  }
  return context;
};

interface ScrollRevealGroupProps {
  children: React.ReactNode;
  animation?: AnimationType;
  baseDelay?: number;
  staggerDelay?: number;
  threshold?: number;
  duration?: number;
  containerClassName?: string;
}

export const ScrollRevealGroup: React.FC<ScrollRevealGroupProps> = ({
  children,
  animation = 'fade-up',
  baseDelay = 0,
  staggerDelay = 0.1,
  threshold = 0.1,
  duration = 0.6,
  containerClassName = '',
}) => {
  // Counter to keep track of child index for staggered animations
  const childCounter = useRef(0);

  return (
    <ScrollRevealContext.Provider
      value={{
        animation,
        baseDelay,
        staggerDelay,
        threshold,
        duration,
        childCounter,
      }}
    >
      <div className={containerClassName}>{children}</div>
    </ScrollRevealContext.Provider>
  );
};

interface RevealChildProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const RevealChild: React.FC<RevealChildProps> = ({
  children,
  animation: propAnimation,
  delay: propDelay,
  duration: propDuration,
  threshold: propThreshold,
  className,
}) => {
  const context = useScrollRevealContext();
  const childIndex = context.childCounter.current++;

  // Use props or fall back to context values
  const animation = propAnimation || context.animation;
  const threshold = propThreshold !== undefined ? propThreshold : context.threshold;
  const duration = propDuration !== undefined ? propDuration : context.duration;
  
  // Calculate delay based on child index
  const delay = propDelay !== undefined 
    ? propDelay 
    : context.baseDelay + childIndex * context.staggerDelay;

  return (
    <ScrollReveal
      animation={animation}
      threshold={threshold}
      delay={delay}
      duration={duration}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
};

export default ScrollRevealGroup;
