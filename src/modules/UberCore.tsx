
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface UberCoreProps {
  children: ReactNode;
  navbar?: ReactNode;
  footer?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const UberCore: React.FC<UberCoreProps> = ({ 
  children, 
  navbar,
  footer, 
  fullWidth = false,
  className 
}) => {
  return (
    <div className={cn("min-h-screen bg-background flex flex-col", className)}>
      {navbar}
      
      <main className={cn("flex-1", fullWidth ? "w-full" : "container mx-auto py-4")}>
        {children}
      </main>
      
      {footer}
    </div>
  );
};

export default UberCore;
