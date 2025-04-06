
import React from 'react';
import { ScrollReveal } from './scroll-reveal';
import { cn } from '@/lib/utils';

interface ScrollRevealGroupProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-in' | 'scale-in';
  staggerDelay?: number;
  baseDelay?: number;
  containerClassName?: string;
}

export function ScrollRevealGroup({
  children,
  className,
  animation = 'fade-up',
  staggerDelay = 0.1,
  baseDelay = 0,
  containerClassName
}: ScrollRevealGroupProps) {
  // Convert children to array to work with them
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn(containerClassName)}>
      {childrenArray.map((child, index) => (
        <ScrollReveal
          key={index}
          animation={animation}
          delay={baseDelay + index * staggerDelay}
          className={className}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

export default ScrollRevealGroup;
