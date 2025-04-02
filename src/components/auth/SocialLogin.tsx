
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Facebook, Mail } from "lucide-react";

interface SocialLoginProps {
  onEmailLogin: () => void;
  onSocialLogin?: (provider: 'github' | 'facebook' | 'google') => void;
  loading?: boolean;
}

const SocialLogin = ({ onEmailLogin, onSocialLogin, loading = false }: SocialLoginProps) => {
  const handleSocialLogin = (provider: 'github' | 'facebook' | 'google') => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    } else {
      console.log(`Login with ${provider} (not implemented)`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          type="button" 
          disabled={loading}
          onClick={() => handleSocialLogin('github')}
          className="flex items-center justify-center gap-2"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          disabled={loading}
          onClick={() => handleSocialLogin('facebook')}
          className="flex items-center justify-center gap-2"
        >
          <Facebook className="h-4 w-4" />
          <span>Facebook</span>
        </Button>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        type="button" 
        disabled={loading}
        onClick={onEmailLogin}
        className="w-full flex items-center justify-center gap-2"
      >
        <Mail className="h-4 w-4" />
        <span>Email</span>
      </Button>
    </div>
  );
};

export default SocialLogin;
