
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Ear, Eye, BarChart3, Hand, Heart, ShieldCheck } from 'lucide-react';
import { ChaseHughesBehavioralProfile, InfluenceTechnique, SensoryPreference, InfluencePhase } from '@/types/chaseHughes';

interface ChaseHughesInfluencePanelProps {
  profile?: ChaseHughesBehavioralProfile;
  isLoading?: boolean;
}

const ChaseHughesInfluencePanel = ({ profile, isLoading = false }: ChaseHughesInfluencePanelProps) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Brain className="h-5 w-5 mr-2" /> 
            Chase Hughes Influence Analysis
          </CardTitle>
          <CardDescription>
            Loading behavioral analysis...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Brain className="h-5 w-5 mr-2" /> 
            Chase Hughes Influence Analysis
          </CardTitle>
          <CardDescription>
            No behavioral profile data available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            Run an assessment to generate behavioral insights
          </div>
        </CardContent>
      </Card>
    );
  }

  // Helper function to get icon for sensory preference
  const getSensoryIcon = (type: SensoryPreference) => {
    switch (type) {
      case 'visual':
        return <Eye className="h-5 w-5" />;
      case 'auditory':
        return <Ear className="h-5 w-5" />;
      case 'kinesthetic':
        return <Hand className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  // Helper function to get phase color
  const getPhaseColor = (phase: InfluencePhase) => {
    switch (phase) {
      case 'interest':
        return 'bg-blue-500/20 text-blue-500';
      case 'trust':
        return 'bg-green-500/20 text-green-500';
      case 'desire':
        return 'bg-pink-500/20 text-pink-500';
      case 'action':
        return 'bg-amber-500/20 text-amber-500';
      case 'loyalty':
        return 'bg-purple-500/20 text-purple-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  // Helper function to get technique description
  const getTechniqueDescription = (technique: InfluenceTechnique) => {
    switch (technique) {
      case 'interrogation_encapsulation':
        return 'Questions that build trust unconsciously';
      case 'bte_mapping':
        return 'Behavioral Table of Elements adaptation';
      case 'yes_ladder':
        return 'Progressive micro-commitments';
      case 'reciprocity_trigger':
        return 'Exchange of value for commitment';
      case 'social_proof':
        return 'Validation through group behavior';
      case 'commitment_consistency':
        return 'Identity-based consistency';
      case 'authority_positioning':
        return 'Expert positioning and guidance';
      case 'scarcity_framing':
        return 'Limited availability framing';
      case 'likeability_enhancement':
        return 'Building rapport and connection';
      default:
        return 'Customized influence technique';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Brain className="h-5 w-5 mr-2" /> 
          Chase Hughes Influence Analysis
        </CardTitle>
        <CardDescription>
          Behavioral analysis using the Chain of Influence framework
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Influence Phase */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Current Influence Phase</h3>
            <Badge className={getPhaseColor(profile.currentInfluencePhase)}>
              {profile.currentInfluencePhase.charAt(0).toUpperCase() + profile.currentInfluencePhase.slice(1)}
            </Badge>
          </div>
          <Progress value={profile.influencePhaseProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {profile.influencePhaseProgress}% progress in current phase
          </p>
        </div>

        {/* Sensory Preferences */}
        <div>
          <h3 className="font-medium mb-2">Sensory Preferences</h3>
          <div className="flex items-center gap-2 mb-1">
            {getSensoryIcon(profile.primarySensoryPreference)}
            <span className="text-sm">Primary: <strong>{profile.primarySensoryPreference}</strong></span>
          </div>
          {profile.secondarySensoryPreference && (
            <div className="flex items-center gap-2">
              {getSensoryIcon(profile.secondarySensoryPreference)}
              <span className="text-sm">Secondary: <strong>{profile.secondarySensoryPreference}</strong></span>
            </div>
          )}
        </div>

        {/* Trust and Desire Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" />
              <h3 className="font-medium">Trust Score</h3>
            </div>
            <Progress value={profile.trustScore} className="h-2" />
            <p className="text-xs text-muted-foreground">{profile.trustScore}%</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <h3 className="font-medium">Desire Score</h3>
            </div>
            <Progress value={profile.desireScore} className="h-2" />
            <p className="text-xs text-muted-foreground">{profile.desireScore}%</p>
          </div>
        </div>

        {/* Recommended Approach */}
        <div className="border rounded-md p-3 bg-muted/50">
          <h3 className="font-medium mb-2 flex items-center">
            <BarChart3 className="h-4 w-4 mr-1" /> Recommended Approach
          </h3>
          <div className="space-y-1">
            <div>
              <span className="text-sm font-medium">Technique: </span>
              <Badge variant="outline">{profile.suggestedApproach.technique.split('_').join(' ')}</Badge>
              <p className="text-xs text-muted-foreground mt-0.5">{getTechniqueDescription(profile.suggestedApproach.technique)}</p>
            </div>
            <div className="mt-2">
              <span className="text-sm font-medium">Language Pattern:</span>
              <p className="text-sm mt-1 italic">"{profile.suggestedApproach.languagePattern}"</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChaseHughesInfluencePanel;
