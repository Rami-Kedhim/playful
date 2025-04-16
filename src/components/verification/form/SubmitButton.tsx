
import React from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';

interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  text?: string;
  loadingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  loading, 
  disabled = false,
  text = "Submit",
  loadingText = "Submitting..."
}) => {
  return (
    <EnhancedButton 
      type="submit" 
      disabled={disabled}
      isLoading={loading}
      loadingText={loadingText}
      className="w-full"
    >
      {text}
    </EnhancedButton>
  );
};

export default SubmitButton;
