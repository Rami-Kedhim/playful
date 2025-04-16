
import { supabase } from "@/integrations/supabase/client";
import { Booking, BookingStatus } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

/**
 * Service for handling escort bookings
 */
export const bookingService = {
  /**
   * Create a new booking request
   */
  async createBooking(bookingData: Partial<Booking>): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    try {
      // Add default values
      const bookingWithDefaults = {
        ...bookingData,
        status: "pending" as BookingStatus,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("bookings")
        .insert(bookingWithDefaults)
        .select()
        .single();

      if (error) throw error;

      // Set up real-time notification for the escort
      if (data.escort_id) {
        await this.sendBookingNotification(data.escort_id, {
          title: "New Booking Request",
          message: "You have received a new booking request",
          type: "booking_request",
        });
      }

      return { success: true, booking: data };
    } catch (error: any) {
      console.error("Error creating booking:", error);
      return { 
        success: false, 
        error: error.message || "Failed to create booking" 
      };
    }
  },

  /**
   * Update a booking status
   */
  async updateBookingStatus(
    bookingId: string, 
    status: BookingStatus,
    notes?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: booking, error: fetchError } = await supabase
        .from("bookings")
        .select("client_id, escort_id")
        .eq("id", bookingId)
        .single();

      if (fetchError) throw fetchError;

      const { error } = await supabase
        .from("bookings")
        .update({ 
          status, 
          updated_at: new Date().toISOString(),
          ...(notes && { notes })
        })
        .eq("id", bookingId);

      if (error) throw error;

      // Send notification to relevant users based on status change
      if (booking) {
        const notificationRecipient = status === "cancelled" ? booking.escort_id : booking.client_id;
        
        await this.sendBookingNotification(notificationRecipient, {
          title: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
          message: `Your booking has been ${status}${notes ? `: ${notes}` : ""}`,
          type: "booking_update",
        });
      }

      return { success: true };
    } catch (error: any) {
      console.error("Error updating booking:", error);
      return { 
        success: false, 
        error: error.message || "Failed to update booking" 
      };
    }
  },

  /**
   * Get bookings for a user (either as client or escort)
   */
  async getUserBookings(
    userId: string,
    role: "client" | "escort" = "client",
    status?: BookingStatus
  ): Promise<{ bookings: Booking[]; error?: string }> {
    try {
      let query = supabase
        .from("bookings")
        .select(`
          *,
          client:client_id(id, username, avatar_url),
          escort:escort_id(id, name, avatar_url)
        `)
        .eq(role === "client" ? "client_id" : "escort_id", userId)
        .order("created_at", { ascending: false });

      if (status) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { bookings: data || [] };
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      return { 
        bookings: [],
        error: error.message || "Failed to fetch bookings" 
      };
    }
  },
  
  /**
   * Get a single booking by ID
   */
  async getBookingById(bookingId: string): Promise<{ booking?: Booking; error?: string }> {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          client:client_id(id, username, avatar_url, phone_number, email),
          escort:escort_id(id, name, avatar_url, phone_number, email)
        `)
        .eq("id", bookingId)
        .single();

      if (error) throw error;

      return { booking: data };
    } catch (error: any) {
      console.error("Error fetching booking:", error);
      return { 
        error: error.message || "Failed to fetch booking" 
      };
    }
  },

  /**
   * Send a notification about a booking
   */
  async sendBookingNotification(
    userId: string,
    notification: { title: string; message: string; type: string }
  ): Promise<void> {
    try {
      await supabase.from("notifications").insert({
        user_id: userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        read: false
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  },

  /**
   * Subscribe to booking updates for real-time notifications
   */
  subscribeToBookingUpdates(bookingId: string, callback: (booking: Booking) => void) {
    return supabase
      .channel(`booking:${bookingId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: `id=eq.${bookingId}`
        },
        (payload) => {
          callback(payload.new as Booking);
        }
      )
      .subscribe();
  }
};
