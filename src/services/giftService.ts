// Import appropriate types instead of AIGift
import { Gift, GiftType } from '@/types/gift';
import { supabase } from '@/integrations/supabase/client';

// Mock gift data for development
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
  try {
    const { data, error } = await supabase
      .from('gifts')
      .select('*');
    
    if (error) {
      console.error('Error fetching gifts:', error);
      return mockGifts;
    }
    
    return data as Gift[];
  } catch (error) {
    console.error('Error in getAvailableGifts:', error);
    return mockGifts;
  }
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
  try {
    const { data, error } = await supabase
      .from('sent_gifts')
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        gift_id: giftId,
        message: message || '',
        sent_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error sending gift:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in sendGift:', error);
    return false;
  }
};

/**
 * Get gifts received by a profile
 */
export const getReceivedGifts = async (profileId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('sent_gifts')
      .select(`
        *,
        gifts:gift_id (*)
      `)
      .eq('receiver_id', profileId);
    
    if (error) {
      console.error('Error fetching received gifts:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error in getReceivedGifts:', error);
    return [];
  }
};

/**
 * Get gifts sent by a profile
 */
export const getSentGifts = async (profileId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('sent_gifts')
      .select(`
        *,
        gifts:gift_id (*)
      `)
      .eq('sender_id', profileId);
    
    if (error) {
      console.error('Error fetching sent gifts:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error in getSentGifts:', error);
    return [];
  }
};

export default {
  getAvailableGifts,
  sendGift,
  getReceivedGifts,
  getSentGifts
};
