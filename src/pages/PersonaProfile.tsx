import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUberPersona } from '@/hooks/useUberPersona';
import { UberPersona } from '@/types/UberPersona';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MapPin, Star, Calendar, Video, Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PersonaAboutTab from '@/components/persona/tabs/PersonaAboutTab';
import PersonaBookingTab from '@/components/persona/tabs/PersonaBookingTab';
import PersonaChatTab from '@/components/persona/tabs/PersonaChatTab';
import PersonaContentTab from '@/components/persona/tabs/PersonaContentTab';
import PersonaLiveTab from '@/components/persona/tabs/PersonaLiveTab';
import PersonaStoriesTab from '@/components/persona/tabs/PersonaStoriesTab';

/**
 * Unified Persona Profile Page
 * 
 * This component displays a profile for any type of persona in the UberEcosystem:
 * - Escorts
 * - Content Creators
 * - Livecam Models
 * - AI Companions
 * 
 * It adapts the UI based on the persona type and capabilities
 */
const PersonaPage = () => {
  const { personaId } = useParams<{ personaId: string }>();
  const { getPersonaById } = useUberPersona();
  const [persona, setPersona] = useState<UberPersona | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  
  useEffect(() => {
    const loadPersona = async () => {
      setLoading(true);
      try {
        if (personaId) {
          const fetchedPersona = getPersonaById(personaId);
          setPersona(fetchedPersona);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadPersona();
  }, [personaId, getPersonaById]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (!persona) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              Persona not found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10">
      {/* Header Section */}
      <div className="mb-8 flex items-start gap-4">
        <Avatar className="h-32 w-32">
          <AvatarImage src={persona.avatarUrl} alt={persona.displayName} />
          <AvatarFallback>{persona.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-3xl font-semibold">{persona.displayName}</h1>
          <div className="flex items-center space-x-2 text-muted-foreground">
            {persona.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{persona.location}</span>
              </div>
            )}
            {persona.rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>{persona.rating.toFixed(1)} ({persona.stats?.reviewCount || 0} reviews)</span>
              </div>
            )}
          </div>
          
          <p className="mt-2 text-muted-foreground">{persona.bio}</p>
          
          <div className="mt-4 flex items-center space-x-2">
            {persona.isOnline && (
              <Badge variant="outline">Online</Badge>
            )}
            {persona.isVerified && (
              <Badge variant="secondary">Verified</Badge>
            )}
            {persona.isPremium && (
              <Badge>Premium</Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about">
          <PersonaAboutTab persona={persona} />
        </TabsContent>
        
        <TabsContent value="content">
          <PersonaContentTab persona={persona} />
        </TabsContent>
        
        <TabsContent value="live">
          <PersonaLiveTab persona={persona} />
        </TabsContent>
        
        <TabsContent value="stories">
          <PersonaStoriesTab persona={persona} />
        </TabsContent>
        
        <TabsContent value="chat">
          <PersonaChatTab persona={persona} />
        </TabsContent>
        
        <TabsContent value="booking">
          <PersonaBookingTab persona={persona} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonaPage;
