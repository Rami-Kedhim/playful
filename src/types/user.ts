
export interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
  avatar_url?: string;
  emailVerified?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  role?: string;
  roles?: string[];
  metadata?: Record<string, any>;
}

export interface UserProfile {
  id?: string;
  user_id?: string;
  bio?: string;
  phone?: string;
  email?: string;
  website?: string;
  name?: string;
  username?: string;
  displayName?: string;
  avatar_url?: string;
  avatarUrl?: string;
  location?: string;
  services?: string[];
  rates?: Record<string, number>;
  languages?: string[];
  availability?: any;
  gender?: string;
  role?: string;
  roles?: string[];
}

export interface UserSettings {
  theme?: 'light' | 'dark' | 'system';
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy?: {
    showOnline: boolean;
    showLastSeen: boolean;
    allowMessages: 'all' | 'verified' | 'none';
  };
  preferences?: Record<string, any>;
}

export interface UserStats {
  profileViews: number;
  bookings: number;
  completedBookings: number;
  rating: number;
  reviewCount: number;
  responseRate: number;
  responseTime: number; // in minutes
}

export interface UserAccount {
  balance: number;
  currency: string;
  paymentMethods: PaymentMethod[];
  transactions: Transaction[];
  subscriptionPlan?: SubscriptionPlan;
  subscriptionStatus?: 'active' | 'inactive' | 'canceled' | 'trial';
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal' | 'other';
  details: Record<string, any>;
  isDefault: boolean;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'payout' | 'charge';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'canceled';
  description?: string;
  date: Date;
  metadata?: Record<string, any>;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}
