
import React from 'react';
import { Button } from '@/components/ui/button';
import { Escort } from '@/types/Escort';
import { Facebook, Twitter, Linkedin, Link } from 'lucide-react';

export interface SocialShareContentProps {
  escort: Escort;
}

const SocialShareContent: React.FC<SocialShareContentProps> = ({ escort }) => {
  const shareUrl = `https://example.com/escorts/${escort.id}`;
  const shareTitle = `Check out ${escort.name}'s profile`;
  
  const handleShare = (platform: string) => {
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
          .then(() => {
            console.log('URL copied to clipboard');
            // You could add a toast notification here
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
          });
        return;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        variant="outline" 
        className="flex items-center" 
        onClick={() => handleShare('facebook')}
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center" 
        onClick={() => handleShare('twitter')}
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center" 
        onClick={() => handleShare('linkedin')}
      >
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center" 
        onClick={() => handleShare('copy')}
      >
        <Link className="h-4 w-4 mr-2" />
        Copy Link
      </Button>
    </div>
  );
};

export default SocialShareContent;
