
// Fix import of Toast from "@/hooks/use-toast" because Toast is not exported (only toast and useToast)

import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
