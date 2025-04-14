
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  text?: string;
  className?: string;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  loading = false, 
  disabled = false,
  loadingText = 'Submitting...',
  text = 'Submit Verification',
  className = '',
  onClick,
  variant = "default",
  ...props
}) => {
  return (
    <Button 
      type="submit" 
      disabled={loading || disabled} 
      className={`w-full ${className}`}
      variant={variant}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : text}
    </Button>
  );
};

export default SubmitButton;
