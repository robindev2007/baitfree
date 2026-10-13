import * as React from 'react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { DAYS_OF_WEEK } from '../constants';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

interface DayPickerProps {
  active: boolean;
  days: boolean[];
  onToggleActive: (active: boolean) => void;
  onToggleDay: (index: number) => void;
  isPro?: boolean;
}

export function DayPicker({
  active,
  days,
  onToggleActive,
  onToggleDay,
  isPro = false,
}: DayPickerProps) {
  const disabled = !isPro;

  return (
    <div
      className={cn(
        'flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors',
        disabled && 'opacity-60'
      )}
    >
      <div className="flex flex-col gap-1.5 pr-3">
        <div className="flex items-center gap-2">
          <Calendar className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            Pause on Selected Days
          </span>
          <Badge variant="pro" className="h-4 px-1 text-[9px]">
            PRO
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {DAYS_OF_WEEK.map((day, idx) => {
            const isDaySelected = days[idx];
            return (
              <button
                key={idx}
                type="button"
                disabled={disabled || !active}
                onClick={() => onToggleDay(idx)}
                className={cn(
                  'size-5 rounded-full text-[10px] font-mono font-medium transition-colors flex items-center justify-center',
                  isDaySelected && active
                    ? 'bg-primary text-primary-foreground font-bold'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                title={day.full}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>

      <Switch
        checked={active}
        onCheckedChange={onToggleActive}
        disabled={disabled}
      />
    </div>
  );
}

