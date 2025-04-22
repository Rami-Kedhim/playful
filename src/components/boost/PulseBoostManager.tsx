import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { usePulseBoost } from "@/hooks/boost/usePulseBoost";
import { PULSE_BOOSTS } from "@/constants/pulseBoostConfig";
import { AlertCircle, ChevronRight, Clock, Zap } from "lucide-react";
import PulseBoostCard from "./PulseBoostCard";
import { formatDistanceToNow } from "date-fns";
import UBXWallet from "../wallet/UBXWallet";
import { PulseBoost } from "@/types/boost";

interface PulseBoostManagerProps {
  profileId?: string;
}

const PulseBoostManager = ({ profileId }: PulseBoostManagerProps) => {
  const { 
    isLoading,
    error,
    userEconomy,
    purchaseBoost,
    cancelBoost,
    activeBoosts,
    enhancedBoostStatus,
    pulseBoostPackages
  } = usePulseBoost(profileId);

  const convertedBoosts: PulseBoost[] = pulseBoostPackages.map(boost => ({
    id: boost.id,
    name: boost.name,
    description: boost.description,
    durationMinutes: 24 * 60, // Default to 24 hours (24 * 60 minutes)
    visibility: boost.id === 'basic' ? 'homepage' : 
               boost.id === 'premium' ? 'search' : 'global',
    costUBX: boost.price_ubx || boost.price,
    badgeColor: boost.color
  }));

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const activeBoostIds = activeBoosts.map(boost => boost.boostId);

  return (
    <div className="space-y-6">
      {/* Current boost status */}
      {enhancedBoostStatus.isActive && (
        <Card className="bg-primary/5 border-primary/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" /> 
                Active Boost
              </CardTitle>
              {enhancedBoostStatus.pulseData && (
                <Badge style={{ backgroundColor: PULSE_BOOSTS.find(b => b.name === enhancedBoostStatus.pulseData?.boostType)?.color }}>
                  {enhancedBoostStatus.pulseData.boostType}
                </Badge>
              )}
            </div>
            <CardDescription>
              Your profile is currently boosted and receiving extra visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Time Remaining</div>
                  <div className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-amber-500" />
                    {enhancedBoostStatus.remainingTime || formatDistanceToNow(enhancedBoostStatus.endTime || new Date())}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Visibility</div>
                  <div className="font-medium">
                    {enhancedBoostStatus.pulseData?.visibility || "Standard"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Wallet balance */}
      <UBXWallet compact={false} showRefresh={true} showHistory={false} />
      
      <Tabs defaultValue="available">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="available">Available Boosts</TabsTrigger>
          <TabsTrigger value="active">Active Boosts ({activeBoosts.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-4">
          {!activeBoosts.length && !enhancedBoostStatus.isActive ? (
            <Alert className="mb-4">
              <Zap className="h-4 w-4" />
              <AlertTitle>No Active Boosts</AlertTitle>
              <AlertDescription>
                Activate a Pulse Boost below to increase your profile visibility
              </AlertDescription>
            </Alert>
          ) : null}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {convertedBoosts.map((boost) => (
              <PulseBoostCard
                key={boost.id}
                boost={boost}
                isActive={activeBoostIds.includes(boost.id)}
                timeRemaining={activeBoosts.find(ab => ab.boostId === boost.id)?.timeRemaining}
                onActivate={(boostId) => {
                  const boostPackage = pulseBoostPackages.find(b => b.id === boostId);
                  return boostPackage ? purchaseBoost(boostPackage) : Promise.resolve(false);
                }}
                onCancel={cancelBoost}
                userBalance={userEconomy?.ubxBalance || 0}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          {activeBoosts.length === 0 ? (
            <div className="text-center py-8 border rounded-lg">
              <Zap className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
              <h3 className="text-lg font-medium mb-1">No Active Boosts</h3>
              <p className="text-muted-foreground">
                You don't have any active boosts at the moment
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeBoosts.map((activeBoost) => {
                const pulseBoost: PulseBoost = {
                  id: activeBoost.boostId,
                  name: activeBoost.boostDetails?.name || 'Unknown Boost',
                  durationMinutes: 24 * 60, // Default to 24 hours
                  visibility: 'homepage',
                  costUBX: activeBoost.boostDetails?.price || 0,
                  description: activeBoost.boostDetails?.description,
                  badgeColor: activeBoost.boostDetails?.color
                };
                
                return (
                  <PulseBoostCard
                    key={`${activeBoost.boostId}-${activeBoost.startedAt.toISOString()}`}
                    boost={pulseBoost}
                    isActive={true}
                    timeRemaining={activeBoost.timeRemaining}
                    onCancel={cancelBoost}
                  />
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PulseBoostManager;
