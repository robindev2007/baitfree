import * as React from 'react';
import { Switch } from '@/components/ui/switch';
import { SNOOZE_PRESETS } from '../constants';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface SnoozeControlProps {
  active: boolean;
  pauseTime: number;
  onToggle: (active: boolean) => void;
  onSelectTime: (time: number) => void;
  disabled?: boolean;
}

export function SnoozeControl({
  active,
  pauseTime,
  onToggle,
  onSelectTime,
  disabled = false,
}: SnoozeControlProps) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors">
      <div className="flex flex-col gap-1 pr-3">
        <div className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            Pause Temporarily (Snooze)
          </span>
        </div>
        <div className="flex items-center gap-1 pt-0.5">
          {SNOOZE_PRESETS.map((mins) => (
            <button
              key={mins}
              type="button"
              disabled={disabled || active}
              onClick={() => onSelectTime(mins)}
              className={cn(
                'px-1.5 py-0.5 text-[10px] rounded-md transition-colors font-mono',
                pauseTime === mins
                  ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {mins}m
            </button>
          ))}
        </div>
      </div>

      <Switch
        checked={active}
        onCheckedChange={onToggle}
        disabled={disabled}
      />
    </div>
  );
}

