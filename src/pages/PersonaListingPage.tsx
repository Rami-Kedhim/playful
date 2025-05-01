
import React, { useState, useEffect } from 'react';
import { usePersona } from '@/modules/personas/hooks/usePersona';
import { UberPersona } from '@/types/uberPersona';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import { hermes } from '@/core/Hermes';
import { uberCore } from '@/core/UberCore';

const PersonaListingPage: React.FC = () => {
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchPersonas } = usePersona();
  
  useEffect(() => {
    // Log page view with Hermes
    hermes.connect({
      system: 'PersonaListingPage',
      connectionId: `personas-${Date.now()}`,
      metadata: {
        page: 'persona-listing',
        timestamp: new Date().toISOString()
      }
    });
    
    // Verify system integrity
    uberCore.checkSystemIntegrity();
    
    const fetchPersonas = async () => {
      try {
        setLoading(true);
        const result = await searchPersonas({ limit: 20 });
        setPersonas(result.data);
      } catch (error) {
        console.error('Error fetching personas:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonas();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Persona Listing</h1>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <Card key={persona.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {persona.avatarUrl && (
                    <img 
                      src={persona.avatarUrl} 
                      alt={persona.name || 'Persona'} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{persona.name || 'Unknown Name'}</h3>
                    <p className="text-muted-foreground text-sm">{persona.type || 'No type specified'}</p>
                    {persona.location && (
                      <p className="text-sm mt-1">{persona.location}</p>
                    )}
                  </div>
                </div>
                {persona.description && (
                  <p className="mt-4 text-sm">{persona.description}</p>
                )}
                <div className="mt-4 flex justify-between items-center">
                  {persona.isVerified && (
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Verified
                    </span>
                  )}
                  <a 
                    href={`/persona/${persona.id}`}
                    className="text-primary hover:underline text-sm"
                  >
                    View Profile →
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonaListingPage;
