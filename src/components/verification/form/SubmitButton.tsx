
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading = false,
  disabled = false,
  loadingText = 'Processing...',
  text
}) => {
  return (
    <Button
      type="submit"
      disabled={loading || disabled}
      className="w-full md:w-auto"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
