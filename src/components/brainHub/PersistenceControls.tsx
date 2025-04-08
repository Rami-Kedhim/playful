
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBrainHubPersistence } from '@/hooks/useBrainHubPersistence';
import { Save, RotateCcw, Clock } from 'lucide-react';
import { format } from 'date-fns';

const PersistenceControls: React.FC = () => {
  const { 
    saveState, 
    loadState, 
    lastSaved, 
    isSaving, 
    isLoading 
  } = useBrainHubPersistence();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center">
          <Save className="w-4 h-4 mr-2" /> Configuration Persistence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {lastSaved && (
            <div className="text-xs text-muted-foreground flex items-center mb-2">
              <Clock className="w-3 h-3 mr-1" /> 
              Last saved: {format(lastSaved, 'MMM d, yyyy HH:mm')}
            </div>
          )}
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={() => saveState()}
              disabled={isSaving}
              className="flex-1"
            >
              {isSaving ? 'Saving...' : 'Save Config'}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => loadState()}
              disabled={isLoading}
              className="flex-1"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> 
              {isLoading ? 'Loading...' : 'Restore'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersistenceControls;
