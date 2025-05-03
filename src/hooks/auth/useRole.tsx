
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";

export const useRole = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setIsModerator(false);
      setIsVerified(false);
      setRoles([]);
      return;
    }

    const userRoles = user.roles || [user.role].filter(Boolean) || [];
    setRoles(userRoles);
    
    setIsAdmin(userRoles.includes('admin'));
    setIsModerator(userRoles.includes('moderator'));
    
    // Check for verification
    setIsVerified(
      user.isVerified || 
      (user.user_metadata?.isVerified) || 
      (user.user_metadata?.verification_status === 'approved')
    );
  }, [user]);

  return {
    isAdmin,
    isModerator,
    isVerified,
    roles,
    hasRole: (role: string) => roles.includes(role)
  };
};
