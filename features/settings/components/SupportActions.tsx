import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Mail, ExternalLink } from 'lucide-react';

export function SupportActions() {
  const handleReview = () => {
    window.open('https://chrome.google.com/webstore', '_blank');
  };

  const handleContact = () => {
    window.open('mailto:support@baitfree.app', '_blank');
  };

  return (
    <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
      <Button
        variant="outline"
        size="xs"
        className="w-full gap-1.5 text-[11px] text-muted-foreground hover:text-foreground"
        onClick={handleReview}
      >
        <Star className="size-3 text-amber-500 fill-amber-500" />
        Rate & Review
      </Button>

      <Button
        variant="outline"
        size="xs"
        className="w-full gap-1.5 text-[11px] text-muted-foreground hover:text-foreground"
        onClick={handleContact}
      >
        <Mail className="size-3 text-sky-500" />
        Contact Dev
      </Button>
    </div>
  );
}

