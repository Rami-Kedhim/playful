
import { BoostButton as RefactoredBoostButton } from './button';
import { BoostButtonProps } from './button/types';

const BoostButton = (props: BoostButtonProps) => {
  return <RefactoredBoostButton {...props} />;
};

export default BoostButton;
