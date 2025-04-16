
import React from 'react';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader } from '@/components/ui/enhanced-card';

interface VerificationCardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const VerificationCardWrapper: React.FC<VerificationCardWrapperProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <EnhancedCard variant="hover" className="w-full">
      <EnhancedCardHeader>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </EnhancedCardHeader>
      <EnhancedCardContent>
        {children}
      </EnhancedCardContent>
    </EnhancedCard>
  );
};

export default VerificationCardWrapper;
