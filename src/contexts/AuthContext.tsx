
// This file is kept for backward compatibility
// It re-exports components from the new location
import { useAuth, AuthProvider } from "@/hooks/auth";
import type { AuthContextType } from "@/types/auth";

export { useAuth, AuthProvider };
export type { AuthContextType };
export default { useAuth, AuthProvider };
