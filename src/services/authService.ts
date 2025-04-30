
import { UserRole, UserRoleEnum } from '@/types/pulse-boost';

export const authService = {
  // Mock implementation
  async getUserRole(userId: string): Promise<UserRole> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      id: 'role-123',
      userId,
      role: UserRoleEnum.USER,
      createdAt: new Date()
    };
  },

  async validateToken(token: string): Promise<boolean> {
    // Simulate token validation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simple validation: token must be 10+ characters
    return token && token.length >= 10;
  }
};

export default authService;
