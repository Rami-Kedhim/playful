
import React from "react";
import { toast as sonnerToast, type ToastOptions as SonnerToastOptions } from "sonner";

// Types for toast
export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "warning" | "success";
}

type ToastOptionsType = SonnerToastOptions & {
  variant?: "default" | "destructive" | "warning" | "success";
};

// Create a standalone toast function
export const toast = ({
  title,
  description,
  variant = "default",
  ...props
}: Omit<Toast, "id"> & ToastOptionsType) => {
  return sonnerToast(title as string, {
    description,
    className: variant === "destructive" 
      ? "bg-destructive text-destructive-foreground border-destructive" 
      : variant === "warning"
      ? "bg-yellow-50 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-200 border-yellow-500/30"
      : variant === "success"
      ? "bg-green-50 text-green-800 dark:bg-green-950/50 dark:text-green-200 border-green-500/30" 
      : undefined,
    ...props,
  });
};

// Export a hook for components that need to use toast
export const useToast = () => {
  const toasts: Toast[] = [];

  return {
    toast,
    toasts,
    addToast: toast,
    removeToast: (id: string) => {},
  };
};
