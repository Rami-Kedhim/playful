
import React from 'react';
import { BoostButton as RefactoredBoostButton } from './button';
import type { BoostButtonProps } from './button/types';

const BoostButton = (props: Omit<BoostButtonProps, 'variant'> & { variant?: string }) => {
  // Filter out any variant that is not in the allowed variants for BoostButtonProps
  const { variant, ...restProps } = props;
  
  // Only pass variant if it's one of the allowed values
  const allowedVariants = ['link', 'default', 'destructive', 'outline', 'secondary', 'ghost'];
  const safeVariant = variant && allowedVariants.includes(variant) ? 
    variant as 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' : 
    undefined;
  
  const safeProps = {
    ...restProps,
    ...(safeVariant ? { variant: safeVariant } : {})
  } as BoostButtonProps;
  
  return <RefactoredBoostButton {...safeProps} />;
};

export default BoostButton;
