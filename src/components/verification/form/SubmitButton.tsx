
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
}

const SubmitButton = ({ loading, disabled = false }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={loading || disabled}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        'Submit Verification Documents'
      )}
    </Button>
  );
};

export default SubmitButton;
