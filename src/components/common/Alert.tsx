
import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
} from 'lucide-react';
import { Alert as AlertComponent, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

interface AlertProps {
  title?: string;
  message: string;
  variant?: AlertVariant;
  className?: string;
  onClose?: () => void;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  variant = 'default',
  className,
  onClose,
  action,
  icon,
  showIcon = true,
}) => {
  // Define variant-specific properties
  const variantProps: Record<AlertVariant, {
    icon: React.ReactNode,
    className: string,
  }> = {
    default: {
      icon: <AlertCircle className="h-4 w-4" />,
      className: '',
    },
    destructive: {
      icon: <XCircle className="h-4 w-4" />,
      className: 'border-red-500/50 text-red-800 dark:text-red-200 bg-red-50 dark:bg-red-950/50',
    },
    success: {
      icon: <CheckCircle className="h-4 w-4" />,
      className: 'border-green-500/50 text-green-800 dark:text-green-200 bg-green-50 dark:bg-green-950/50',
    },
    warning: {
      icon: <AlertTriangle className="h-4 w-4" />,
      className: 'border-yellow-500/50 text-yellow-800 dark:text-yellow-200 bg-yellow-50 dark:bg-yellow-950/50',
    },
    info: {
      icon: <Info className="h-4 w-4" />,
      className: 'border-blue-500/50 text-blue-800 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/50',
    },
  };

  const { icon: variantIcon, className: variantClassName } = variantProps[variant];
  const selectedIcon = icon ?? variantIcon;

  // Map the variant to one that the ui/alert component supports
  const mappedVariant = variant === 'info' || variant === 'default' ? 'default' : 
                        variant === 'destructive' ? 'destructive' :
                        variant; // This now works because we've added 'warning' and 'success' to the alert variants

  return (
    <AlertComponent
      variant={mappedVariant}
      className={cn(variantClassName, className)}
    >
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0 mr-3">
            {selectedIcon}
          </div>
        )}
        <div className="flex-grow">
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{message}</AlertDescription>
        </div>
        <div className="flex-shrink-0 flex items-start ml-3 gap-2">
          {action}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 rounded-full"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </AlertComponent>
  );
};

export default Alert;
