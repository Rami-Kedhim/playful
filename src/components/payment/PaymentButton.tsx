
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { usePayment, CheckoutOptions } from '@/hooks/usePayment';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';

interface PaymentButtonProps extends Omit<ButtonProps, 'onClick'> {
  checkoutOptions: Omit<CheckoutOptions, 'onSuccess' | 'onCancel'>;
  onSuccess?: (sessionId: string) => void;
  onCancel?: () => void;
  requireAuth?: boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  checkoutOptions,
  onSuccess,
  onCancel,
  requireAuth = true,
  children,
  ...buttonProps
}) => {
  const { checkout, isLoading } = usePayment();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (requireAuth && !isAuthenticated) {
      toast.error('Authentication Required', {
        description: 'Please log in to make a payment',
      });
      navigate('/auth', { state: { from: window.location.pathname } });
      return;
    }

    const result = await checkout({
      ...checkoutOptions,
      onSuccess,
      onCancel,
    });

    if (!result.success) {
      // Error is handled by the hook
      return;
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading || buttonProps.disabled} {...buttonProps}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default PaymentButton;
