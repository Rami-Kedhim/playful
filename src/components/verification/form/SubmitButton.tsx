
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface SubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
  text?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  loading = false, 
  disabled = false,
  text = 'Submit' 
}) => {
  return (
    <Button 
      type="submit" 
      disabled={disabled || loading}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : text}
    </Button>
  );
};

export default SubmitButton;
