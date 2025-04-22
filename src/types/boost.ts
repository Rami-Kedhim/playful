
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  price_ubx?: number;
  price_lucoin?: number;
  boost_type?: string;
  duration: string;
  is_active?: boolean;
}

export interface BoostResult {
  success: boolean;
  message?: string;
  expiry?: string;
  transactionId?: string;
}

export interface ActiveBoost {
  id: string;
  user_id: string;
  package_id: string;
  start_time: string;
  end_time: string;
  status: string;
}

export interface BoostStats {
  totalActiveBoosts: number;
  totalBoostsPurchased: number;
  avgBoostDuration: string;
}
