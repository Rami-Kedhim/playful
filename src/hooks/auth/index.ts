
// Export all authentication related hooks from a single file
export { useAuth, AuthProvider } from "./useAuth";
export { useAuthState } from "./useAuthState";
export { useAuthActions } from "./useAuthActions";
export { usePasswordManagement } from "./usePasswordManagement";
export { useProfileManagement } from "./useProfileManagement";
export { useRole } from "./useRole";

// Export a default object with all hooks - fixing the missing declarations
const authHooks = {
  useAuth,
  AuthProvider,
  useAuthState,
  useAuthActions,
  usePasswordManagement,
  useProfileManagement,
  useRole
};

export default authHooks;
