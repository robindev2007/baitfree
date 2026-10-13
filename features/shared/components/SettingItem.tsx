import * as React from 'react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { SegmentedControl } from './SegmentedControl';
import { cn } from '@/lib/utils';
import type { BaseSettingConfig } from '../types';

interface SettingItemProps {
  config: BaseSettingConfig;
  value: boolean | number | string;
  onChange: (newValue: any) => void;
  disabled?: boolean;
}

export function SettingItem({
  config,
  value,
  onChange,
  disabled = false,
}: SettingItemProps) {
  const isDisabled = disabled || config.disabled;

  return (
    <div
      className={cn(
        'group flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors',
        'hover:bg-muted/40',
        isDisabled && 'opacity-50 pointer-events-none'
      )}
    >
      <div className="flex flex-col gap-0.5 pr-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-xs font-medium tracking-tight',
              config.isDanger ? 'text-destructive font-semibold' : 'text-foreground'
            )}
          >
            {config.label}
          </span>
          {config.paid && (
            <Badge variant="pro" className="h-4 px-1 text-[9px]">
              PRO
            </Badge>
          )}
        </div>
        {config.description && (
          <span className="text-[11px] text-muted-foreground leading-tight">
            {config.description}
          </span>
        )}
      </div>

      <div className="shrink-0 flex items-center">
        {config.type === 'switch-multi' && config.multiOptions ? (
          <SegmentedControl
            options={config.multiOptions}
            value={value as number}
            onChange={(v) => onChange(v)}
            disabled={isDisabled}
          />
        ) : (
          <Switch
            variant={config.isDanger ? 'destructive' : 'default'}
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked)}
            disabled={isDisabled}
          />
        )}
      </div>
    </div>
  );
}

