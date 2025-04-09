
import { UseToastProps, ToastActionElement } from "@/components/ui/toast";

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

// Re-export from shadcn-modified toast implementation, interface
export { useToast, toast } from "@radix-ui/react-toast";

// Extended toast function with additional features
export const enhancedToast = (props: UseToastProps) => {
  const { toast } = useToast();
  return toast(props);
};
