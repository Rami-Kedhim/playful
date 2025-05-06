
import React from 'react';
import { Brain, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyServiceStateProps {
  onRegister: () => void;
}

const EmptyServiceState: React.FC<EmptyServiceStateProps> = ({ onRegister }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-muted rounded-md">
      <Brain className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium mb-2">No neural services found</h3>
      <p className="text-muted-foreground text-center mb-4">
        There are no active neural services or modules in this instance.
      </p>
      <Button onClick={onRegister} className="gap-2">
        <Plus className="h-4 w-4" />
        Register Neural Service
      </Button>
    </div>
  );
};

export default EmptyServiceState;
