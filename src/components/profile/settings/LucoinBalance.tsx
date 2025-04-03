
import { useAuth } from "@/contexts/AuthContext";
import { Coins } from "lucide-react";
import LucoinPackageDialog from "./LucoinPackageDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BoostProfileDialog from "./BoostProfileDialog";

interface LucoinBalanceProps {
  balance: number;
}

const LucoinBalance = ({ balance = 0 }: LucoinBalanceProps) => {
  const { refreshProfile } = useAuth();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Coins className="h-5 w-5 text-yellow-500 mr-2" />
          Lucoin Balance
        </CardTitle>
        <CardDescription>
          Use Lucoins to access premium features and services
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-3">
          <div className="text-3xl font-bold">{balance} LC</div>
          <div className="flex gap-2">
            <LucoinPackageDialog onSuccess={refreshProfile} />
            <BoostProfileDialog onSuccess={refreshProfile} />
          </div>
        </div>
        
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M8 12H16M12 8V16M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Buy Content
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M2 8.5H14.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeMiterlimit="10" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M6 16.5H8" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeMiterlimit="10" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M10.5 16.5H14.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeMiterlimit="10" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M22 12.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H14.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M20 3.5V8.5L22 6.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M20 8.5L18 6.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Subscribe
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M14.5 10.65H9.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeMiterlimit="10" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 8.21V13.21" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeMiterlimit="10" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M16.82 2H7.18C5.05 2 3.32 3.74 3.32 5.86V19.95C3.32 21.75 4.61 22.51 6.19 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Gifts
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M18.5 12.65V16.35C18.5 19.47 15.12 22 12 22C8.88 22 5.5 19.47 5.5 16.35V12.65C5.5 15.77 8.88 18.3 12 18.3C15.12 18.3 18.5 15.77 18.5 12.65Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M18.5 7.65C18.5 8.56 18.25 9.4 17.81 10.12C16.74 11.88 14.54 13 12 13C9.46 13 7.26 11.88 6.19 10.12C5.75 9.4 5.5 8.56 5.5 7.65C5.5 6.09 6.22 4.68 7.39 3.67C8.45 2.76 9.95 2.15 11.6 2.03C11.73 2.02 11.87 2.01 12 2.01C12.13 2.01 12.26 2.02 12.39 2.03C14.05 2.15 15.55 2.76 16.61 3.67C17.78 4.68 18.5 6.09 18.5 7.65Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Withdraw
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <div className="text-xs text-muted-foreground">
          Use Lucoins to boost your profile, send gifts, and access exclusive content
        </div>
      </CardFooter>
    </Card>
  );
};

export default LucoinBalance;
