
/**
 * Utility functions for validating payout form data
 */

export const validateAmount = (amount: number, availableAmount: number): boolean => {
  return amount > 0 && amount <= availableAmount;
};

export const validateBankTransferDetails = (details: Record<string, string>): boolean => {
  return (
    details.accountName.trim() !== "" &&
    details.accountNumber.trim() !== "" &&
    details.bankName.trim() !== ""
  );
};

export const validatePaypalDetails = (details: Record<string, string>): boolean => {
  return details.paypalEmail?.trim() !== "";
};

export const validateCryptoDetails = (details: Record<string, string>): boolean => {
  return details.walletAddress?.trim() !== "";
};

export const isFormValid = (
  amount: number,
  availableAmount: number,
  payoutMethod: string,
  details: Record<string, string>
): boolean => {
  if (!validateAmount(amount, availableAmount)) {
    return false;
  }

  switch (payoutMethod) {
    case "bank_transfer":
      return validateBankTransferDetails(details);
    case "paypal":
      return validatePaypalDetails(details);
    case "crypto":
      return validateCryptoDetails(details);
    default:
      return true;
  }
};
