
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, Share2, DollarSign } from "lucide-react";

interface AnalyticsSummaryProps {
  views: number;
  likes: number;
  shares: number;
  earnings: number;
  loading?: boolean;
}

const AnalyticsSummary = ({
  views,
  likes,
  shares,
  earnings,
  loading = false
}: AnalyticsSummaryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className={loading ? "opacity-70 animate-pulse" : ""}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? "..." : views.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Unique views on your content
          </p>
        </CardContent>
      </Card>
      
      <Card className={loading ? "opacity-70 animate-pulse" : ""}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? "..." : likes.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Likes received on your content
          </p>
        </CardContent>
      </Card>
      
      <Card className={loading ? "opacity-70 animate-pulse" : ""}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
          <Share2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? "..." : shares.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Times your content was shared
          </p>
        </CardContent>
      </Card>
      
      <Card className={loading ? "opacity-70 animate-pulse" : ""}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : `${earnings.toFixed(2)} LC`}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Lucoin earnings from content
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSummary;
