
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
import { Coins } from "lucide-react";

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
  const hasEnoughBalance = currentBalance >= cost;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Coins className="h-5 w-5 mr-2 text-yellow-500" />
            AI Avatar Generation Cost
          </DialogTitle>
          <DialogDescription>
            Generate your AI avatar using UBX tokens from your wallet.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Generation Cost:</span>
            <span className="font-bold text-yellow-600">{cost} UBX</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Your Balance:</span>
            <span className={`font-bold ${hasEnoughBalance ? 'text-green-600' : 'text-red-600'}`}>
              {currentBalance} UBX
            </span>
          </div>
          
          {!hasEnoughBalance && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm">
              You need {cost - currentBalance} more UBX to generate your AI avatar.
              Please recharge your account to continue.
            </div>
          )}
        </div>
        
        <DialogFooter className="flex gap-2 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          {hasEnoughBalance ? (
            <Button 
              type="button" 
              onClick={onConfirm} 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              Confirm & Generate
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={onRecharge} 
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
            >
              Recharge UBX
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UBXCostPreviewModal;
