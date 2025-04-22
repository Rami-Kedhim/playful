
export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_lucoin?: number;
  duration: string;
  features?: string[];
  durationMinutes?: number;
  costUBX?: number;
}

// Additional interfaces used in our components
export interface BoostProfileDialogProps {
  profileId?: string;
  onSuccess?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
}

export interface BoostAnalytics {
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  interactions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  rank: {
    current: number;
    previous: number;
    change: number;
  };
  trending: boolean;
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
  clicks: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
}
