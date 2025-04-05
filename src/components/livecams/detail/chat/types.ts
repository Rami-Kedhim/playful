
export type MessageType = "normal" | "tip" | "system" | "join" | "leave";

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  type: MessageType;
  isOwner?: boolean;
  isModerator?: boolean;
  tipAmount?: number;
}
