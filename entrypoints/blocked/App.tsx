import * as React from 'react';
import { ShieldAlert, ArrowLeft, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function App() {
  const [blockedDomain, setBlockedDomain] = React.useState<string>('');

  React.useEffect(() => {
    // Detect system dark mode
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const rawUrl = params.get('url');
      if (rawUrl) {
        const parsed = new URL(rawUrl);
        setBlockedDomain(parsed.hostname);
      }
    } catch {
      setBlockedDomain('');
    }
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.close();
    }
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center select-none bg-background">
      <div className="relative flex flex-col items-center max-w-md w-full">
        {/* Glow & Shield Icon */}
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-1 ring-destructive/20 shadow-xs">
          <ShieldAlert className="size-8" />
        </div>

        {/* Status Badge */}
        <Badge variant="destructive" className="mb-3 px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase">
          Focus Shield Active
        </Badge>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Site Blocked
        </h1>

        {/* Domain pill */}
        {blockedDomain && (
          <div className="mt-2.5 inline-flex items-center rounded-md bg-muted px-3 py-1 font-mono text-xs text-foreground/80 font-medium">
            {blockedDomain}
          </div>
        )}

        {/* Explanatory text */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
          This site is currently blocked by your <span className="font-medium text-foreground">BaitFree</span> settings to help you stay in the flow and avoid rabbit holes.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full">
          <Button
            variant="default"
            size="sm"
            onClick={handleGoBack}
            className="gap-2 px-4 shadow-xs"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
            className="gap-2 px-4 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
            Close Tab
          </Button>
        </div>

        {/* Footer info */}
        <div className="mt-12 flex items-center gap-1.5 text-xs text-muted-foreground/60">
          <Sparkles className="size-3" />
          <span>You can adjust site block rules anytime in the extension popup</span>
        </div>
      </div>
    </div>
  );
}

