
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Download, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useBrainHubPersistence from '@/hooks/useBrainHubPersistence';
import { useAuth } from '@/hooks/auth/useAuthContext';

const PersistenceControls: React.FC = () => {
  const { saveState, loadState, lastSaved, isSaving, isLoading, error } = useBrainHubPersistence();
  const { isAuthenticated } = useAuth();
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [loadFeedback, setLoadFeedback] = useState<string | null>(null);
  
  const handleSave = async () => {
    setSaveFeedback(null);
    const success = await saveState();
    if (success) {
      setSaveFeedback("Configuration saved successfully");
      setTimeout(() => setSaveFeedback(null), 3000);
    }
  };
  
  const handleLoad = async () => {
    setLoadFeedback(null);
    const success = await loadState();
    if (success) {
      setLoadFeedback("Configuration loaded successfully");
      setTimeout(() => setLoadFeedback(null), 3000);
    }
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    
    // Format like "Today at 2:30 PM" or "Mar 15, 2023 at 2:30 PM"
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleString([], { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Configuration Persistence</CardTitle>
        <CardDescription>
          Save and restore your Brain Hub configuration
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isAuthenticated && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need to be signed in to save or load configurations.
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert className="mb-4" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {saveFeedback && (
          <Alert className="mb-4" variant="success">
            <AlertDescription>{saveFeedback}</AlertDescription>
          </Alert>
        )}
        
        {loadFeedback && (
          <Alert className="mb-4" variant="success">
            <AlertDescription>{loadFeedback}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Last saved:</span>
            <Badge variant="outline">{formatDate(lastSaved)}</Badge>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={handleSave} 
              disabled={!isAuthenticated || isSaving}
              className="flex-1"
              variant="default"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Configuration'}
            </Button>
            
            <Button 
              onClick={handleLoad} 
              disabled={!isAuthenticated || isLoading}
              className="flex-1"
              variant="outline"
            >
              <Download className="mr-2 h-4 w-4" />
              {isLoading ? 'Loading...' : 'Load Configuration'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersistenceControls;
