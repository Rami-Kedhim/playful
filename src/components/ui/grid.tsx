
import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  cols?: number;
  gap?: number;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, children, cols = 3, gap = 4, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "grid",
          `grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols} gap-${gap}`,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Grid.displayName = "Grid"

export default Grid
