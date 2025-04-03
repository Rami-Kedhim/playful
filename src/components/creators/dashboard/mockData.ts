
import { Comment } from "./types/comment";

// Mock data - in a real app, this would come from an API
export const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Jessica Brown',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80'
    },
    content: 'This content is amazing! Exactly what I was looking for. Keep up the great work!',
    contentId: 'content1',
    contentTitle: 'Beach Photoshoot Collection',
    createdAt: new Date(2023, 10, 5, 14, 32),
    likes: 12,
    isLiked: false,
    isFlagged: false
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=100&h=100&q=80'
    },
    content: 'Would love to see more content like this. When is your next release scheduled?',
    contentId: 'content2',
    contentTitle: 'Sunset Dress Collection',
    createdAt: new Date(2023, 10, 4, 9, 15),
    likes: 5,
    isLiked: true,
    isFlagged: false
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Sophia Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80'
    },
    content: 'This is absolutely stunning! I can\'t believe how perfect the lighting is.',
    contentId: 'content1',
    contentTitle: 'Beach Photoshoot Collection',
    createdAt: new Date(2023, 10, 3, 18, 45),
    likes: 8,
    isLiked: false,
    isFlagged: false
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'James Wilson',
      avatar: ''
    },
    content: 'Looking forward to the tutorial you mentioned. Could you share some tips on how you achieved this look?',
    contentId: 'content3',
    contentTitle: 'Studio Lighting Masterclass',
    createdAt: new Date(2023, 10, 2, 11, 22),
    likes: 3,
    isLiked: false,
    isFlagged: true
  },
  {
    id: '5',
    user: {
      id: 'user5',
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80'
    },
    content: 'Just subscribed to your premium content. Can\'t wait to see what\'s available!',
    contentId: 'content4',
    contentTitle: 'Premium Content Bundle',
    createdAt: new Date(2023, 10, 1, 16, 10),
    likes: 15,
    isLiked: true,
    isFlagged: false
  }
];
