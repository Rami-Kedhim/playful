
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import LucieAIAssistant from '@/components/ai/LucieAIAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LucieTalkPage = () => {
  return (
    <UnifiedLayout
      title="Talk with Lucie"
      description="Have a conversation with Lucie, your AI assistant"
      showBreadcrumbs
    >
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Lucie AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <LucieAIAssistant 
              initialPrompt="Hello! How can I assist you today?" 
            />
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default LucieTalkPage;
