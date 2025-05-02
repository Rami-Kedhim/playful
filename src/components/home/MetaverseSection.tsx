
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Blocks } from 'lucide-react';

const MetaverseSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-900/90 to-purple-900/90">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-2">
              <Blocks className="h-4 w-4 inline mr-2" />
              Immersive Experiences
            </div>
            
            <h2 className="text-4xl font-bold text-white">Step Into Our Metaverse</h2>
            <p className="text-gray-300 text-lg">
              Explore virtual worlds with interactive AI companions and escorts. 
              Meet in fully immersive 3D environments that take your experience to the next level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link to="/metaverse">
                  Enter Metaverse <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                <Link to="/metaverse/learn">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/40 z-10" />
            <img 
              src="https://source.unsplash.com/random/800x450/?virtual,world,metaverse" 
              alt="Metaverse Preview" 
              className="object-cover w-full h-full"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white cursor-pointer">
                <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-purple-600 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetaverseSection;
