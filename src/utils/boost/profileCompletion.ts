
import { Escort } from "@/types/Escort";

/**
 * Calculates a profile completion score based on the provided Escort profile.
 *
 * @param {Escort} escort - The Escort profile to evaluate.
 * @returns {number} The profile completion score as a percentage.
 */
export const calculateProfileCompletion = (escort: Escort): number => {
  let totalItems = 14;
  let completedItems = 0;

  if (escort.name) completedItems++;
  if (escort.age) completedItems++;
  if (escort.location) completedItems++;
  if (escort.description) completedItems++;
  if (escort.gender) completedItems++;
  if (escort.price) completedItems++;

  if (escort.contactInfo && typeof escort.contactInfo === 'object') {
    if (escort.contactInfo.email) completedItems++;
    if (escort.contactInfo.phone) completedItems++;
  }

  if (escort.height) completedItems++;
  if (escort.weight) completedItems++;
  if (escort.measurements) completedItems++;
  if (escort.hairColor) completedItems++;
  if (escort.eyeColor) completedItems++;

  if (escort.availability && typeof escort.availability === 'object' && 
      'days' in escort.availability && 
      Array.isArray((escort.availability as any).days) && 
      (escort.availability as any).days.length > 0) {
    completedItems++;
  }

  const completionScore = (completedItems / totalItems) * 100;
  return Math.round(completionScore);
};

