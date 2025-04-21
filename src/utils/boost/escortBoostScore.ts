
import { Escort } from '@/types/Escort';

export function calculateProfileCompletenessScore(profileCompleteness: number): number {
  return profileCompleteness * 0.5;
}

export function calculateVerificationScore(isVerified: boolean): number {
  return isVerified ? 20 : 0;
}

export function calculateRatingScore(rating: number | undefined): number {
  if (rating === undefined) return 0;
  return (rating / 5) * 15;
}

export function calculateProfileAgeScore(profileCreatedDate: Date): number {
  const now = new Date();
  const diffDays = (now.getTime() - profileCreatedDate.getTime()) / (1000 * 60 * 60 * 24);
  
  if (diffDays > 365) return 10;
  if (diffDays > 90) return 7;
  if (diffDays > 30) return 4;
  return 0;
}

export function calculateLocationScore(country: string): number {
  const premiumCountries = ['USA', 'Canada', 'UK', 'Australia'];
  return premiumCountries.includes(country) ? 5 : 0;
}

export function calculateRoleScore(role: string): number {
  if (role === 'verified') return 10;
  if (role === 'AI') return -20;
  return 0;
}

export function calculateLastActiveScore(escort: Escort): number {
  if (!escort.lastActive) return 0;
  
  const lastActive = typeof escort.lastActive === 'string' 
    ? new Date(escort.lastActive)
    : escort.lastActive;
  
  const now = new Date();
  const diffHours = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);
  
  if (diffHours < 1) return 10;
  if (diffHours < 3) return 8;
  if (diffHours < 6) return 6;
  if (diffHours < 12) return 4;
  if (diffHours < 24) return 2;
  return 0;
}

export function calculateBoostScore(escort: Escort, boostMultiplier: number): number {
  let boostScore = 0;
  
  boostScore += calculateProfileCompletenessScore(80);
  boostScore += calculateVerificationScore(escort.isVerified ?? false);
  boostScore += calculateRatingScore(escort.rating);
  boostScore += calculateProfileAgeScore(new Date());
  boostScore += calculateLocationScore('USA');
  boostScore += calculateRoleScore('regular');
  boostScore += calculateLastActiveScore(escort);
  
  return boostScore * boostMultiplier;
}

