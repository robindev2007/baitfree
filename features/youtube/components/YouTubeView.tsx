import * as React from 'react';
import { SettingItem } from '@/features/shared/components/SettingItem';
import { YOUTUBE_CONFIGS } from '../constants';
import type { YouTubeSettings, YouTubeSettingKey } from '../types';
import { YouTubeIcon } from '@/features/layout/components/PlatformIcons';

interface YouTubeViewProps {
  settings: YouTubeSettings;
  onUpdate: (key: YouTubeSettingKey, value: any) => void;
  isPro?: boolean;
}

export function YouTubeView({ settings, onUpdate, isPro = false }: YouTubeViewProps) {
  const activeCount = Object.entries(settings).filter(([k, v]) => {
    if (k === 'thumbnail') return v !== 0;
    return Boolean(v);
  }).length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-2">
        <div className="flex items-center gap-2">
          <YouTubeIcon className="size-4 text-red-600 dark:text-red-500" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            YouTube Settings
          </h2>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {activeCount} of {YOUTUBE_CONFIGS.length} active
        </span>
      </div>

      <div className="divide-y divide-border/40 overflow-y-auto pr-1">
        {YOUTUBE_CONFIGS.map((config) => (
          <SettingItem
            key={config.id}
            config={config}
            value={settings[config.id as YouTubeSettingKey]}
            onChange={(val) => onUpdate(config.id as YouTubeSettingKey, val)}
            disabled={config.paid && !isPro}
          />
        ))}
      </div>
    </div>
  );
}

