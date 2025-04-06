
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useThemeToggle } from "@/hooks/useThemeToggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useThemeToggle()

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" />;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-9 w-9 transition-all hover:bg-accent relative"
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5 overflow-hidden">
              <motion.div
                initial={{ opacity: isDark ? 0 : 1, y: isDark ? -20 : 0 }}
                animate={{ opacity: isDark ? 0 : 1, y: isDark ? -20 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="h-5 w-5" />
              </motion.div>
              <motion.div
                initial={{ opacity: isDark ? 1 : 0, y: isDark ? 0 : 20 }}
                animate={{ opacity: isDark ? 1 : 0, y: isDark ? 0 : 20 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
