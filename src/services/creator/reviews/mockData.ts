
import { CreatorReview } from './types';

/**
 * Mock review data for testing and demo purposes
 */
export const mockReviews: CreatorReview[] = [
  {
    id: 'review1',
    reviewer_id: 'user1',
    creator_id: 'creator1',
    rating: 5,
    comment: 'Amazing experience! Love the content.',
    created_at: '2023-10-15T12:00:00Z',
    reviewer: {
      id: 'user1',
      username: 'JohnDoe',
      avatar_url: 'https://i.pravatar.cc/150?u=user1'
    }
  },
  {
    id: 'review2',
    reviewer_id: 'user2',
    creator_id: 'creator1',
    rating: 4,
    comment: 'Great content but could use more frequent updates.',
    created_at: '2023-10-10T14:30:00Z',
    reviewer: {
      id: 'user2',
      username: 'JaneSmith',
      avatar_url: 'https://i.pravatar.cc/150?u=user2'
    }
  },
  {
    id: 'review3',
    reviewer_id: 'user3',
    creator_id: 'creator2',
    rating: 5,
    comment: 'Best creator I\'ve subscribed to!',
    created_at: '2023-10-05T09:20:00Z',
    reviewer: {
      id: 'user3',
      username: 'BobJones',
      avatar_url: 'https://i.pravatar.cc/150?u=user3'
    }
  }
];
