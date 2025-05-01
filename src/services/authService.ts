
import { UserRoleEnum, UserRole } from '@/types/pulse-boost';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  ubxBalance: number;
  isVerified: boolean;
}

class AuthService {
  private currentUser: User | null = null;
  
  constructor() {
    // Mock initialization
    this.currentUser = {
      id: 'user-123',
      email: 'user@example.com',
      username: 'exampleUser',
      role: UserRoleEnum.USER,
      ubxBalance: 1000,
      isVerified: true
    };
  }
  
  async login(email: string, password: string): Promise<User> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password) {
      this.currentUser = {
        id: 'user-123',
        email,
        username: email.split('@')[0],
        role: UserRoleEnum.USER,
        ubxBalance: 1000,
        isVerified: true
      };
      
      return this.currentUser;
    }
    
    throw new Error('Invalid credentials');
  }
  
  async logout(): Promise<void> {
    // Mock implementation
    this.currentUser = null;
  }
  
  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }
  
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}

export const authService = new AuthService();
