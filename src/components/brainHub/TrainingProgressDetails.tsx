
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { AlertTriangle, CheckCircle, Clock, Brain, ChartLine } from "lucide-react";
import { TrainingProgress } from '@/services/neural/types/neuralHub';

interface TrainingProgressDetailsProps {
  trainingJob: TrainingProgress;
  onStopTraining: (modelId: string) => void;
  modelName?: string;
}

const TrainingProgressDetails: React.FC<TrainingProgressDetailsProps> = ({ 
  trainingJob, 
  onStopTraining,
  modelName = "Neural Model"
}) => {
  // Generate mock accuracy history data
  const generateAccuracyHistory = () => {
    const data = [];
    const startAccuracy = trainingJob.accuracy - (trainingJob.currentEpoch * 0.03);
    const baseAccuracy = Math.max(0.4, startAccuracy);
    
    for (let i = 0; i <= trainingJob.currentEpoch; i++) {
      const accuracy = baseAccuracy + (i * ((trainingJob.accuracy - baseAccuracy) / trainingJob.currentEpoch));
      data.push({
        epoch: i,
        accuracy: Number((accuracy).toFixed(4)),
        target: Number(trainingJob.targetAccuracy.toFixed(4))
      });
    }
    return data;
  };

  const accuracyHistory = generateAccuracyHistory();
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getStatusColor = () => {
    switch (trainingJob.status) {
      case 'training': return "bg-blue-500";
      case 'completed': return "bg-green-500";
      case 'failed': return "bg-red-500";
      case 'stopped': return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (trainingJob.status) {
      case 'training': return "In Progress";
      case 'completed': return "Completed";
      case 'failed': return "Failed";
      case 'stopped': return "Stopped";
      default: return trainingJob.status;
    }
  };
  
  const getEstimatedTimeRemaining = () => {
    if (trainingJob.status !== 'training') return 'N/A';
    
    const now = new Date();
    const estCompletion = new Date(trainingJob.estimatedCompletionTime);
    const diffMs = estCompletion.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Completing soon...';
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffSecs = Math.floor((diffMs % 60000) / 1000);
    
    return `${diffMins}m ${diffSecs}s`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            {modelName} Training
          </CardTitle>
          <div className="flex items-center mt-1">
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
            <span className="ml-2 text-xs text-muted-foreground">
              Started: {formatTime(trainingJob.startTime)}
            </span>
          </div>
        </div>
        
        {trainingJob.status === 'training' && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onStopTraining(trainingJob.modelId)}
          >
            Stop Training
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="ml-2 text-xs bg-primary/10 text-primary py-0.5 px-2 rounded-full">
                Epoch {trainingJob.currentEpoch} of {trainingJob.totalEpochs}
              </span>
            </div>
            <span className="text-sm font-medium">{trainingJob.progress}%</span>
          </div>
          <Progress value={trainingJob.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Current Accuracy</span>
            <div className="font-medium text-lg">{(trainingJob.accuracy * 100).toFixed(1)}%</div>
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground">Target Accuracy</span>
            <div className="font-medium text-lg">{(trainingJob.targetAccuracy * 100).toFixed(1)}%</div>
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground">Time Remaining</span>
            <div className="font-medium">{getEstimatedTimeRemaining()}</div>
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground">Status</span>
            <div className="font-medium flex items-center">
              {trainingJob.status === 'training' && <Clock className="h-4 w-4 mr-1 text-blue-500" />}
              {trainingJob.status === 'completed' && <CheckCircle className="h-4 w-4 mr-1 text-green-500" />}
              {trainingJob.status === 'failed' && <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />}
              {getStatusText()}
            </div>
          </div>
        </div>
        
        {trainingJob.message && (
          <div className={`text-sm p-2 rounded ${
            trainingJob.status === 'failed' ? 'bg-red-50 text-red-700' : 
            trainingJob.status === 'completed' ? 'bg-green-50 text-green-700' : 
            'bg-blue-50 text-blue-700'
          }`}>
            {trainingJob.message}
          </div>
        )}
        
        {trainingJob.error && (
          <div className="flex items-start text-sm text-red-500 bg-red-50 p-2 rounded">
            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
            <span>{trainingJob.error}</span>
          </div>
        )}
        
        <div className="pt-4">
          <div className="flex items-center mb-2">
            <ChartLine className="h-4 w-4 mr-1 text-primary" />
            <span className="text-sm font-medium">Accuracy Progression</span>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={accuracyHistory}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="epoch" 
                  label={{ value: 'Epoch', position: 'insideBottomRight', offset: -10 }} 
                />
                <YAxis 
                  domain={[0, 1]} 
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value) => `${(Number(value) * 100).toFixed(1)}%`}
                  labelFormatter={(label) => `Epoch ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#3b82f6" 
                  name="Current Accuracy" 
                  strokeWidth={2} 
                  dot={{ r: 1 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10b981" 
                  name="Target Accuracy"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingProgressDetails;
