
// Shared props interface for AI companion chat components

export interface AICompanionChatProps {
  companionId: string;
  name?: string;
  avatarUrl?: string;
  personalityType?: string;
  initialMessage?: string;
  className?: string;
  userId?: string;
  userCredits?: number;
  onClose?: () => void;
}

export default AICompanionChatProps;
