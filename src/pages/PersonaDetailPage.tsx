
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePersona } from '@/modules/personas/hooks/usePersona';
import { UberPersona } from '@/types/uberPersona';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/MainLayout';
import { hermes } from '@/core/Hermes';
import { uberCore } from '@/core/UberCore';
import { lucie } from '@/core/Lucie';

const PersonaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    // Log page view with Hermes
    hermes.connect({
      system: 'PersonaDetailPage',
      connectionId: `persona-detail-${Date.now()}`,
      metadata: {
        personaId: id,
        timestamp: new Date().toISOString()
      }
    });
    
    // Moderate content access through Lucie
    lucie.moderateContent(`Accessing persona detail for ID: ${id}`);
    
    // Verify system integrity
    uberCore.checkSystemIntegrity();
    
    const fetchPersonaDetails = async () => {
      try {
        setLoading(true);
        
        // This is a mock implementation - in a real app we would use the personaService
        const mockPersona: UberPersona = {
          id,
          name: `Persona ${id}`,
          type: 'escort',
          avatarUrl: 'https://example.com/avatar.jpg',
          description: 'This is a detailed description of the persona that would typically include their background, interests, and other relevant information.',
          location: 'New York, NY',
          services: ['Companionship', 'Event Escort', 'Dinner Date'],
          languages: ['English', 'Spanish'],
          isVerified: true,
          rating: 4.8,
          reviews: [],
          isOnline: true,
          isPremium: true,
          isFeatured: true
        };
        
        setPersona(mockPersona);
        setError(null);
      } catch (err) {
        console.error('Error fetching persona details:', err);
        setError('Failed to load persona details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonaDetails();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-300">
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!persona) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p>Persona not found</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center gap-4">
              {persona.avatarUrl && (
                <img 
                  src={persona.avatarUrl} 
                  alt={persona.name || 'Persona'} 
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold">{persona.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-muted-foreground">{persona.type}</span>
                  {persona.isVerified && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Verified
                    </Badge>
                  )}
                  {persona.isPremium && (
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                      Premium
                    </Badge>
                  )}
                </div>
                {persona.location && (
                  <p className="text-sm text-muted-foreground mt-1">{persona.location}</p>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {persona.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p>{persona.description}</p>
            </div>
          )}
          
          {persona.services && persona.services.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Services</h2>
              <div className="flex flex-wrap gap-2">
                {persona.services.map((service, index) => (
                  <Badge key={index} variant="secondary">{service}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {persona.languages && persona.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {persona.languages.map((language, index) => (
                  <Badge key={index} variant="outline">{language}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaDetailPage;
