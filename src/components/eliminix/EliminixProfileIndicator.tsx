
import React from 'react';
import { UberPersona } from '@/types/uberPersona';
import { verifyEliminixCompliance } from '@/services/eliminix/eliminixService';
import { EliminixBadge } from '@/components/eliminix';
import { OxumBadge } from '@/components/oxum';

interface EliminixProfileIndicatorProps {
  profile: UberPersona;
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showOxumIndicator?: boolean;
}

/**
 * A component to show Eliminix and Oxum compliance status on profile cards
 */
const EliminixProfileIndicator: React.FC<EliminixProfileIndicatorProps> = ({
  profile,
  size = 'sm',
  position = 'top-right',
  showOxumIndicator = true
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
    <div className={`absolute ${positionClasses} z-10 flex flex-col gap-1 items-end`}>
      <EliminixBadge 
        size={size} 
        isCompliant={isCompliant}
        variant="outline" 
        className={isCompliant ? 'bg-white/90 dark:bg-black/50' : 'bg-white/90 dark:bg-black/50'} 
      />
      
      {showOxumIndicator && isCompliant && (
        <OxumBadge
          size={size}
          variant="outline"
          className="bg-white/90 dark:bg-black/50"
          showTooltip={true}
        />
      )}
    </div>
  );
};

export default EliminixProfileIndicator;
