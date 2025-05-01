
// Define missing methods for the auth service

import { UserRole, UserRoleEnum } from '@/types/pulse-boost';

export const authService = {
  getUserRole: async (userId: string): Promise<UserRole> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      id: 'role-123',
      userId,
      role: UserRoleEnum.USER,
      createdAt: new Date()
    };
  },

  validateToken: async (token: string): Promise<boolean> => {
    // Simulate token validation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simple validation: token must be 10+ characters
    return token && token.length >= 10;
  },

  // Add missing methods that UberEcosystemContext expects
  getCurrentUser: async (): Promise<any> => {
    const token = localStorage.getItem('ubx_auth_token');
    
    if (!token) return null;
    
    const isValid = await authService.validateToken(token);
    if (!isValid) return null;
    
    // Return mock user data
    return { 
      id: 'current-user', 
      email: 'user@example.com',
      createdAt: new Date()
    };
  },
  
  login: async (email: string, password: string): Promise<any> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simple validation
    if (!email || !password || password.length < 6) {
      return { success: false, message: 'Invalid credentials' };
    }
    
    // Return success response
    return {
      success: true,
      user: { 
        id: 'user-123', 
        email,
        createdAt: new Date()
      },
      message: 'Login successful'
    };
  },
  
  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Clear token from storage
    localStorage.removeItem('ubx_auth_token');
  },
  
  register: async (userData: any): Promise<any> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate email and password
    if (!userData.email || !userData.password || userData.password.length < 6) {
      return { success: false, message: 'Invalid registration data' };
    }
    
    // Return success response
    return {
      success: true,
      user: { 
        id: `user-${Date.now()}`,
        ...userData,
        createdAt: new Date()
      },
      message: 'Registration successful'
    };
  }
};

export default authService;
