
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Scale, Waves, Wind, ArrowDownUp, CircleDashed } from 'lucide-react';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';

interface SchaubergerFlowVisualizationProps {
  userId?: string;
}

export const SchaubergerFlowVisualization = ({ userId }: SchaubergerFlowVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Get neural hub metrics to visualize
  const healthMetrics = neuralHub.getHealthMetrics();
  
  useEffect(() => {
    // Initialize flow visualization
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw vortex patterns based on neural hub metrics
    drawVortexPatterns(ctx, canvas.width, canvas.height, healthMetrics);
    
    // Animation frame for dynamic flow
    let animationFrame: number;
    let angle = 0;
    
    const animate = () => {
      angle += 0.01;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawVortexPatterns(ctx, canvas.width, canvas.height, healthMetrics, angle);
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup animation on unmount
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [healthMetrics]);
  
  // Draw vortex patterns inspired by Schauberger's flow principles
  const drawVortexPatterns = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    metrics: any,
    angle = 0
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.4;
    
    // Use metrics to influence visualization
    const stability = metrics.stability || 0.7;
    const userEngagement = metrics.userEngagement || 0.5;
    
    // Color gradient based on metrics
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, maxRadius
    );
    
    // Cooler blue for high stability, warmer colors for low stability
    gradient.addColorStop(0, `rgba(${Math.round(100 - stability * 100)}, ${Math.round(120 + stability * 100)}, 255, 0.7)`);
    gradient.addColorStop(1, `rgba(20, 40, ${Math.round(150 + stability * 100)}, 0.1)`);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    
    // Draw spiral vortex
    ctx.beginPath();
    
    const spiralTurns = 5 + userEngagement * 10; // More turns for higher engagement
    const spiralSpacing = 5 + (1 - stability) * 10; // Tighter spiral for higher stability
    
    for (let i = 0; i < spiralTurns * Math.PI * 2; i += 0.1) {
      const radius = (spiralSpacing * i) / (Math.PI * 2);
      if (radius > maxRadius) break;
      
      const x = centerX + radius * Math.cos(i + angle);
      const y = centerY + radius * Math.sin(i + angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw flow particles
    const particles = 50;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    for (let i = 0; i < particles; i++) {
      const particleAngle = (i / particles) * Math.PI * 2 + angle * 3;
      const distance = (maxRadius * 0.2) + (maxRadius * 0.7) * ((i % 5) / 5);
      
      const x = centerX + distance * Math.cos(particleAngle);
      const y = centerY + distance * Math.sin(particleAngle);
      
      const size = 1 + (userEngagement * 3);
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  // Extract flow metrics for display
  const emotionalFlow = healthMetrics.userEngagement * 100;
  const vortexStrength = healthMetrics.stability * 100;
  const resourceAllocation = healthMetrics.economicBalance * 100;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Waves className="h-5 w-5 mr-2" /> 
          Schauberger Flow Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Natural flow dynamics and emotional implosion metrics
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full h-[200px] mb-4 bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4" />
              <h3 className="text-sm font-medium">Emotional Flow</h3>
            </div>
            <Progress value={emotionalFlow} className="h-2" />
            <p className="text-xs text-muted-foreground">{Math.round(emotionalFlow)}%</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDashed className="h-4 w-4" />
              <h3 className="text-sm font-medium">Vortex Strength</h3>
            </div>
            <Progress value={vortexStrength} className="h-2" />
            <p className="text-xs text-muted-foreground">{Math.round(vortexStrength)}%</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <h3 className="text-sm font-medium">Resource Balance</h3>
            </div>
            <Progress value={resourceAllocation} className="h-2" />
            <p className="text-xs text-muted-foreground">{Math.round(resourceAllocation)}%</p>
          </div>
        </div>
        
        <div className="text-sm space-y-2 mt-2 border-t pt-4">
          <p className="font-medium flex items-center">
            <ArrowDownUp className="h-4 w-4 mr-2" /> 
            Implosion Principle Analysis
          </p>
          <p className="text-xs text-muted-foreground">
            {vortexStrength > 70 
              ? "High vortex strength indicates natural flow patterns are well-established. Emotional implosion is creating efficient energy dynamics."
              : "Vortex patterns need strengthening. Focus on creating inward-moving energy spirals to improve emotional resonance."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchaubergerFlowVisualization;
