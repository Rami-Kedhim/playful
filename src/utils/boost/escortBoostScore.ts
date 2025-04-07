import { Escort } from '@/types/escort';

export function calculateProfileCompletenessScore(profileCompleteness: number): number {
  // Simple linear scaling - adjust weights as needed
  return profileCompleteness * 0.5; // Scale to 50%
}

export function calculateVerificationScore(isVerified: boolean): number {
  return isVerified ? 20 : 0;
}

export function calculateRatingScore(rating: number): number {
  // Scale rating (out of 5) to a score out of 15
  return (rating / 5) * 15;
}

export function calculateProfileAgeScore(profileCreatedDate: Date): number {
  // Calculate age of profile in days
  const now = new Date();
  const diffDays = (now.getTime() - profileCreatedDate.getTime()) / (1000 * 60 * 60 * 24);
  
  // Award points based on age (adjust thresholds as needed)
  if (diffDays > 365) return 10; // Over 1 year
  if (diffDays > 90) return 7;   // Over 3 months
  if (diffDays > 30) return 4;   // Over 1 month
  return 0;
}

export function calculateLocationScore(country: string): number {
  // Award points based on location (adjust as needed)
  const premiumCountries = ['USA', 'Canada', 'UK', 'Australia'];
  return premiumCountries.includes(country) ? 5 : 0;
}

export function calculateRoleScore(role: string): number {
  // Award points based on role (adjust as needed)
  if (role === 'verified') return 10;
  if (role === 'AI') return -20; // Penalize AI profiles
  return 0;
}

export function calculateLastActiveScore(escort: Escort): number {
  if (!escort.lastActive) return 0;
  
  // Convert to Date if it's a string
  const lastActive = typeof escort.lastActive === 'string' 
    ? new Date(escort.lastActive)
    : escort.lastActive;
  
  // Get the difference in hours
  const now = new Date();
  const diffHours = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);
  
  // Score based on recency
  if (diffHours < 1) return 10; // Less than 1 hour
  if (diffHours < 3) return 8;  // Less than 3 hours
  if (diffHours < 6) return 6;  // Less than 6 hours 
  if (diffHours < 12) return 4; // Less than 12 hours
  if (diffHours < 24) return 2; // Less than 1 day
  return 0; // More than 1 day
}

export function calculateBoostScore(escort: Escort, boostMultiplier: number): number {
  let boostScore = 0;
  
  // Profile completeness score
  boostScore += calculateProfileCompletenessScore(80); // Assuming 80% completeness
  
  // Verification score
  boostScore += calculateVerificationScore(escort.verified);
  
  // Rating score
  boostScore += calculateRatingScore(escort.rating);
  
  // Profile age score
  boostScore += calculateProfileAgeScore(new Date()); // Assuming profile was created today
  
  // Location score
  boostScore += calculateLocationScore('USA'); // Assuming location is USA
  
  // Role score
  boostScore += calculateRoleScore('regular'); // Assuming role is regular
  
   // Last active score
   boostScore += calculateLastActiveScore(escort);
  
  return boostScore * boostMultiplier;
}
