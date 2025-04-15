
"use client"

import * as React from "react"
import { Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

// This component is now just a placeholder since we're enforcing dark mode
export function ModeToggle() {
  const { theme } = useTheme();

  return (
    <Button variant="ghost" size="icon" className="cursor-default opacity-70">
      <Moon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Dark mode</span>
    </Button>
  );
}
