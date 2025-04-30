
export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  roles?: string[];
  isVerified?: boolean;
}

export const authService = {
  validateToken: async (token: string): Promise<boolean> => {
    // Match implementation with the other authService file
    return token && token.length >= 10;
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
