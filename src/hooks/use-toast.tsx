
import React, { useState, useEffect, createContext, useContext } from "react";

// Types for toast
export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "warning" | "success";
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  toast: (props: Omit<Toast, "id">) => void; // Toast function directly in context
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  toast: () => {},
});

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...toast }]);

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Create the toast function directly within the provider
  const toastFunction = (props: Omit<Toast, "id">) => {
    addToast(props);
  };

  return (
    <ToastContext.Provider value={{ 
      toasts, 
      addToast, 
      removeToast,
      toast: toastFunction 
    }}>
      {children}
      
      {/* Optional: add a toast renderer here if needed */}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Create a standalone toast function that doesn't require hooks
export const toast = (props: Omit<Toast, "id">) => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    console.warn("Toast called in non-browser environment");
    return;
  }
  
  // Try to find the ToastContext in the global scope
  const toastContextElement = document.getElementById("toast-context-element");
  
  if (!toastContextElement || !toastContextElement.dataset.hasToastContext) {
    console.error("toast was called before ToastProvider was mounted");
    return;
  }
  
  // Access the global addToast function
  const addToast = (window as any).__TOAST_ADD_FUNCTION__;
  if (typeof addToast === "function") {
    addToast(props);
  } else {
    console.error("Toast function not available");
  }
};

// Set up global access to the toast function
if (typeof window !== "undefined") {
  // Will be set by the ToastProvider when it mounts
  (window as any).__TOAST_ADD_FUNCTION__ = null;
  (window as any).__TOAST_REMOVE_FUNCTION__ = null;
}
