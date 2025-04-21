
import { ActiveBoost, PulseBoost, UserEconomy } from "@/types/pulse-boost";
import { PULSE_BOOSTS } from "@/constants/pulseBoostConfig";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

/**
 * Apply a Pulse Boost manually (requires UBX)
 */
export function applyPulseBoost(
  user: UserEconomy,
  boost: PulseBoost,
  currentDate: Date = new Date()
): UserEconomy | Error {
  if (user.ubxBalance < boost.costUBX) {
    return new Error('Not enough UBX balance');
  }

  const expiresAt = new Date(currentDate.getTime() + boost.durationMinutes * 60 * 1000);

  return {
    ...user,
    ubxBalance: user.ubxBalance - boost.costUBX,
    activeBoosts: [
      ...user.activeBoosts,
      {
        boostId: boost.id,
        startedAt: currentDate,
        expiresAt,
        visibility: boost.visibility
      }
    ]
  };
}

/**
 * Auto-apply boosts based on user subscription
 */
export function autoApplyPulseBoosts(
  user: UserEconomy,
  availableBoosts: PulseBoost[] = PULSE_BOOSTS,
  currentDate: Date = new Date()
): UserEconomy {
  // Find boosts that should be applied based on subscription
  const eligibleBoosts = availableBoosts.filter(boost =>
    boost.autoApplyWithPlan?.includes(user.subscriptionLevel)
  );

  // Create active boost objects
  const newBoosts = eligibleBoosts.map(boost => {
    const expiresAt = new Date(currentDate.getTime() + boost.durationMinutes * 60 * 1000);
    return {
      boostId: boost.id,
      startedAt: currentDate,
      expiresAt,
      visibility: boost.visibility
    };
  });

  // Only add new boosts if they don't already exist
  const existingBoostIds = user.activeBoosts.map(boost => boost.boostId);
  const uniqueNewBoosts = newBoosts.filter(boost => !existingBoostIds.includes(boost.boostId));
  
  // If we applied any new boosts, notify the user
  if (uniqueNewBoosts.length > 0) {
    toast({
      title: "Boost Applied",
      description: `${uniqueNewBoosts.length} boost(s) automatically applied with your subscription!`,
    });
  }

  return {
    ...user,
    activeBoosts: [...user.activeBoosts, ...uniqueNewBoosts]
  };
}

/**
 * Remove expired boosts
 */
export function cleanExpiredPulseBoosts(user: UserEconomy, now: Date = new Date()): UserEconomy {
  const activeBoosts = user.activeBoosts.filter(boost => boost.expiresAt > now);
  
  // If boosts were removed, log it
  if (activeBoosts.length < user.activeBoosts.length) {
    console.log(`Removed ${user.activeBoosts.length - activeBoosts.length} expired boost(s)`);
  }
  
  return {
    ...user,
    activeBoosts
  };
}

/**
 * Check if user has an active boost of a specific type
 */
export function hasActiveBoostType(user: UserEconomy, boostId: string): boolean {
  return user.activeBoosts.some(boost => boost.boostId === boostId);
}

/**
 * Check if user has any active boost
 */
export function hasAnyActiveBoost(user: UserEconomy): boolean {
  const now = new Date();
  return user.activeBoosts.some(boost => boost.expiresAt > now);
}

/**
 * Get active boost details with time remaining
 */
export function getActiveBoostDetails(user: UserEconomy): (ActiveBoost & { timeRemaining: string, boostDetails: PulseBoost | undefined })[] {
  const now = new Date();
  
  return user.activeBoosts
    .filter(boost => boost.expiresAt > now)
    .map(boost => {
      const boostDetails = PULSE_BOOSTS.find(b => b.id === boost.boostId);
      return {
        ...boost,
        timeRemaining: formatDistanceToNow(boost.expiresAt, { addSuffix: false }),
        boostDetails
      };
    });
}

/**
 * Calculate the total boost power for a user
 * Returns a score from 0-100 indicating boost level
 */
export function calculatePulseBoostPower(user: UserEconomy): number {
  const now = new Date();
  const activeBoosts = user.activeBoosts.filter(boost => boost.expiresAt > now);
  
  if (activeBoosts.length === 0) return 0;
  
  // Weight different boost types
  const boostWeights: Record<string, number> = {
    'flash_boost': 60,
    'hourly_boost': 70,
    'smart_boost': 80,
    'gold_boost': 90,
    'weekend_boost': 100
  };
  
  // Get highest boost weight
  const highestBoostPower = Math.max(
    ...activeBoosts.map(boost => boostWeights[boost.boostId] || 50)
  );
  
  return highestBoostPower;
}
