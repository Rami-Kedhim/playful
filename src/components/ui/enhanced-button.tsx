
import { forwardRef } from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean
  loadingText?: string
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, children, isLoading, loadingText, disabled, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          "active:scale-95 disabled:active:scale-100",
          "hover:-translate-y-0.5 active:translate-y-0",
          className
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        )}
        <span className={cn("flex items-center gap-2", isLoading && "invisible")}>
          {children}
        </span>
      </Button>
    )
  }
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton }
