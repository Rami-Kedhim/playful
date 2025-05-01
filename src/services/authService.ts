
import { UserRole } from '@/types/pulse-boost';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  ubxBalance: number;
  isVerified: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  message?: string;
}

class AuthService {
  private currentUser: User | null = null;
  
  constructor() {
    // Mock initialization
    this.currentUser = {
      id: 'user-123',
      email: 'user@example.com',
      username: 'exampleUser',
      role: 'USER',
      ubxBalance: 1000,
      isVerified: true
    };
  }
  
  async login(email: string, password: string): Promise<AuthResult> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password) {
      this.currentUser = {
        id: 'user-123',
        email,
        username: email.split('@')[0],
        role: 'USER',
        ubxBalance: 1000,
        isVerified: true
      };
      
      return {
        success: true,
        user: this.currentUser
      };
    }
    
    return {
      success: false,
      message: 'Invalid credentials'
    };
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

  async validateToken(token: string): Promise<boolean> {
    // Mock implementation
    return token.startsWith('mock_token_');
  }

  async register(userData: Partial<User>): Promise<AuthResult> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (userData.email) {
      this.currentUser = {
        id: 'user-' + Date.now(),
        email: userData.email,
        username: userData.username || userData.email.split('@')[0],
        role: 'USER',
        ubxBalance: 0,
        isVerified: false
      };
      
      return {
        success: true,
        user: this.currentUser
      };
    }
    
    return {
      success: false,
      message: 'Invalid user data'
    };
  }
}

export const authService = new AuthService();
