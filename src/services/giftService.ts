
// Mock gift data and export types for gifts.
// Fix import of Gift types with explicit interface mocks if no actual type available.

export interface Gift {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url: string;
  type: string;
  animation_url?: string;
}

export enum GiftType {
  FLOWER = 'flower',
  DRINK = 'drink',
  JEWELRY = 'jewelry'
}

const mockGifts: Gift[] = [
  {
    id: 'gift-1',
    name: 'Rose',
    description: 'A beautiful red rose',
    price: 5,
    image_url: '/images/gifts/rose.png',
    type: GiftType.FLOWER,
    animation_url: '/animations/rose.json',
  },
  {
    id: 'gift-2',
    name: 'Champagne',
    description: 'Bottle of premium champagne',
    price: 20,
    image_url: '/images/gifts/champagne.png',
    type: GiftType.DRINK,
    animation_url: '/animations/champagne.json',
  },
  {
    id: 'gift-3',
    name: 'Diamond',
    description: 'Sparkling diamond gift',
    price: 50,
    image_url: '/images/gifts/diamond.png',
    type: GiftType.JEWELRY,
    animation_url: '/animations/diamond.json',
  }
];

/**
 * Get all available gifts
 */
export const getAvailableGifts = async (): Promise<Gift[]> => {
  // Mock only in this fix, real supabase call if enabled
  return mockGifts;
};

/**
 * Send a gift to a profile
 */
export const sendGift = async (
  senderId: string,
  receiverId: string,
  giftId: string,
  message?: string
): Promise<boolean> => {
  // Mock sending
  return true;
};

/**
 * Get gifts received by a profile
 */
export const getReceivedGifts = async (profileId: string): Promise<any[]> => {
  // Mock only
  return [];
};

/**
 * Get gifts sent by a profile
 */
export const getSentGifts = async (profileId: string): Promise<any[]> => {
  // Mock only
  return [];
};

export default {
  getAvailableGifts,
  sendGift,
  getReceivedGifts,
  getSentGifts
};
