
export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  roles?: string[];
  isVerified?: boolean;
}

export const authService = {
  validateToken: async (token: string): Promise<AuthUser | null> => {
    // Mock implementation
    return {
      id: 'user-1',
      email: 'user@example.com',
      displayName: 'Demo User',
      isVerified: true
    };
  },
  
  login: async (email: string, password: string): Promise<string> => {
    // Mock implementation
    return 'mock-auth-token';
  },
  
  logout: async (): Promise<boolean> => {
    return true;
  }
};

export default authService;
