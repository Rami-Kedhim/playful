
import React from 'react';
import { BoostButton as RefactoredBoostButton } from './button';
import type { BoostButtonProps } from './button/types';

const BoostButton = (props: Omit<BoostButtonProps, 'variant'> & { variant?: string }) => {
  // Filter out any variant that is not in the allowed variants for BoostButtonProps
  const { variant, ...restProps } = props;
  
  // Only pass variant if it's one of the allowed values
  const allowedVariants = ['link', 'default', 'destructive', 'outline', 'secondary', 'ghost'];
  
  // Convert variant to allowed type or use default
  let safeVariant: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | undefined;
  
  if (variant && allowedVariants.includes(variant)) {
    safeVariant = variant as 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  } else {
    // If variant is not allowed, default to 'default'
    safeVariant = 'default';
  }
  
  const safeProps = {
    ...restProps,
    variant: safeVariant
  } as BoostButtonProps;
  
  return <RefactoredBoostButton {...safeProps} />;
};

export default BoostButton;
