
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-in' | 'scale-in';
  threshold?: number;
  delay?: number;
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  animation = 'fade-up',
  threshold = 0.1,
  delay = 0,
  duration = 0.6,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    observer.observe(current);

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return 'opacity-0 translate-y-8 transition-all duration-700';
      case 'fade-in':
        return 'opacity-0 transition-opacity duration-700';
      case 'slide-in':
        return 'opacity-0 -translate-x-8 transition-all duration-700';
      case 'scale-in':
        return 'opacity-0 scale-95 transition-all duration-700';
      default:
        return 'opacity-0 translate-y-8 transition-all duration-700';
    }
  };

  const getVisibleClass = () => {
    switch (animation) {
      case 'fade-up':
        return 'opacity-100 translate-y-0';
      case 'fade-in':
        return 'opacity-100';
      case 'slide-in':
        return 'opacity-100 translate-x-0';
      case 'scale-in':
        return 'opacity-100 scale-100';
      default:
        return 'opacity-100 translate-y-0';
    }
  };

  const style = isVisible
    ? { 
        transitionDelay: `${delay}s`, 
        transitionDuration: `${duration}s` 
      }
    : {};

  return (
    <div
      ref={ref}
      className={cn(
        getAnimationClass(),
        isVisible && getVisibleClass(),
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
