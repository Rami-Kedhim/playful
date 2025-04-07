
import { useEffect, useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  AlertCircle,
  Eye, 
  Ear, 
  Hand,
  MessageCircle, 
  ShieldCheck, 
  Heart,
  ArrowRight,
  Award,
  BarChart3,
  TrendingUp,
  Users
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  InfluencePhase, 
  SensoryPreference,
  InfluenceTechnique
} from '@/types/chaseHughes';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ChaseHughesPanel = () => {
  const { assessment, isGenerating, generateAssessment } = useAssessment();
  const [strategySummary, setStrategySummary] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<InfluenceTechnique | null>(null);
  
  useEffect(() => {
    // Generate assessment if it doesn't exist
    if (!assessment && !isGenerating) {
      generateAssessment();
    }
  }, [assessment, isGenerating, generateAssessment]);
  
  // Format phase name for display
  const formatPhaseName = (phase: InfluencePhase | undefined) => {
    if (!phase) return 'Unknown';
    
    return phase.charAt(0).toUpperCase() + phase.slice(1);
  };
  
  // Get sensory preference icon
  const getSensoryIcon = (preference: SensoryPreference | undefined) => {
    if (!preference) return <AlertCircle className="h-5 w-5" />;
    
    switch (preference) {
      case 'visual':
        return <Eye className="h-5 w-5" />;
      case 'auditory':
        return <Ear className="h-5 w-5" />;
      case 'kinesthetic':
        return <Hand className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };
  
  // Get phase icon
  const getPhaseIcon = (phase: InfluencePhase | undefined) => {
    if (!phase) return <AlertCircle className="h-5 w-5" />;
    
    switch (phase) {
      case 'interest':
        return <MessageCircle className="h-5 w-5" />;
      case 'trust':
        return <ShieldCheck className="h-5 w-5" />;
      case 'desire':
        return <Heart className="h-5 w-5" />;
      case 'action':
        return <ArrowRight className="h-5 w-5" />;
      case 'loyalty':
        return <Award className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };
  
  // Get technique description
  const getTechniqueDescription = (technique: InfluenceTechnique) => {
    switch (technique) {
      case 'interrogation_encapsulation':
        return "Uses emotionally engaging questions to build unconscious trust and persuasion";
        
      case 'bte_mapping':
        return "Maps and matches user's sensory language preferences (visual/auditory/kinesthetic)";
        
      case 'yes_ladder':
        return "Series of small agreements that lead to larger commitments";
        
      case 'reciprocity_trigger':
        return "Creates a sense of obligation by giving something of value first";
        
      case 'social_proof':
        return "Uses evidence of others' actions to guide behavior";
        
      case 'commitment_consistency':
        return "Once committed to an idea, people tend to honor that commitment";
        
      case 'authority_positioning':
        return "Establishes credibility through expertise and authority markers";
        
      case 'scarcity_framing':
        return "Increases perceived value through limited availability";
        
      case 'likeability_enhancement':
        return "Builds rapport and connection through similarity and compliments";
        
      default:
        return "Advanced influence technique";
    }
  };
  
  // Show technique details dialog
  const showTechniqueDetails = (technique: InfluenceTechnique) => {
    setSelectedTechnique(technique);
    setDialogOpen(true);
  };
  
  // If no assessment data is available yet
  if (!assessment?.chaseHughesProfile) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Chase Hughes Influence Analysis</CardTitle>
            <CardDescription>
              Advanced behavioral influence assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-6">
            {isGenerating ? (
              <p>Analyzing behavior patterns and generating influence strategy...</p>
            ) : (
              <p>No influence analysis data is available yet. Generate an assessment to see results.</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => generateAssessment()} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Assessment"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const { 
    primarySensoryPreference, 
    secondarySensoryPreference,
    currentInfluencePhase,
    influencePhaseProgress,
    detectedMicroExpressions,
    responsiveToTechniques,
    suggestedApproach,
    trustScore,
    desireScore,
    engagementScore
  } = assessment.chaseHughesProfile;
  
  return (
    <div className="space-y-6">
      {/* Influence Phase Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {getPhaseIcon(currentInfluencePhase)}
            <span className="ml-2">Current Influence Phase: {formatPhaseName(currentInfluencePhase)}</span>
          </CardTitle>
          <CardDescription>
            Chase Hughes' Chain of Influence progression analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Progress in {formatPhaseName(currentInfluencePhase)} phase</span>
                <span>{influencePhaseProgress}%</span>
              </div>
              <Progress value={influencePhaseProgress} className="h-2" />
            </div>
            
            {/* Chain of Influence visualization */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex flex-col items-center max-w-[70px]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentInfluencePhase === 'interest' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1 text-center">Interest</span>
              </div>
              <div className={`h-0.5 flex-1 ${currentInfluencePhase === 'interest' ? 'bg-muted' : 'bg-primary'}`}></div>
              
              <div className="flex flex-col items-center max-w-[70px]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentInfluencePhase === 'trust' ? 'bg-primary text-primary-foreground' : currentInfluencePhase === 'interest' ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'}`}>
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1 text-center">Trust</span>
              </div>
              <div className={`h-0.5 flex-1 ${currentInfluencePhase === 'interest' || currentInfluencePhase === 'trust' ? 'bg-muted' : 'bg-primary'}`}></div>
              
              <div className="flex flex-col items-center max-w-[70px]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentInfluencePhase === 'desire' ? 'bg-primary text-primary-foreground' : currentInfluencePhase === 'action' || currentInfluencePhase === 'loyalty' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Heart className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1 text-center">Desire</span>
              </div>
              <div className={`h-0.5 flex-1 ${currentInfluencePhase === 'interest' || currentInfluencePhase === 'trust' || currentInfluencePhase === 'desire' ? 'bg-muted' : 'bg-primary'}`}></div>
              
              <div className="flex flex-col items-center max-w-[70px]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentInfluencePhase === 'action' ? 'bg-primary text-primary-foreground' : currentInfluencePhase === 'loyalty' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <ArrowRight className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1 text-center">Action</span>
              </div>
              <div className={`h-0.5 flex-1 ${currentInfluencePhase === 'loyalty' ? 'bg-primary' : 'bg-muted'}`}></div>
              
              <div className="flex flex-col items-center max-w-[70px]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentInfluencePhase === 'loyalty' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1 text-center">Loyalty</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Sensory Preference Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {getSensoryIcon(primarySensoryPreference)}
            <span className="ml-2">Behavioral Table of Elements (BTE)</span>
          </CardTitle>
          <CardDescription>
            Chase Hughes' sensory language pattern analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h4 className="text-lg font-medium">Primary Sensory System</h4>
              <div className="flex items-center mt-2 gap-2">
                {getSensoryIcon(primarySensoryPreference)}
                <span className="capitalize">{primarySensoryPreference}</span>
              </div>
              <p className="text-sm mt-1 text-muted-foreground">
                {primarySensoryPreference === 'visual'
                  ? "Processes information primarily through visual cues and imagery"
                  : primarySensoryPreference === 'auditory'
                  ? "Responds best to sound, rhythm, and verbal communication"
                  : "Connects through feelings, touch, and physical sensations"}
              </p>
            </div>
            
            {secondarySensoryPreference && (
              <div className="flex-1">
                <h4 className="text-lg font-medium">Secondary Sensory System</h4>
                <div className="flex items-center mt-2 gap-2">
                  {getSensoryIcon(secondarySensoryPreference)}
                  <span className="capitalize">{secondarySensoryPreference}</span>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">
                  {secondarySensoryPreference === 'visual'
                    ? "Also responds to visual elements and imagery"
                    : secondarySensoryPreference === 'auditory'
                    ? "Has significant response to audio and verbal cues"
                    : "Secondary connection through physical sensations"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Behavioral Scores Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Behavioral Metrics
          </CardTitle>
          <CardDescription>Key behavioral indicators from Chase Hughes analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Trust Score</span>
                <span className="text-sm">{trustScore}%</span>
              </div>
              <Progress value={trustScore} className="h-2" />
              <p className="text-xs mt-1 text-muted-foreground">
                {trustScore < 40 
                  ? "Trust building required before advancing" 
                  : trustScore < 70 
                  ? "Moderate trust established, continue building" 
                  : "Strong trust foundation established"}
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Desire Score</span>
                <span className="text-sm">{desireScore}%</span>
              </div>
              <Progress value={desireScore} className="h-2" />
              <p className="text-xs mt-1 text-muted-foreground">
                {desireScore < 40 
                  ? "Low interest level in offerings" 
                  : desireScore < 70 
                  ? "Moderate interest in specific solutions" 
                  : "High desire and readiness to convert"}
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Engagement Score</span>
                <span className="text-sm">{engagementScore}%</span>
              </div>
              <Progress value={engagementScore} className="h-2" />
              <p className="text-xs mt-1 text-muted-foreground">
                {engagementScore < 40 
                  ? "Limited engagement with content" 
                  : engagementScore < 70 
                  ? "Moderate engagement across touchpoints" 
                  : "High engagement with multiple content types"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Responsive Techniques Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Responsive Influence Techniques
          </CardTitle>
          <CardDescription>
            Chase Hughes' behavioral influence techniques that are effective for this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {responsiveToTechniques.map((technique) => (
              <Button 
                key={technique} 
                variant="outline" 
                className="justify-start h-auto py-2 px-3"
                onClick={() => showTechniqueDetails(technique)}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="capitalize">{technique.replace(/_/g, ' ')}</span>
                  <span className="text-xs text-muted-foreground mt-1 truncate w-full">
                    {getTechniqueDescription(technique).substring(0, 30)}...
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Suggested Approach Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Recommended Influence Strategy
          </CardTitle>
          <CardDescription>
            Optimal approach based on Chase Hughes influence framework
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Recommended Technique</h4>
            <Badge className="mt-1 capitalize">{suggestedApproach.technique.replace(/_/g, ' ')}</Badge>
            <p className="text-sm mt-2">{getTechniqueDescription(suggestedApproach.technique)}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">Suggested Language Pattern</h4>
            <p className="mt-1 text-sm p-3 bg-muted rounded-md italic">
              "{suggestedApproach.languagePattern}"
            </p>
          </div>
          
          {suggestedApproach.visualCues && (
            <div>
              <h4 className="text-sm font-medium">Visual Elements</h4>
              <ul className="mt-1 text-sm list-disc pl-5 space-y-1">
                {suggestedApproach.visualCues.map((cue, index) => (
                  <li key={index}>{cue}</li>
                ))}
              </ul>
            </div>
          )}
          
          {suggestedApproach.audioElements && (
            <div>
              <h4 className="text-sm font-medium">Audio Elements</h4>
              <ul className="mt-1 text-sm list-disc pl-5 space-y-1">
                {suggestedApproach.audioElements.map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => setStrategySummary(
            `Based on Chase Hughes influence analysis, the user is in the ${currentInfluencePhase} phase (${influencePhaseProgress}% complete) with a primary ${primarySensoryPreference} sensory preference. The recommended approach is to use the ${suggestedApproach.technique.replace(/_/g, ' ')} technique with language patterns that match their sensory preference.`
          )} variant="outline" className="w-full">
            Generate Strategy Summary
          </Button>
        </CardFooter>
      </Card>
      
      {/* Strategy Summary Display */}
      {strategySummary && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Influence Strategy Summary</CardTitle>
            <CardDescription>Complete Chase Hughes behavioral influence approach</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{strategySummary}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Technique Details Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="capitalize">
              {selectedTechnique?.replace(/_/g, ' ')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedTechnique && (
                <>
                  <p className="mb-4">{getTechniqueDescription(selectedTechnique)}</p>
                  
                  <div className="text-sm space-y-2 text-foreground">
                    <h4 className="font-medium">How to Apply:</h4>
                    {selectedTechnique === 'interrogation_encapsulation' && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Frame persuasive content within emotionally engaging questions</li>
                        <li>Use "Have you ever noticed how..." pattern to bypass resistance</li>
                        <li>Ask questions that presuppose the desired outcome</li>
                        <li>End sequences with questions that prompt agreement</li>
                      </ul>
                    )}
                    
                    {selectedTechnique === 'bte_mapping' && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>For visual users: Use "see", "picture", "imagine", "view"</li>
                        <li>For auditory users: Use "hear", "sounds like", "listen", "resonates"</li>
                        <li>For kinesthetic: Use "feel", "grasp", "handle", "connect"</li>
                        <li>Match communication style to their primary sensory preference</li>
                      </ul>
                    )}
                    
                    {selectedTechnique === 'yes_ladder' && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Start with small, easy-to-agree-with statements</li>
                        <li>Gradually increase commitment level with each agreement</li>
                        <li>End with the target request after 3-5 agreements</li>
                        <li>Each "yes" increases likelihood of final agreement</li>
                      </ul>
                    )}
                    
                    {selectedTechnique === 'reciprocity_trigger' && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Provide value up front before making requests</li>
                        <li>Give unexpected bonuses or extras to create obligation</li>
                        <li>Personalize the value offered to increase effectiveness</li>
                        <li>Time requests to follow shortly after providing value</li>
                      </ul>
                    )}
                    
                    {selectedTechnique === 'social_proof' && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Highlight behaviors of similar others</li>
                        <li>Use testimonials and case studies from peers</li>
                        <li>Emphasize popularity and widespread adoption</li>
                        <li>Feature reviews and ratings prominently</li>
                      </ul>
                    )}
                    
                    {selectedTechnique === 'commitment_consistency' && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Obtain small initial commitments in writing or publicly</li>
                        <li>Reference past statements and actions</li>
                        <li>Frame new requests as consistent with established identity</li>
                        <li>Use "since you already..." pattern to connect actions</li>
                      </ul>
                    )}
                    
                    {selectedTechnique === 'authority_positioning' && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Display credentials and expertise prominently</li>
                        <li>Reference trusted authorities and expert opinions</li>
                        <li>Use specialized language appropriately</li>
                        <li>Demonstrate knowledge depth in specific areas</li>
                      </ul>
                    )}
                    
                    {selectedTechnique === 'scarcity_framing' && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Highlight limited availability or time constraints</li>
                        <li>Emphasize unique features not available elsewhere</li>
                        <li>Create legitimate exclusivity around offers</li>
                        <li>Focus on potential loss rather than gain</li>
                      </ul>
                    )}
                    
                    {selectedTechnique === 'likeability_enhancement' && (
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Find and emphasize genuine similarities</li>
                        <li>Offer specific, sincere compliments</li>
                        <li>Express authentic interest in their concerns</li>
                        <li>Use appropriate self-disclosure to build connection</li>
                      </ul>
                    )}
                  </div>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction>Apply Technique</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChaseHughesPanel;
