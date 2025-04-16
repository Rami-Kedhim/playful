
import { forwardRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "hover"
  contentClassName?: string
}

const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant = "default", contentClassName, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "overflow-hidden",
          variant === "glass" && "glass-card",
          variant === "hover" && "content-card card-hover",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    )
  }
)
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn("p-6", className)}
    {...props}
  />
))
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  />
))
EnhancedCardContent.displayName = "EnhancedCardContent"

const EnhancedCardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardFooter
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  />
))
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export { 
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardContent,
  EnhancedCardFooter
}
