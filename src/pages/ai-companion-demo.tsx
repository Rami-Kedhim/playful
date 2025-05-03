
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AICompanionChat from '@/components/ai/AICompanionChat';
import { type PersonalityType } from '@/types/ai-personality';

const AICompanionDemo = () => {
  const demoCompanion = {
    companionId: 'demo-1',
    name: 'Aria',
    personalityType: 'flirty' as PersonalityType,
    avatarUrl: '/avatars/aria.png',
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Companion Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-[600px]">
          <CardHeader>
            <CardTitle>Chat with {demoCompanion.name}</CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            <AICompanionChat 
              companionId={demoCompanion.companionId}
              name={demoCompanion.name}
              personalityType={demoCompanion.personalityType}
              avatarUrl={demoCompanion.avatarUrl}
              initialMessage={`Hi there! I'm ${demoCompanion.name}. How can I help you today?`}
              className="h-full"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>About AI Companions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our AI Companions provide personalized experiences tailored to your preferences.
              This is a demo of our basic companion chat functionality.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AICompanionDemo;
