
import { useState, useEffect, createContext, useContext } from "react";

// Types for toast
interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  return context;
}

// Create a standalone toast function that doesn't require hooks
let addToast: (toast: Omit<Toast, "id">) => void;
export const toast = (props: Omit<Toast, "id">) => {
  if (typeof addToast !== "function") {
    console.error("toast was called before ToastProvider was mounted");
    return;
  }
  addToast(props);
};

// This effect runs only in the browser to set up the toast function
if (typeof window !== "undefined") {
  Object.defineProperty(toast, "__internal__setAddToast", {
    value: (fn: typeof addToast) => {
      addToast = fn;
    },
    enumerable: false,
    configurable: false,
    writable: false,
  });
}
