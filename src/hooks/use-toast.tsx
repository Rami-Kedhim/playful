
import React from 'react';
import { toast as sonnerToast, Toaster as SonnerToaster } from 'sonner';

type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success';
};

export const Toaster = SonnerToaster;

export function toast({ title, description, variant = 'default', action }: ToastProps) {
  return sonnerToast(title, {
    description,
    action,
    className: `${
      variant === 'destructive'
        ? 'bg-destructive text-destructive-foreground'
        : variant === 'success'
        ? 'bg-green-500 text-white'
        : ''
    }`
  });
}

export function useToast() {
  return { toast };
}

export default useToast;
