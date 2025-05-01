
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  loading: boolean;
  disabled: boolean;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, disabled, text }) => {
  return (
    <Button type="submit" disabled={loading || disabled}>
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
