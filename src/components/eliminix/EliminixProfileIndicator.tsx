
import React from 'react';
import { UberPersona } from '@/types/uberPersona';
import { verifyEliminixCompliance } from '@/services/eliminix/eliminixService';
import { EliminixBadge } from '@/components/eliminix';

interface EliminixProfileIndicatorProps {
  profile: UberPersona;
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * A component to show Eliminix compliance status on profile cards
 */
const EliminixProfileIndicator: React.FC<EliminixProfileIndicatorProps> = ({
  profile,
  size = 'sm',
  position = 'top-right'
}) => {
  const isCompliant = verifyEliminixCompliance(profile);
  
  // Determine position classes
  let positionClasses = '';
  switch (position) {
    case 'top-left':
      positionClasses = 'top-2 left-2';
      break;
    case 'top-right':
      positionClasses = 'top-2 right-2';
      break;
    case 'bottom-left':
      positionClasses = 'bottom-2 left-2';
      break;
    case 'bottom-right':
      positionClasses = 'bottom-2 right-2';
      break;
  }
  
  return (
    <div className={`absolute ${positionClasses} z-10`}>
      <EliminixBadge 
        size={size} 
        isCompliant={isCompliant}
        variant="outline" 
        className={isCompliant ? 'bg-white/90 dark:bg-black/50' : 'bg-white/90 dark:bg-black/50'} 
      />
    </div>
  );
};

export default EliminixProfileIndicator;
