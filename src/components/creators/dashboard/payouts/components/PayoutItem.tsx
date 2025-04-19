import { ContentCreator } from "@/types/creator";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Clock, AlertCircle } from "lucide-react";
import PayoutMethodIcon from "./PayoutMethodIcon";

interface PayoutItemProps {
  payout: ContentCreator; // fallback type
}

const PayoutItem = ({ payout }: PayoutItemProps) => {
  const getStatusBadge = () => {
    const status = (payout as any).status;
    
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status || 'Unknown'}
          </Badge>
        );
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Unknown date';
    }
  };
  
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <PayoutMethodIcon method={(payout as any).paymentMethod || 'bank_transfer'} />
          <div className="ml-3">
            <div className="font-medium">${(payout as any).amount?.toFixed(2) || '0.00'}</div>
            <div className="text-sm text-muted-foreground">
              {formatDate((payout as any).requestedAt || new Date().toISOString())}
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          {getStatusBadge()}
        </div>
      </div>
    </Card>
  );
};

export default PayoutItem;
