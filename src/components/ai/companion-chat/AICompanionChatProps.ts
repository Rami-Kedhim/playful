
export interface AICompanionChatProps {
  companionId: string;
  name?: string;
  avatarUrl?: string;
  personalityType?: string;
  initialMessage?: string;
  onClose?: () => void;
}
