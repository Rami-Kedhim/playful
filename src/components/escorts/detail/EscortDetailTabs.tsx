
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Escort } from '@/types/escort';
import EscortReviews from './tabs/EscortReviews';
import EscortRates from './tabs/EscortRates';
import EscortServices from './tabs/EscortServices';
import EscortAvailability from './tabs/EscortAvailability';

interface EscortDetailTabsProps {
  escort: Escort;
}

const EscortDetailTabs: React.FC<EscortDetailTabsProps> = ({ escort }) => {
  return (
    <Tabs defaultValue="about" className="mb-8">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="rates">Rates</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about">
        <Card>
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-2">About Me</h3>
              <p>{escort.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
                <div>
                  <h4 className="font-semibold">Details</h4>
                  <ul className="list-none p-0 space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Age:</span> 
                      <span>{escort.age}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Gender:</span> 
                      <span>{escort.gender}</span>
                    </li>
                    {escort.sexualOrientation && (
                      <li className="flex justify-between">
                        <span className="text-gray-500">Orientation:</span> 
                        <span>{escort.sexualOrientation}</span>
                      </li>
                    )}
                    {escort.languages && (
                      <li className="flex justify-between">
                        <span className="text-gray-500">Languages:</span> 
                        <span>{escort.languages.join(', ')}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold">Appearance</h4>
                  <ul className="list-none p-0 space-y-2">
                    {typeof escort.height === 'number' && (
                      <li className="flex justify-between">
                        <span className="text-gray-500">Height:</span> 
                        <span>{escort.height} cm</span>
                      </li>
                    )}
                    {typeof escort.weight === 'number' && (
                      <li className="flex justify-between">
                        <span className="text-gray-500">Weight:</span> 
                        <span>{escort.weight} kg</span>
                      </li>
                    )}
                    {escort.hairColor && (
                      <li className="flex justify-between">
                        <span className="text-gray-500">Hair:</span> 
                        <span>{escort.hairColor}</span>
                      </li>
                    )}
                    {escort.eyeColor && (
                      <li className="flex justify-between">
                        <span className="text-gray-500">Eyes:</span> 
                        <span>{escort.eyeColor}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="rates">
        <EscortRates escort={escort} />
      </TabsContent>
      
      <TabsContent value="services">
        <EscortServices escort={escort} />
      </TabsContent>
      
      <TabsContent value="reviews">
        <EscortReviews escort={escort} />
      </TabsContent>
    </Tabs>
  );
};

export default EscortDetailTabs;
