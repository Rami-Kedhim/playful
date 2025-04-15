
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  loading?: boolean;
  loadingText?: string;
  text: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  loading = false, 
  loadingText = "Loading...", 
  text,
  disabled = false
}) => {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={loading || disabled}
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
