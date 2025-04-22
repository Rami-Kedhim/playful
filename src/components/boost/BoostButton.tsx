
import { BoostButton as RefactoredBoostButton } from './button';
import type { BoostButtonProps } from './button/types';

const BoostButton = (props: Omit<BoostButtonProps, 'variant'> & { variant?: string }) => {
  // Filter out any variant that is not in the allowed variants for BoostButtonProps
  const { variant, ...restProps } = props;
  const safeProps = restProps as BoostButtonProps;
  
  return <RefactoredBoostButton {...safeProps} />;
};

export default BoostButton;
