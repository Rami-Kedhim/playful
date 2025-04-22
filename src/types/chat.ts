
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date | string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
  isDeleted?: boolean;
}

export interface Attachment {
  id: string;
  url: string;
  type: 'image' | 'video' | 'file';
  name: string;
  size?: number;
  thumbnailUrl?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}
