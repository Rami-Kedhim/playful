
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

interface EmptyServiceStateProps {
  icon: React.ReactNode;
  title: string;
  onRegister: () => void;
}

const EmptyServiceState: React.FC<EmptyServiceStateProps> = ({
  icon,
  title,
  onRegister
}) => {
  return (
    <Card className="p-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        {icon}
        <p>No {title} neural services registered</p>
        <Button onClick={onRegister}>
          <Power className="mr-2 h-4 w-4" />
          Register Service
        </Button>
      </div>
    </Card>
  );
};

export default EmptyServiceState;
