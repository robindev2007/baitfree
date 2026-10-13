import * as React from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { CalendarClock } from 'lucide-react';

interface SchedulePickerProps {
  active: boolean;
  fromTime: string;
  toTime: string;
  onToggle: (active: boolean) => void;
  onChangeFrom: (time: string) => void;
  onChangeTo: (time: string) => void;
  disabled?: boolean;
}

export function SchedulePicker({
  active,
  fromTime,
  toTime,
  onToggle,
  onChangeFrom,
  onChangeTo,
  disabled = false,
}: SchedulePickerProps) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors">
      <div className="flex flex-col gap-1.5 pr-3">
        <div className="flex items-center gap-1.5">
          <CalendarClock className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            Pause During Hours
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Input
            type="time"
            value={fromTime}
            onChange={(e) => onChangeFrom(e.target.value)}
            disabled={disabled || !active}
            className="h-6 w-20 text-[11px] px-1 py-0 font-mono"
          />
          <span className="text-[10px]">to</span>
          <Input
            type="time"
            value={toTime}
            onChange={(e) => onChangeTo(e.target.value)}
            disabled={disabled || !active}
            className="h-6 w-20 text-[11px] px-1 py-0 font-mono"
          />
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

