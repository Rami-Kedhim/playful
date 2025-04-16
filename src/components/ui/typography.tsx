
import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps {
  className?: string;
  children?: React.ReactNode;
}

export const H1 = ({ className, children, ...props }: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1 
      className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} 
      {...props}
    >
      {children}
    </h1>
  )
}

export const H2 = ({ className, children, ...props }: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2 
      className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight", className)} 
      {...props}
    >
      {children}
    </h2>
  )
}

export const H3 = ({ className, children, ...props }: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3 
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} 
      {...props}
    >
      {children}
    </h3>
  )
}

export const H4 = ({ className, children, ...props }: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h4 
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} 
      {...props}
    >
      {children}
    </h4>
  )
}

export const Paragraph = ({ className, children, ...props }: TypographyProps & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p 
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} 
      {...props}
    >
      {children}
    </p>
  )
}

export const Muted = ({ className, children, ...props }: TypographyProps & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p 
      className={cn("text-sm text-muted-foreground", className)} 
      {...props}
    >
      {children}
    </p>
  )
}

export const SectionTitle = ({ 
  title, 
  description,
  className
}: { 
  title: string; 
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("space-y-1", className)}>
      <H3>{title}</H3>
      {description && <Muted>{description}</Muted>}
    </div>
  )
}
