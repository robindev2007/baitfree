import * as React from 'react';
import { ShieldCheck, Moon, Sun, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  isPro?: boolean;
}

export function Header({ isDark, onToggleTheme, isPro = false }: HeaderProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-border/60 px-4 bg-background/95 backdrop-blur-xs">
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
          <ShieldCheck className="size-4" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <h1 className="text-sm font-semibold tracking-tight text-foreground">
            BaitFree
          </h1>
          <span className="text-[10px] text-muted-foreground font-mono">v1.0</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Badge
          variant={isPro ? 'pro' : 'subtle'}
          className="cursor-pointer gap-1 transition-transform hover:scale-105"
        >
          <Sparkles className="size-2.5" />
          {isPro ? 'PRO ACTIVE' : 'FREE PLAN'}
        </Badge>

        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="size-7 text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
        </Button>
      </div>
    </header>
  );
}

