
import { ButtonProps } from "@/components/ui/button";

export interface BoostButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  onSuccess?: () => void;
  showText?: boolean;
  tooltipPlacement?: "top" | "right" | "bottom" | "left";
}
