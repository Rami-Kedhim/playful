
import React from 'react';
import { Escort, EscortAvailability as AvailabilityType } from '@/types/Escort';
import { Calendar, Clock } from 'lucide-react';

interface EscortAvailabilityProps {
  escort: Escort;
}

const EscortAvailability: React.FC<EscortAvailabilityProps> = ({ escort }) => {
  // Function to handle undefined availability object
  const getAvailabilityDays = () => {
    if (!escort.availability || !escort.availability.days) {
      return [];
    }
    return escort.availability.days;
  };

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Weekly Schedule
        </h3>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="grid grid-cols-2 font-medium">
              <div>Day</div>
              <div>Availability</div>
            </div>
          </div>

          <div className="divide-y">
            {getAvailabilityDays().length > 0 ? (
              getAvailabilityDays().map((day, index) => (
                <div key={index} className="grid grid-cols-2 px-4 py-3">
                  <div className="font-medium">{day.day}</div>
                  <div className={day.available ? "text-green-600" : "text-red-500"}>
                    {day.available ? (
                      day.hours && day.hours.length > 0 ? (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {day.hours.map((hour, idx) => (
                            <span key={idx} className="mr-2">
                              {hour.start} - {hour.end}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "Available"
                      )
                    ) : (
                      "Not Available"
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">
                No availability schedule provided
              </div>
            )}
          </div>
        </div>
      </section>

      {escort.availability && escort.availability.notes && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Notes</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{escort.availability.notes}</p>
          </div>
        </section>
      )}

      <section>
        <h3 className="text-xl font-semibold mb-2">Booking Policy</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">
            Please make bookings at least 24 hours in advance to ensure availability.
            Last minute bookings may be accommodated based on schedule.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EscortAvailability;
