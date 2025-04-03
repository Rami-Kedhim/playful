
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  // We're not using toasts from useToast() since we're using sonner directly
  // This component remains for compatibility, but doesn't actually render any toasts
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  )
}
