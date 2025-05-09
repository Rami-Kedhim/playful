
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * Unified theme provider component that ensures consistent theme context across the application
 * Always uses dark theme in this implementation for consistency
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      defaultTheme="dark" 
      forcedTheme="dark" 
      enableSystem={false}
      {...props}
    >
      {children}
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
