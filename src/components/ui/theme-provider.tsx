
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  
  // Ensure mounting state is tracked for client-side rendering
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <NextThemesProvider 
      defaultTheme="dark" 
      forcedTheme="dark"
      {...props}
    >
      {mounted && children}
    </NextThemesProvider>
  )
}

// Add useTheme export for compatibility
export const useTheme = () => {
  return {
    theme: "dark",
    setTheme: () => {}, // No-op function since we're forcing dark mode
    resolvedTheme: "dark",
    systemTheme: "dark",
  }
}
