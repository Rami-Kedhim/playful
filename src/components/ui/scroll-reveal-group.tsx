
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in';
  staggerDelay?: number;
  threshold?: number;
  containerClassName?: string;
}

export const ScrollRevealGroup = ({
  children,
  animation = 'fade-up',
  staggerDelay = 0.1,
  threshold = 0.1,
  containerClassName,
  ...props
}: ScrollRevealGroupProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, threshold]);

  // Define animation classes
  const getAnimationClass = (index: number) => {
    const baseClasses = {
      'fade-up': 'opacity-0 translate-y-10',
      'fade-down': 'opacity-0 -translate-y-10',
      'fade-left': 'opacity-0 translate-x-10',
      'fade-right': 'opacity-0 -translate-x-10',
      'zoom-in': 'opacity-0 scale-95',
    };
    
    return isIntersecting
      ? `transition-all duration-700 ease-out opacity-100 translate-y-0 translate-x-0 scale-100 delay-[${index * staggerDelay * 1000}ms]`
      : `transition-all duration-500 ease-out ${baseClasses[animation]}`;
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={ref} {...props} className={cn(containerClassName)}>
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child, {
          ...child.props,
          className: cn(
            child.props.className,
            getAnimationClass(index)
          ),
          key: `scroll-reveal-${index}`
        });
      })}
    </div>
  );
};

export default ScrollRevealGroup;
