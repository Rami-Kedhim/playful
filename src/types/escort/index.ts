// Re-export types from Escort.ts to solve import issues
export * from '../Escort';

// Make sure Video type is explicitly exported
export { Video } from '../Escort';

// Export the required types to ensure compatibility across imports
export interface Escort {
  id: string;
  name: string;
  gender: string;
  price: number;  // Required property for compatibility
  // ... other properties can be optional
}
