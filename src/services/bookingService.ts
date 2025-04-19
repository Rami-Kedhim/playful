import { Booking } from "@/types/booking";

export const bookingService = {
  getBookings: async (): Promise<Booking[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },
  getBooking: async (id: string): Promise<Booking | null> => {
    // Mock implementation
    return Promise.resolve(null);
  },
  createBooking: async (booking: Booking): Promise<Booking> => {
    // Mock implementation
    return Promise.resolve(booking);
  },
  updateBooking: async (id: string, booking: Booking): Promise<Booking> => {
    // Mock implementation
    return Promise.resolve(booking);
  },
  deleteBooking: async (id: string): Promise<void> => {
    // Mock implementation
    return Promise.resolve();
  },
};
