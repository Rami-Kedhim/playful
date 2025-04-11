
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, AlertCircle } from "lucide-react";

interface UBXCostPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onRecharge: () => void;
  cost: number;
  currentBalance: number;
}

const UBXCostPreviewModal: React.FC<UBXCostPreviewModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onRecharge,
  cost,
  currentBalance,
}) => {
  const hasSufficientBalance = currentBalance >= cost;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Coins className="h-5 w-5 mr-2 text-yellow-500" />
            UBX Token Cost Preview
          </DialogTitle>
          <DialogDescription>
            Review the UBX token cost for this operation.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-gray-100 p-4 rounded-full">
              <Coins className="h-10 w-10 text-yellow-500" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">Cost: {cost} UBX</p>
              <p className="text-sm text-gray-500">Your balance: {currentBalance} UBX</p>
            </div>

            {!hasSufficientBalance && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 w-full">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800 font-medium">Insufficient Balance</p>
                    <p className="text-xs text-amber-700">
                      You need {cost - currentBalance} more UBX tokens to complete this action.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          {!hasSufficientBalance ? (
            <Button 
              onClick={onRecharge} 
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500"
            >
              Recharge UBX Tokens
            </Button>
          ) : (
            <Button 
              onClick={onConfirm} 
              className="w-full"
            >
              Confirm ({cost} UBX)
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UBXCostPreviewModal;
