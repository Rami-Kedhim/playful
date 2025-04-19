
// Fix exports for mockCreators and mockLivecams
export const mockCreators = [
  {
    id: 'creator-1',
    username: 'creator1',
    name: 'Jordan Blake',
    avatarUrl: '/avatars/jordan.png',
    bio: 'Popular content creator',
    location: 'Los Angeles',
    subscriberCount: 1200,
    rating: 4.8,
    featured: true,
    tags: ['gaming', 'vlogging'],
    isVerified: true,
    isAI: false,
    createdAt: '2023-01-10T12:00:00Z',
    updatedAt: '2023-03-15T12:00:00Z',
  },
  {
    id: 'creator-2',
    username: 'creator2',
    name: 'Alexa Rivers',
    avatarUrl: '/avatars/alexa.png',
    bio: 'Rising star in beauty content',
    location: 'New York',
    subscriberCount: 800,
    rating: 4.5,
    featured: false,
    tags: ['beauty', 'lifestyle'],
    isVerified: false,
    isAI: true,
    createdAt: '2023-02-01T12:00:00Z',
    updatedAt: '2023-04-01T12:00:00Z',
  }
];

export const mockLivecams = [
  {
    id: 'livecam-1',
    name: 'Sunshine Show',
    featured: true,
    isLive: true,
    category: 'Entertainment',
  },
  {
    id: 'livecam-2',
    name: 'Night Owl Hour',
    featured: false,
    isLive: false,
    category: 'Gaming',
  }
];

