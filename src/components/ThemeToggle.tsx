
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { mounted } = useThemeToggle();

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
            className="rounded-full h-9 w-9 transition-all hover:bg-accent relative cursor-default"
            aria-label="Dark mode enabled"
          >
            <div className="relative w-5 h-5">
              <Moon className="h-5 w-5" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Dark mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeToggle;
