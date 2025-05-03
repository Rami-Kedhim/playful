
import React from 'react';
import { Button } from '@/components/ui/button';

const MetaverseSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1 bg-primary/20 rounded-full">
            <span className="text-primary font-medium">Experience The Future</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enter The UberEscorts Metaverse</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Experience escort interactions in a whole new dimension with our immersive virtual world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Metaverse Feature 1 */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">Virtual Meetings</h3>
            <p className="text-gray-300 mb-6">
              Meet escorts in customizable virtual environments before booking real-world appointments.
            </p>
            <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700">
              Explore Virtual Rooms
            </Button>
          </div>
          
          {/* Metaverse Feature 2 */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">Digital Companions</h3>
            <p className="text-gray-300 mb-6">
              Create and interact with hyper-realistic AI companions with advanced emotional intelligence.
            </p>
            <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700">
              Meet Companions
            </Button>
          </div>
          
          {/* Metaverse Feature 3 */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">Exclusive Events</h3>
            <p className="text-gray-300 mb-6">
              Attend exclusive virtual parties, fashion shows, and social gatherings in our metaverse.
            </p>
            <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700">
              Upcoming Events
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Enter Metaverse
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Requires a compatible VR headset or high-performance device
          </p>
        </div>
      </div>
    </section>
  );
};

export default MetaverseSection;
