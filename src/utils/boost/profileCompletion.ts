import { Escort } from "@/types/escort";

/**
 * Calculates a profile completion score based on the provided Escort profile.
 *
 * @param {Escort} escort - The Escort profile to evaluate.
 * @returns {number} The profile completion score as a percentage.
 */
export const calculateProfileCompletion = (escort: Escort): number => {
  let totalItems = 0;
  let completedItems = 0;

  // Increment total items.
  totalItems += 14;

  // Check if basic information is provided
  if (escort.name) completedItems++;
  if (escort.age) completedItems++;
  if (escort.location) completedItems++;
  if (escort.description) completedItems++;
  if (escort.gender) completedItems++;
  if (escort.price) completedItems++;

  // Check if contact information is provided
  if (escort.contactInfo?.email) completedItems++;
  if (escort.contactInfo?.phone) completedItems++;

  // Check if physical attributes are provided
  if (escort.height) completedItems++;
  if (escort.weight) completedItems++;
  if (escort.measurements) completedItems++;
  if (escort.hairColor) completedItems++;
  if (escort.eyeColor) completedItems++;

  // Check if availability details are provided
  if (escort.availability && typeof escort.availability === 'object' && 
      'days' in escort.availability && 
      escort.availability.days && 
      escort.availability.days.length > 0) {
    completedItems++;
  }

  // Calculate the profile completion score as a percentage.
  const completionScore = (completedItems / totalItems) * 100;
  return Math.round(completionScore);
};
