
export interface BookingFormData {
  date: Date;
  time: string;
  duration: string;
  location: string;
  special_requests?: string;
  service_type?: string;
  meeting_type?: 'in_person' | 'virtual';
  escort_id: string;
  client_id?: string;
}
