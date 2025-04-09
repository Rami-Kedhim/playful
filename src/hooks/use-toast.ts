
import { ToastProps, ToastActionElement } from "@/components/ui/toast";

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

// Re-export from our own toast implementation
export { useToast, toast } from "@/hooks/use-toast.tsx";

// Extended toast function with additional features
export const enhancedToast = (props: ToastProps) => {
  const { toast } = useToast();
  return toast(props);
};
