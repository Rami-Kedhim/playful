
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
    <Button 
      type="submit" 
      disabled={loading || disabled}
      className="w-full"
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
