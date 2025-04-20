import { AuthUser, UserProfile } from "@/types/auth";

function getDisplayName(userProfile: UserProfile) {
  return userProfile.full_name ?? userProfile.username ?? 'User';
}

function getAvatarUrl(user: AuthUser | null, userProfile: UserProfile | null): string {
  return userProfile?.avatar_url || user?.avatarUrl || '/img/default-avatar.png';
}

function getLucoinsBalance(userProfile: UserProfile | null): number {
  return userProfile?.lucoinsBalance || 0;
}

function isUserVerified(userProfile: UserProfile | null): boolean {
  return userProfile?.is_verified || false;
}

function getUserLocation(userProfile: UserProfile | null): string {
  return userProfile?.location || 'Unknown';
}

function getUserBio(userProfile: UserProfile | null): string {
  return userProfile?.bio || '';
}

export { getDisplayName, getAvatarUrl, getLucoinsBalance, isUserVerified, getUserLocation, getUserBio };
