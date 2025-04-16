
import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingStatus } from '@/types/escort';

interface BookingResult {
  success: boolean;
  error?: string;
  booking?: Booking;
}

export const bookingService = {
  createBooking: async (bookingData: Booking): Promise<BookingResult> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        booking: data as Booking
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create booking'
      };
    }
  },

  getBookingById: async (id: string): Promise<BookingResult> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        booking: data as Booking
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get booking'
      };
    }
  },

  getUserBookings: async (userId: string): Promise<Booking[]> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .or(`client_id.eq.${userId},escort_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data as Booking[];
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      return [];
    }
  },

  updateBookingStatus: async (bookingId: string, status: BookingStatus): Promise<BookingResult> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        booking: data as Booking
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update booking status'
      };
    }
  },

  subscribeToBookingUpdates: (bookingId: string, callback: (booking: Booking) => void) => {
    return supabase
      .channel(`booking:${bookingId}`)
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'bookings', 
          filter: `id=eq.${bookingId}`
        }, 
        (payload) => {
          callback(payload.new as unknown as Booking);
        }
      )
      .subscribe();
  }
};

export default bookingService;
