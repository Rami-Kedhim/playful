export type UserRole = 'user' | 'admin' | 'creator' | 'moderator' | 'subscriber' | string;

export interface User {
  id: string;
  email?: string;
  name?: string;
  roles?: Array<UserRole | { name: UserRole }>;
  // Add other required user properties here
}
