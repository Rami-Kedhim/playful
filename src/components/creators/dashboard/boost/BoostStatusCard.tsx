
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, ZapOff, Clock, TrendingUp, Calendar } from 'lucide-react';
import { BoostStatus } from '@/types/boost';

interface BoostStatusCardProps {
  boostStatus: BoostStatus;
  onCancel: () => Promise<void>;
  loading: boolean;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
}

const BoostStatusCard: React.FC<BoostStatusCardProps> = ({
  boostStatus,
  onCancel,
  loading,
  dailyBoostUsage,
  dailyBoostLimit
}) => {
  const [cancelLoading, setCancelLoading] = useState(false);
  
  const handleCancel = async () => {
    if (cancelLoading) return;
    
    setCancelLoading(true);
    try {
      await onCancel();
    } catch (error) {
      console.error('Error cancelling boost:', error);
    } finally {
      setCancelLoading(false);
    }
  };
  
  if (boostStatus.isActive) {
    // Calculate progress if not provided
    const progress = boostStatus.progress || 0;
    
    // Handle expiration date formatting
    let expiresAtDisplay = 'Unknown';
    if (boostStatus.expiresAt) {
      try {
        const expiresDate = typeof boostStatus.expiresAt === 'string' 
          ? new Date(boostStatus.expiresAt)
          : boostStatus.expiresAt;
        
        expiresAtDisplay = expiresDate.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        // If expiresAt is not a valid date string, use a fallback
        expiresAtDisplay = String(boostStatus.expiresAt);
      }
    }
    
    // Get package name
    const packageName = boostStatus.packageName || 'Standard Boost';
    
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-base font-medium">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Boost Active
            </CardTitle>
            <Badge variant="secondary">
              {packageName}
            </Badge>
          </div>
          <CardDescription>
            Your profile currently has increased visibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Boost Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/20 p-3 rounded-md flex flex-col items-center">
              <Clock className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-sm font-semibold">{boostStatus.remainingTime || '16h 32m'}</span>
              <span className="text-xs text-muted-foreground">Remaining</span>
            </div>
            <div className="bg-secondary/20 p-3 rounded-md flex flex-col items-center">
              <Calendar className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-sm font-semibold">{expiresAtDisplay}</span>
              <span className="text-xs text-muted-foreground">Expires</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={cancelLoading || loading}
            className="w-full"
          >
            {cancelLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <ZapOff className="mr-2 h-4 w-4" />
                Cancel Boost
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Not active state
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base font-medium">
          <Zap className="h-5 w-5 mr-2 text-muted-foreground" />
          No Active Boost
        </CardTitle>
        <CardDescription>
          You don't have any active profile boosts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-3 rounded-md">
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Boost your profile to increase visibility and reach more users</span>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>You have used {dailyBoostUsage} of {dailyBoostLimit} daily boosts</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostStatusCard;
