
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useThemeToggle } from "@/hooks/useThemeToggle"

export function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useThemeToggle()

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full h-9 w-9"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-all" />
      ) : (
        <Moon className="h-5 w-5 transition-all" />
      )}
    </Button>
  )
}
