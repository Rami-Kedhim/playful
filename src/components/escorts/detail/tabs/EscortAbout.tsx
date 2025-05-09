
import React from 'react';
import { Escort } from '@/types/Escort';
import { formatDate } from '@/lib/utils';

interface EscortAboutProps {
  escort: Escort;
}

const EscortAbout: React.FC<EscortAboutProps> = ({ escort }) => {
  // Function to handle undefined availability object
  const getAvailabilityDays = () => {
    if (!escort.availability || !escort.availability.days) {
      return [];
    }
    return escort.availability.days;
  };

  return (
    <div className="space-y-8">
      {/* Bio Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">About Me</h3>
        <p className="text-gray-700 leading-relaxed">{escort.bio || 'No bio available.'}</p>
      </section>

      {/* Availability Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Availability</h3>
        {escort.availability ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getAvailabilityDays().length > 0 ? (
              getAvailabilityDays().map((day, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{day.day}</span>
                  <span className={day.available ? "text-green-600" : "text-red-600"}>
                    {day.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No specific availability information provided.</p>
            )}

            {escort.availability.notes && (
              <div className="col-span-1 md:col-span-2 mt-2">
                <h4 className="font-medium">Notes:</h4>
                <p className="text-gray-600">{escort.availability.notes}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No availability information provided.</p>
        )}
      </section>

      {/* Stats Section */}
      {escort.stats && (
        <section>
          <h3 className="text-xl font-semibold mb-4">Profile Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{escort.clientsServed || 0}</div>
              <div className="text-sm text-gray-600">Clients Served</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">
                {escort.lastActive ? formatDate(escort.lastActive, { 
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Last Active</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{escort.rating || 'N/A'}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>
        </section>
      )}

      {/* Physical Attributes Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Physical Attributes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
          {escort.bodyType && (
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Body Type:</span>
              <span className="font-medium">{escort.bodyType}</span>
            </div>
          )}
          {escort.height && (
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Height:</span>
              <span className="font-medium">{escort.height}</span>
            </div>
          )}
          {escort.weight && (
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Weight:</span>
              <span className="font-medium">{escort.weight}</span>
            </div>
          )}
          {escort.measurements && (
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Measurements:</span>
              <span className="font-medium">{escort.measurements}</span>
            </div>
          )}
          {escort.hairColor && (
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Hair Color:</span>
              <span className="font-medium">{escort.hairColor}</span>
            </div>
          )}
          {escort.eyeColor && (
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Eye Color:</span>
              <span className="font-medium">{escort.eyeColor}</span>
            </div>
          )}
          {escort.ethnicity && (
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">Ethnicity:</span>
              <span className="font-medium">{escort.ethnicity}</span>
            </div>
          )}
        </div>
      </section>

      {/* Interests Section */}
      {escort.interests && escort.interests.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {escort.interests.map((interest, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default EscortAbout;
