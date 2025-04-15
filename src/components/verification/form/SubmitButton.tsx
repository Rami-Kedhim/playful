
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { SubmitButtonProps } from '@/types/verification';

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  loading = false, 
  disabled = false,
  text 
}) => {
  return (
    <Button
      type="submit"
      disabled={disabled || loading}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
