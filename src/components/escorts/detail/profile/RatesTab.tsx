
import { Escort } from "@/types/escort";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface RatesTabProps {
  escort: Escort;
}

const RatesTab = ({ escort }: RatesTabProps) => {
  const hasAdditionalRates = escort.rates?.twoHours || escort.rates?.overnight || escort.rates?.weekend;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Rates</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-secondary/10 border-secondary/20">
          <CardContent className="p-4">
            <h4 className="font-medium text-muted-foreground mb-1">1 Hour</h4>
            <p className="text-2xl font-bold text-primary">{escort.rates?.hourly || escort.price} LC</p>
          </CardContent>
        </Card>
        
        {escort.rates?.twoHours && (
          <Card className="bg-secondary/10 border-secondary/20">
            <CardContent className="p-4">
              <h4 className="font-medium text-muted-foreground mb-1">2 Hours</h4>
              <p className="text-2xl font-bold text-primary">{escort.rates.twoHours} LC</p>
            </CardContent>
          </Card>
        )}
        
        {escort.rates?.overnight && (
          <Card className="bg-secondary/10 border-secondary/20">
            <CardContent className="p-4">
              <h4 className="font-medium text-muted-foreground mb-1">Overnight</h4>
              <p className="text-2xl font-bold text-primary">{escort.rates.overnight} LC</p>
            </CardContent>
          </Card>
        )}
        
        {escort.rates?.weekend && (
          <Card className="bg-secondary/10 border-secondary/20">
            <CardContent className="p-4">
              <h4 className="font-medium text-muted-foreground mb-1">Weekend</h4>
              <p className="text-2xl font-bold text-primary">{escort.rates.weekend} LC</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {!hasAdditionalRates && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info size={16} />
          <p>Contact for additional rates and special packages</p>
        </div>
      )}
      
      <Card className="border-dashed bg-transparent">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2">Payment Methods</h4>
          <p className="text-sm text-muted-foreground">
            Cash, LuCoin, and major credit cards accepted. Payment must be made at the beginning of our meeting.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RatesTab;
