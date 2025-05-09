
import { useToast as useShadcnToast } from "@/components/ui/use-toast";

// Re-export the hook and the toast function for compatibility
export const useToast = useShadcnToast;

// Export the toast function directly from the TSX file
export { toast } from "@/hooks/use-toast.tsx";

// Default export for backward compatibility
export default useToast;
