
import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

interface EmptyServiceStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  onRegister: () => void;
}

const EmptyServiceState: React.FC<EmptyServiceStateProps> = ({
  icon,
  title,
  description = "No neural services are registered for this category yet.",
  onRegister
}) => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center p-10 text-center">
        <div className="text-muted-foreground mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium mb-2">{title} Neural Service</h3>
        <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
        <Button variant="outline" onClick={onRegister}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Register Default Service
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyServiceState;
